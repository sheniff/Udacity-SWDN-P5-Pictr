import { Component } from '@angular/core';
import { NewPictrPage } from '../new/new';
import { AlbumPage } from '../album/album';
import { ProfilePage } from '../profile/profile';
import { TimelinePage } from '../timeline/timeline';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  public tab1Root: any;
  public tab2Root: any;
  public tab3Root: any;
  public tab4Root: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = NewPictrPage;
    this.tab2Root = AlbumPage;
    this.tab3Root = TimelinePage;
    this.tab4Root = ProfilePage;
  }
}
