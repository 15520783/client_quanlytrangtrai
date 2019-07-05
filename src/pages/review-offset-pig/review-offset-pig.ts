import { CONFIG, MESSAGE, VARIABLE } from '../../common/const';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { PigsProvider } from '../../providers/pigs/pigs';
import { Utils } from '../../common/utils';
import { pig } from '../../common/entity';

@IonicPage()
@Component({
  selector: 'page-review-offset-pig',
  templateUrl: 'review-offset-pig.html',
})
export class ReviewOffsetPigPage {
  @ViewChild('chart') chart;
  public pig: pig = new pig();
  public classification: string;
  public classificationRecommand: string;
  public classificationList: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public deployData: DeployDataProvider,
    public pigProvider: PigsProvider,
    public util: Utils,
    public platform:Platform
  ) {
    if (this.navParams.data.pig && this.navParams.data.classification) {
      this.pig = this.navParams.data.pig;
      this.pig.breed = this.deployData.get_breed_by_id(this.pig.breedId);
      this.pig['genderName'] = this.pig.gender == 1 ? VARIABLE.GENDER[1].name : (this.pig.gender == 2 ? VARIABLE.GENDER[2].name : VARIABLE.GENDER[3].name);
      this.classification = this.navParams.data.classification;
      this.classificationRecommand = this.navParams.data.classification;
    }

    this.classificationList = VARIABLE.TYPE_PIG.filter(item => {
      return item.id != 0;
    })

  }

  ionViewDidLoad() {
    this.pigProvider.ViewIndexChart(this.pig, this.chart.nativeElement);
  }

  confirm() {
    // this.pig.pigType = this.classification;
    // if (this.classification != this.classificationRecommand) {
    //   this.util.openBackDrop();
    //   this.pigProvider.updateDataMining(this.pig.id, this.classification)
    //     .then((data: any) => {
    //       this.util.closeBackDrop();
    //       if (data) {
    //         this.util.showToastSuccess('Đã cập nhật dữ liệu khai thác');
    //         this.navParams.get('callback')(this.pig);
    //       }
    //     })
    //     .catch(err => {
    //       this.util.showToast(MESSAGE[CONFIG.LANGUAGE_DEFAULT].ERROR_OCCUR);
    //       this.util.closeBackDrop();
    //       return err;
    //     })
    // } else {
      this.navParams.get('callback')(this.pig);
    // }
  }
}
