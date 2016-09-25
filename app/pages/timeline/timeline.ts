import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Pictr, ITimelineEntry } from '../../providers/pictr/pictr';

@Component({
  templateUrl: 'build/pages/timeline/timeline.html',
  providers: [Pictr]
})
export class TimelinePage {
  public timeline: Array<ITimelineEntry>;

  constructor(
    private navCtrl: NavController,
    private pictr: Pictr
  ) {
    this.timeline = pictr.getTimeline();
  }

  onViewWillEnter() {
    this.timeline = this.pictr.getTimeline();
  }
}
