import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController, ModalController } from 'ionic-angular';
import { FarmsProvider } from '../../providers/farms/farms';
import { Utils } from '../../common/utils';
import { farm } from '../../common/entity';
import { KEY } from '../../common/const';
import { FarmInfomationPage } from '../farm-infomation/farm-infomation';
import { FarmInputPage } from '../farm-input/farm-input';


@IonicPage()
@Component({
  selector: 'page-farms',
  templateUrl: 'farms.html',
})
export class FarmsPage {

  public farms = this.farmProvider.farms;

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public farmProvider: FarmsProvider,
    public util: Utils,
    public loadingCtrl: LoadingController,
    public modalCtrl : ModalController
  ) {
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter FarmsPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FarmsPage');
    this.getAllFarms();
  }

  convertDate(date: any) {
    return this.util.convertDate(date);
  }

  getAllFarms() {
    if (!this.farmProvider.farms.length) {
      this.util.showLoading('Đang tải dữ liệu');
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
          this.util.closeLoading().then(() => {
            this.util.showToast('Dữ liệu chưa được cập nhật. Vui lòng kiểm tra kết nối.');
            console.log('err_farm_provider', err);
            this.util.getKey(KEY.FARMS)
              .then((data: Array<farm>) => {
                this.farms = this.farmProvider.farms = data;
              })
              .catch((err) => {
                this.farms = this.farmProvider.farms = [];
                console.log('err_get_storage_farm', err);
              })
          });
        })
    }
  }

  viewDetail(farm: farm) {
    const modal = this.modalCtrl.create(
      FarmInfomationPage, farm, {
        cssClass: 'ion-modal'
      }
    )
    modal.present();
  }

  addNewFarm(){
    let modal = this.modalCtrl.create(
      FarmInputPage
    );
    modal.present();
  }
}
