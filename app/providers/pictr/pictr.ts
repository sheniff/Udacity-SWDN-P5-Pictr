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

  constructor(private http: Http) {
    this.user = mockUsers[0];
    this.posts = mockPosts;
    this.timeline = mockTimeline;
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
    let regx = /\.(jpg|png|gif)$/;
    let headers = new Headers();
    headers.append('Authorization', AUTH);

    return this.http
      .get(`https://api.imgur.com/3/gallery/random/random`,
      { headers })
      .map(res =>
        res.json().data
          .map(res => {
            return { link: res.link, title: res.title }
          })
          .filter(res => res.link.match(regx))
          .slice(0, 20)
      );
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
}