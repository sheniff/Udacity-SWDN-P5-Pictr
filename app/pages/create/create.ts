import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Pictr, IPost } from '../../providers/pictr/pictr';
import { DetailPage } from '../detail/detail';
import { ImgurResize } from '../../pipes/imgurResize';

@Component({
  templateUrl: 'build/pages/create/create.html',
  providers: [Pictr],
  pipes: [ImgurResize]
})
export class CreatePage {
  public pic: any;
  public post: IPost;
  @ViewChild('message') message: any;

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

  ionViewDidEnter() {
    this.message.setFocus();
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
      title: this.pic.title,
      message: '',
      creator: this.pictr.getCurrentUser()
    };
  }
}
