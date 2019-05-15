import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, Platform } from 'ionic-angular';
import { PigInfomationPage } from '../pig-infomation/pig-infomation';
import { pig } from '../../common/entity';

@IonicPage()
@Component({
  selector: 'page-pig-summary',
  templateUrl: 'pig-summary.html',
})
export class PigSummaryPage {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  public rootParam: any;

  public pig: pig;
  public pages: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform
  ) {
    if (this.navParams.data.pig) {
      this.pig = this.navParams.data.pig;
    }

    this.pages = [
      {
        title: 'Thông tin heo',
        component: PigInfomationPage,
        icon: 'ios-information-circle', active: true, expand: false
      }
    ]

    this.rootPage = PigInfomationPage;
    this.rootParam = this.pig;
  }

  openPage(page) {
    if (!page.active) {
      this.pages.forEach((element: any) => {
        element.active = false;
      });
      page.active = true;
      if (page.component)
        this.nav.setRoot(page.component, pig);
    }
  }
}
