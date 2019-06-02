import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController, ModalController, Events } from 'ionic-angular';
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

  public farms = [];

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public farmProvider: FarmsProvider,
    public util: Utils,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public deployDataProvider: DeployDataProvider,
    public event: Events
  ) {
    this.getAllFarms();
    this.event.subscribe('Farms:update_farm', farm => {
      let idx = this.farms.findIndex(_farm => _farm.id == farm.id);
      if(idx > -1){
        farm.summary = this.farms[idx].summary;
        this.farms[idx] = farm;
      }
    })
  }

  getSummary() {
    this.farms.forEach((farm: any) => {
      farm.summary = {
        male_pig: this.deployDataProvider.get_male_pig_of_farm(farm.id).length,
        female_pig: this.deployDataProvider.get_female_pig_of_farm(farm.id).length,
        child_pig: this.deployDataProvider.get_child_pig_in_farm(farm.id).length,
        totalPig: this.deployDataProvider.get_all_pig_of_farm(farm.id).length
      }
    })
  }

  ionViewDidLoad() {
    this.getAllFarms();
  }

  convertDate(date: any) {
    return this.util.convertDate(date);
  }

  getAllFarms() {
    if (!this.farmProvider.farms.length) {
      this.util.openBackDrop();
      this.farmProvider.getFarms()
        .then((data: Array<farm>) => {
          if (data.length) {
            this.farms = data;
            this.getSummary();
          }
        })
        .catch((err) => {
          this.util.closeBackDrop().then(() => {
            this.util.showToast('Dữ liệu chưa được cập nhật. Vui lòng kiểm tra kết nối.');
            console.log('err_farm_provider', err);
            this.util.getKey(KEY.FARMS)
              .then((data: Array<farm>) => {
                this.farms = data;
                this.farmProvider.farms = data;
                this.getSummary();
              })
          });
        })
    } else {
      this.farms = this.util.deepClone(this.farmProvider.farms);
      console.log(this.util.deepClone(this.farmProvider.farms));
      this.getSummary();
    }

  }

  viewDetail(farm: farm) {
    return this.navCtrl.push(FarmInfomationPage, { farm: farm });
  }

  addNewFarm() {
    return this.navCtrl.push(FarmInputPage);
  }


}
