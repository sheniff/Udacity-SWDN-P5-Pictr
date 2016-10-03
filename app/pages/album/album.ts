import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Pictr, IPost } from '../../providers/pictr/pictr';
import { ImgurResize } from '../../pipes/imgurResize';
import { DetailPage } from '../detail/detail';

@Component({
  templateUrl: 'build/pages/album/album.html',
  providers: [Pictr],
  pipes: [ImgurResize]
})
export class AlbumPage {
  public album: Array<Array<IPost>>;

  constructor(
    private navCtrl: NavController,
    private pictr: Pictr
  ) {
    this.album = pictr.groupBy(pictr.getAllPosts());
  }

  ionViewWillEnter() {
    this.album = this.pictr.groupBy(this.pictr.getAllPosts());
  }

  onPicSelected(event, post) {
    this.navCtrl.push(DetailPage, { post: post });
  }
}
