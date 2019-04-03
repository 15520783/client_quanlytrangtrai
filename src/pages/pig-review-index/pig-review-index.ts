import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { pig } from '../../common/entity';
import { PigsProvider } from '../../providers/pigs/pigs';

/**
 * Generated class for the PigReviewIndexPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pig-review-index',
  templateUrl: 'pig-review-index.html',
})
export class PigReviewIndexPage {

  public pig: pig;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public pigProvider: PigsProvider
  ) {
    this.pig = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PigReviewIndexPage');
    this.pigProvider.ViewIndexChart(this.pig,document.getElementById('chartReview'));
  }

}
