import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PigInfomationPage } from '../../pages/pig-infomation/pig-infomation';
import { pig } from '../../common/entity';

@IonicPage()
@Component({
  selector: 'page-pig-view',
  templateUrl: 'pig-view.html'
})
export class PigViewPage {
  private pig: pig = null;

  PigInfomationPage = PigInfomationPage;

  constructor(
    public navCtrl: NavController,
    public navParams : NavParams
  ) {
    this.pig = this.navParams.data;
  }

}
