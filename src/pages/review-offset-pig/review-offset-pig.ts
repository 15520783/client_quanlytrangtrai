import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { PigsProvider } from '../../providers/pigs/pigs';
import { VARIABLE } from '../../common/const';
import { pig } from '../../common/entity';

@IonicPage()
@Component({
  selector: 'page-review-offset-pig',
  templateUrl: 'review-offset-pig.html',
})
export class ReviewOffsetPigPage {
  @ViewChild('chart') chart;
  public pig: pig = new pig();
  public classification:string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public deployData: DeployDataProvider,
    public pigProvider:PigsProvider
  ) {
    if (this.navParams.data.pig && this.navParams.data.classification) {
      this.pig = this.navParams.data.pig;
      this.pig.breed = this.deployData.get_breed_by_id(this.pig.breedId);
      this.pig['genderName'] = this.pig.gender == 1 ? VARIABLE.GENDER[1].name : (this.pig.gender == 2 ? VARIABLE.GENDER[2].name : VARIABLE.GENDER[3].name);
      this.classification = this.navParams.data.classification ;
    }
  }

  ionViewDidLoad() {
    this.pigProvider.ViewIndexChart(this.pig, this.chart.nativeElement);
  }

}
