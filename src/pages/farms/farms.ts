import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController, Loading } from 'ionic-angular';
import { FarmsProvider } from '../../providers/farms/farms';
import { Utils } from '../../common/utils';
import { farm } from '../../common/entity';
import { KEY } from '../../common/const';


@IonicPage()
@Component({
  selector: 'page-farms',
  templateUrl: 'farms.html',
})
export class FarmsPage {

  public farms = [];

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public farmProvider: FarmsProvider,
    public util: Utils,
    public loadingCtrl: LoadingController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FarmsPage');
    this.getAllFarms();
  }

  convertDate(date: any) {
    return this.util.convertDate(date);
  }

  getAllFarms() {
    this.util.showLoading({
      content: 'Đang tải dữ liệu',
      spinner: 'bubbles',
      cssClass: 'ion-loading'
    });
    this.farmProvider.getFarms()
      .then((data: Array<farm>) => {
        if (data.length) {
          this.util.setKey(KEY.FARMS, data)
            .then(() => {
              this.farms = this.farmProvider.farms = data;
              this.util.closeLoading();
            })
            .catch((err) => {
              console.log('err_storage_farm', err);
              this.util.closeLoading();
            })
        }
      })
      .catch((err) => {
        this.util.showAlert({
          header: 'Thông báo',
          message: 'Dữ liệu chưa được cập nhật. Vui lòng kiểm tra kết nối.',
          buttons: ['OK']
        });
        console.log('err_farm_provider', err);
        this.util.getKey(KEY.FARMS)
          .then((data: Array<farm>) => {
            this.farms = this.farmProvider.farms = data;
            this.util.closeLoading();
          })
          .catch((err) => {
            this.util.closeLoading();
            this.farms = this.farmProvider.farms = [];
            console.log('err_get_storage_farm', err);
          })
      })
  }
}
