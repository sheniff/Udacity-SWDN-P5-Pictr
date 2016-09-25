import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { mockPosts, mockUser } from '../../providers/mocks';

export interface IPost {
  createdAt: Date;
  link: string;
  message: string;
  creator: IUser;
  numComments?: number;
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

@Injectable()
export class Pictr {
  private user: IUser;
  private posts: Array<IPost>;

  constructor(private http: Http) {
    this.user = mockUser;
    this.posts = mockPosts;
  }

  searchPics(q: string) {
    let headers = new Headers();
    headers.append('Authorization', 'Client-ID 7dc73ec260e06c5');

    return this.http
      .get(`https://api.imgur.com/3/gallery/search?q_any=${q}&q_type=png&q_size_px=med`,
      { headers })
      .map(res =>
        res.json().data.map(res => {
          return { link: res.link, title: res.title }
        })
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
