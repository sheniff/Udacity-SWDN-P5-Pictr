import { Component } from '@angular/core';
import { Pictr, IUser } from '../../providers/pictr/pictr';
import { FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

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
    // TODO: Take picture or from gallery if clicked
    console.log('getFromCamera WIP');
  }
}
