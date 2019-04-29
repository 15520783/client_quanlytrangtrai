import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController, ModalController } from 'ionic-angular';
import { FarmsProvider } from '../../providers/farms/farms';
import { Utils } from '../../common/utils';
import { farm } from '../../common/entity';
import { KEY } from '../../common/const';
import { FarmInfomationPage } from '../farm-infomation/farm-infomation';
import { FarmInputPage } from '../farm-input/farm-input';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';


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
    public modalCtrl: ModalController,
    public deployDataProvider: DeployDataProvider
  ) {
    this.farmProvider.farms.forEach((farm)=>{
      console.log(farm.id,{
        male:this.deployDataProvider.get_male_pig_of_farm(farm.id),
        female:this.deployDataProvider.get_female_pig_of_farm(farm.id)
      })
    })
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
    } else {
      console.log(this.farmProvider.farms);
    }
  }

  viewDetail(farm: farm) {
    return this.navCtrl.push(FarmInfomationPage, { farm: farm });
  }

  addNewFarm() {
    return this.navCtrl.push(FarmInputPage);
  }


}
