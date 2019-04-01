import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { pig } from '../../common/entity';
import { PigsProvider } from '../../providers/pigs/pigs';

/**
 * Generated class for the PigInfomationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pig-infomation',
  templateUrl: 'pig-infomation.html',
})
export class PigInfomationPage {
  @ViewChild('chart') chart;
  public pig: pig;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public pigProvider: PigsProvider
  ) {
    this.pig = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PigInfomationPage');
    this.pigProvider.ViewIndexChart(this.pig, this.chart);
  }

}
