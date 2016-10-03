import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CreatePage } from '../create/create';
import { Pictr, ISearchResult } from '../../providers/pictr/pictr';
import { ImgurResize } from '../../pipes/imgurResize';
import { Camera } from 'ionic-native';

@Component({
  templateUrl: 'build/pages/new/new.html',
  providers: [Pictr],
  pipes: [ImgurResize]
})
export class NewPictrPage {
  public results: Array<Array<ISearchResult>>;
  private fromCameraTile: ISearchResult = {
    link: 'http://shopproject30.com/wp-content/themes/venera/images/placeholder-camera-green.png',
    title: '#pictr#camera#'
  };

  constructor(
    public navCtrl: NavController,
    private pictr: Pictr
  ) {}

  ionViewWillEnter() {
    this.pictr.getRandomPics().subscribe(res => {
      res.unshift(this.fromCameraTile);
      this.results = this.pictr.groupBy(res);
    });
  }

  onPicSelected(event, pic) {
    if (pic.title === this.fromCameraTile.title) {
      this.getFromCamera();
    } else {
      this.navCtrl.push(CreatePage, { pic: pic });
    }
  }

  search(event) {
    let val: string = event.target.value;

    if (!!val && val.length) {
      this.pictr.searchPics(val)
      .subscribe(res => {
        res.unshift(this.fromCameraTile);
        this.results = this.pictr.groupBy(res);
      });
    } else {
      this.clearResults();
    }
  }

  getFromCamera() {
    Camera.getPicture({}).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      this.navCtrl.push(CreatePage, { pic: {
        link: 'data:image/jpeg;base64,' + imageData,
        title: 'Picture just taken'
      } });
    }, (err) => {
     // Handle error
     console.log('err', err);
     alert(err);
    });
  }

  clearResults() {
    this.results = [[this.fromCameraTile]];
  }
}
