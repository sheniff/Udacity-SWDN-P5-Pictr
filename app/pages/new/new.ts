import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { CreatePage } from '../create/create';
import { Pictr, ISearchResult } from '../../providers/pictr/pictr';
import { ImgurResize } from '../../pipes/imgurResize';
import { Camera, Geolocation } from 'ionic-native';

@Component({
  templateUrl: 'build/pages/new/new.html',
  providers: [Pictr],
  pipes: [ImgurResize]
})
export class NewPictrPage {
  public results: Array<Array<ISearchResult>>;
  public searching: boolean;
  public fromCameraTile: ISearchResult = {
    link: 'img/camera.png',
    title: '#pictr#camera#'
  };
  public coords;
  public location;
  @ViewChild('searchbar') searchbar: any;

  constructor(
    public navCtrl: NavController,
    private pictr: Pictr,
    private loading: LoadingController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.pictr.getCachedRandom().then(res => {
      this.results = this.pictr.groupBy(res);
    });

    this.pictr.getRandomPics().subscribe(
      res => this.alertNewContent(res)
    );

    this.runGeolocation();
  }

  ionViewDidEnter() {
    this.searchbar.setFocus();
  }

  onPicSelected(event, pic) {
    this.navCtrl.push(CreatePage, { pic: pic });
  }

  search(event) {
    let val: string = event.target.value;

    if (this.searching) return;

    if (!!val && val.length) {
      let loader = this.loading.create({ content: 'Loading...' });
      loader.present();
      this.searching = true;
      this.pictr.searchPics(val)
      .subscribe(res => {
        res.unshift(this.fromCameraTile);
        this.results = this.pictr.groupBy(res);
        this.searching = false;
        loader.dismiss();
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

  fileSelected(event) {
    let loader = this.loading.create({
      content: 'Loading...'
    });

    loader.present();
    let file = event.target.files[0];
    let reader = new FileReader();

    reader.onload = (e:any) => {
      loader.dismiss();
      this.navCtrl.push(CreatePage, { pic: {
        link: e.target.result,
        title: 'Picture just taken'
      } });
    }

    reader.readAsDataURL(file);
  }

  alertNewContent(content) {
    let toast = this.toastCtrl.create({
      message: 'There are new imgs!',
      position: 'middle',
      showCloseButton: true,
      closeButtonText: 'Refresh',
      dismissOnPageChange: true
    })

    toast.onDidDismiss(() => {
      this.results = this.pictr.groupBy(content);
    })

    toast.present().then(() => {
      let btn = <any>document.querySelector('button.toast-button');
      btn.focus();
    })
  }

  private runGeolocation() {
    Geolocation.getCurrentPosition().then((resp) => {
      this.coords = resp.coords;
      this.pictr.getGeolocation(
        this.coords.latitude,
        this.coords.longitude
      ).subscribe(data => this.location = data);;
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    let watch = Geolocation.watchPosition();
    watch.subscribe((data) => {
      if (data.coords && this.coords &&
        Math.abs(data.coords.latitude - this.coords.latitude) > 0.0000001 &&
        Math.abs(data.coords.longitude - this.coords.longitude) > 0.0000001
      ) {
        this.coords = data.coords;
        this.pictr.getGeolocation(
          this.coords.latitude,
          this.coords.longitude
        ).subscribe(data => this.location = data);
      }
    })
  }
}
