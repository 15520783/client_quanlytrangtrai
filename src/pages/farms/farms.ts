import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController, Loading } from 'ionic-angular';
import { FarmsProvider } from '../../providers/farms/farms';
import { Utils } from '../../common/utils';
import { farm } from '../../common/entity';
import { KEY } from '../../common/const';

/**
 * Generated class for the FarmsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-farms',
  templateUrl: 'farms.html',
})
export class FarmsPage {

  public farms = [];
  protected loading: Loading;

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public farmProvider: FarmsProvider,
    public util: Utils,
    public loadingCtrl : LoadingController
  ) {
    this.loading = this.loadingCtrl.create({
      content: 'Đang tải dữ liệu',
      spinner: 'bubbles',
      cssClass: 'ion-loading'
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FarmsPage');
    this.getAllFarms();
  }

  convertDate(date: any) {
    return this.util.convertDate(date);
  }

  getAllFarms() {
    
    this.loading.present();
    this.farmProvider.getFarms()
      .then((data: Array<farm>) => {
        if (data.length) {
          this.util.setKey(KEY.FARMS, data);
          this.farms = data;
          this.loading.dismiss();
        }
      })
      .catch((err) => {
        console.log('err_farm_provider', err);
        this.util.getKey(KEY.FARMS)
          .then((data: Array<farm>) => {
            this.farms = data;
            this.loading.dismiss();
          })
      })
  }
}
