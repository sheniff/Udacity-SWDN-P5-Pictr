import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Pictr, IPost, IComment } from '../../providers/pictr/pictr';

@Component({
  templateUrl: 'build/pages/detail/detail.html',
  providers: [Pictr]
})
export class DetailPage {
  public post: IPost;
  public comments: Array<IComment>;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams
  ) {
    this.post = this.navParams.get('post');
  }

}
