import { Component } from '@angular/core';
import { NewPictrPage } from '../new/new';
import { AlbumPage } from '../album/album';
import { ProfilePage } from '../profile/profile';
import { TimelinePage } from '../timeline/timeline';
import { ToastController } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  public tab1Root: any;
  public tab2Root: any;
  public tab3Root: any;
  public tab4Root: any;
  private toast: any;

  constructor(
    private toastCtrl: ToastController
  ) {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = NewPictrPage;
    this.tab2Root = AlbumPage;
    this.tab3Root = TimelinePage;
    this.tab4Root = ProfilePage;
  }

  ionViewWillEnter() {
    this.runOfflineDetector()
  }

  private runOfflineDetector() {
    window.addEventListener('offline', () => {
      this.presentToast('Network not available', 'top')
    })

    window.addEventListener('online', () => {
      this.dismissToast()
    })
  }

  private presentToast(message: string, position: string = 'top') {
    this.toast = this.toastCtrl.create({
      message: message,
      position: position,
      showCloseButton: true,
      closeButtonText: 'Ok'
    })

    this.toast.present()
  }

  private dismissToast() {
    if (this.toast) {
      this.toast.dismiss()
    }
  }
}
