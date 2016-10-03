import { Component } from '@angular/core';
import { Pictr, IUser } from '../../providers/pictr/pictr';
import { FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { Camera } from 'ionic-native';

@Component({
  templateUrl: 'build/pages/profile/profile.html',
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
  providers: [Pictr]
})
export class ProfilePage {
  public profile: IUser;

  constructor(private pictr: Pictr) {
    this.profile = this.pictr.getCurrentUser();
  }

  ionViewWillEnter() {
    this.profile = this.pictr.getCurrentUser();
  }

  saveUsername(value) {
    this.profile.name = value;
  }

  getFromCamera() {
    Camera.getPicture({}).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      this.profile.avatar = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
     console.log('err', err);
     alert(err);
    });
  }
}
