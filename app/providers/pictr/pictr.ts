import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { mockPosts, mockUsers, mockTimeline } from '../../providers/mocks';

export interface IPost {
  createdAt: Date;
  link: string;
  title: string;
  message: string;
  creator: IUser;
  numComments?: number;
  comments?: Array<IComment>;
}

export interface ISearchResult {
  link: string;
  title: string;
}

export interface IUser {
  name: string;
  avatar?: string;
  numPictrs?: number;
  numComments?: number;
}

export interface IComment {
  creator: IUser;
  createdAt: Date;
  message: string;
}

export interface ITimelineEntry {
  creator: IUser;
  createdAt: Date;
  action: string;
  post: IPost;
}

const AUTH = 'Client-ID 7dc73ec260e06c5';

@Injectable()
export class Pictr {
  private user: IUser;
  private posts: Array<IPost>;
  private timeline: Array<ITimelineEntry>;
  private dbPromise: any;

  constructor(private http: Http) {
    this.user = mockUsers[0];
    this.posts = mockPosts;
    this.timeline = mockTimeline;

    // cache IDB
    this.dbPromise = (<any> window).idb.open('pictr', 1, function(upgradeDb) {
      upgradeDb.createObjectStore('randomResults', {
        keyPath: 'id'
      });
    });
  }

  searchPics(q: string) {
    let headers = new Headers();
    headers.append('Authorization', AUTH);

    return this.http
      .get(`https://api.imgur.com/3/gallery/search?q_any=${q}&q_type=png&q_size_px=med`,
      { headers })
      .map(res =>
        res.json().data.slice(0, 20).map(res => {
          return { link: res.link, title: res.title }
        })
      );
  }

  getRandomPics() {
    let headers = new Headers();
    headers.append('Authorization', AUTH);

    return this.http
      .get(`https://api.imgur.com/3/gallery/random/random`,
      { headers })
      .map(res => {
        let data = res.json().data
        this.cacheRandomResults(data)
        return this.processRandomResults(data)
      });
  }

  processRandomResults(data) {
    const regx = /\.(jpg|png|gif)$/

    return data.map(res => {
      return { link: res.link, title: res.title }
    })
    .filter(res => res.link.match(regx))
    .slice(0, 20)
  }

  getCurrentUser(): IUser {
    return this.user;
  }

  storePost(post: IPost) {
    this.posts.unshift(post);
    console.log('post stored', this.posts);
  }

  getAllPosts(): Array<IPost> {
    return this.posts;
  }

  getTimeline(): Array<ITimelineEntry> {
    return this.timeline;
  }

  groupBy(input: Array<any>, groupSize: number = 3): Array<Array<any>> {
    let response: Array<Array<IPost>> = [];
    let block: Array<IPost>;

    input.forEach((res, index) => {
      if (index % groupSize === 0) {
        block = [];
        response.push(block);
      }
      block.push(res);
    });

    return response;
  }

  getCachedRandom() {
    return this.dbPromise.then(db => {
      if (!db) return [];
      return db
        .transaction('randomResults')
        .objectStore('randomResults')
        .getAll()
        .then(data => this.processRandomResults(data))
    })
  }

  cacheRandomResults(data: Array<any>) {
    this.dbPromise.then(db => {
      if (!db) return;
      let tx = db.transaction('randomResults', 'readwrite')
      let store = tx.objectStore('randomResults')
      // store new response
      data.forEach(res => store.put(res))
      // clear previous cache
      store.openCursor(null, 'prev')
      .then(cursor => cursor.advance(50))
      .then(function clearAll(cursor) {
        if (!cursor) return;
        cursor.delete();
        return cursor.continue().then(clearAll);
      })
    })
  }
}
