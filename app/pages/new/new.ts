import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CreatePage } from '../create/create';
import { Pictr, ISearchResult } from '../../providers/pictr/pictr';

@Component({
  templateUrl: 'build/pages/new/new.html',
  providers: [Pictr]
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
  ) {
    this.clearResults();
  }

  public onPicSelected(event, pic) {
    if (pic.title === this.fromCameraTile.title) {
      this.getFromCamera();
    } else {
      this.navCtrl.push(CreatePage, { pic: pic });
    }
  }

  public search(event) {
    let val: string = event.target.value;

    if (val.length) {
      this.pictr.searchPics(val)
      .subscribe(res => this.results = this.formatResult(res));
    } else {
      this.clearResults();
    }
  }

  public getFromCamera() {
    // TODO: Take picture or from gallery if clicked
    console.log('getFromCamera WIP');
  }

  public clearResults() {
    this.results = [[this.fromCameraTile]];
  }

  private formatResult(results: Array<any>): Array<Array<ISearchResult>> {
    results.unshift(this.fromCameraTile);
    let response: Array<Array<ISearchResult>> = [];
    let block: Array<ISearchResult>;

    results.forEach((res, index) => {
      if (index % 3 === 0) {
        block = [];
        response.push(block);
      }
      block.push(res);
    });

    return response;
  }
}
