import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Pictr, IPost } from '../../providers/pictr/pictr';
import { DetailPage } from '../detail/detail';

@Component({
  templateUrl: 'build/pages/create/create.html',
  providers: [Pictr]
})
export class CreatePage {
  public pic: any;
  public post: IPost;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private pictr: Pictr
  ) {
    this.initPost();
  }

  ionViewWillEnter() {
    this.initPost();
  }

  savePost(post: IPost) {
    this.pictr.storePost(post);
    this.navCtrl.push(DetailPage, { post: post });
  }

  private initPost() {
    this.pic = this.navParams.get('pic');
    this.post = {
      createdAt: new Date(),
      link: this.pic.link,
      message: '',
      creator: this.pictr.getCurrentUser()
    };
  }
}
