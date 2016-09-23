import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CreatePage } from '../create/create';

@Component({
  templateUrl: 'build/pages/new/new.html'
})
export class NewPictrPage {
  public results: Array<Array<any>>;
  private fromCameraTile: any = {
    url: 'http://shopproject30.com/wp-content/themes/venera/images/placeholder-camera-green.png',
    name: '#pictr#camera#'
  };

  constructor(public navCtrl: NavController) {
    this.results = [[this.fromCameraTile]];
  }

  public onPicSelected(event, pic) {
    if (pic.name === this.fromCameraTile.name) {
      this.getFromCamera();
    } else {
      this.navCtrl.push(CreatePage, { pic: pic });
    }
  }

  public search(event) {
    // TODO: Look for pics in... imgur? instagram?
    console.log('search WIP');
  }

  public getFromCamera() {
    // TODO: Take picture or from gallery if clicked
    console.log('getFromCamera WIP');
  }
}
