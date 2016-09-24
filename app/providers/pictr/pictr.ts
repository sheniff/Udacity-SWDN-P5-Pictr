import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

export interface IPost {
  createdAt: Date;
  link: string;
  message: string;
  creator: string;
  numComments?: number;
}

export interface ISearchResult {
  link: string;
  title: string;
}

export interface IUser {
  name: string;
}

@Injectable()
export class Pictr {
  private user: IUser;
  private posts: Array<IPost>;

  constructor(private http: Http) {
    this.user = { name: 'johnDoe' };
    this.posts = [];
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

  getCurrentUser(): string {
    return this.user.name;
  }

  storePost(post: IPost) {
    this.posts.unshift(post);
  }
}
