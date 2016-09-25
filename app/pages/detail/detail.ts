import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Pictr, IPost, IComment } from '../../providers/pictr/pictr';

@Component({
  templateUrl: 'build/pages/detail/detail.html',
  providers: [Pictr]
})
export class DetailPage {
  public post: IPost;
  public newComment: string;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private pictr: Pictr
  ) {
    this.post = this.navParams.get('post');
  }

  comment(event: any, message: string) {
    event.preventDefault();

    if (!message || !message.length) {
      return;
    }

    this.post.comments.unshift({
      creator: this.pictr.getCurrentUser(),
      message: message,
      createdAt: new Date()
    });

    this.newComment = '';
  }
}
