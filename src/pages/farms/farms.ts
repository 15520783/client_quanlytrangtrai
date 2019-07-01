import { Events, IonicPage, LoadingController, ModalController, NavController, NavParams, Platform } from 'ionic-angular';

import { Component } from '@angular/core';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { FarmInfomationPage } from '../farm-infomation/farm-infomation';
import { FarmInputPage } from '../farm-input/farm-input';
import { FarmsProvider } from '../../providers/farms/farms';
import { KEY } from '../../common/const';
import { UserProvider } from '../../providers/user/user';
import { Utils } from '../../common/utils';
import { farm } from '../../common/entity';

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
    public event: Events,
    public userProvider: UserProvider
  ) {
    this.event.subscribe('Farms:update_farm', farm => {
      let idx = this.farms.findIndex(_farm => _farm.id == farm.id);
      if (idx > -1) {
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
    if (!this.farmProvider.farms || !this.farmProvider.farms.length) {
      // this.util.openBackDrop();
      this.farmProvider.getFarms()
        .then((data: Array<farm>) => {
          if (data.length) {
            console.log(this.userProvider.user);
            if (this.userProvider.user.farm.id == '0') {
              this.farms = data;
            } else {
              this.farms = data.filter((farm: farm) => {
                return farm.id == this.userProvider.user.farm.id;
              });
            }

            this.farms = this.farms.filter(farm=>{
              return farm.id != 0 ? true:false;
            })
            this.getSummary();
          }
          // this.util.closeBackDrop();
        })
        .catch((err) => {
          this.util.showToast('Dữ liệu chưa được cập nhật. Vui lòng kiểm tra kết nối.');
          console.log('err_farm_provider', err);
          // this.util.closeBackDrop();
          this.util.getKey(KEY.FARMS)
            .then((data: Array<farm>) => {
              if (data && data.length) {
                if (this.userProvider.user) {
                  if (this.userProvider.user.farm.id == '0') {
                    this.farms = data;
                  } else {
                    this.farms = data.filter((farm: farm) => {
                      return farm.id == this.userProvider.user.farm.id;
                    });
                  }
                  this.farms = this.farms.filter(farm=>{
                    return farm.id != 0 ? true:false;
                  })
                  return this.getSummary();
                }
              }
              return this.farms = [];
            })
        })
    } else {
      if (this.userProvider.user) {
        console.log(this.userProvider.user);
        if (this.userProvider.user.farm.id == '0') {
          this.farms = this.farmProvider.farms;
        } else {
          this.farms = this.util.deepClone(this.farmProvider.farms).filter((farm: farm) => {
            return farm.id == this.userProvider.user.farm.id;
          });
        }
        this.farms = this.farms.filter(farm=>{
          return farm.id != 0 ? true:false;
        })
        this.getSummary();
      } else this.farms = [];
    }

  }

  viewDetail(farm: farm) {
    let callbackRemove = farm => {
      if (farm) {
        this.removeFarm(farm);
        this.navCtrl.pop();
      }
    }
    return this.navCtrl.push(FarmInfomationPage, { farm: farm, callbackRemove: callbackRemove });
  }

  addNewFarm() {
    let callback = (farm: farm) => {
      if (farm) {
        this.farmProvider.createFarm(farm)
          .then((new_farm: any) => {
            new_farm.summary = {
              male_pig: this.deployDataProvider.get_male_pig_of_farm(new_farm.id).length,
              female_pig: this.deployDataProvider.get_female_pig_of_farm(new_farm.id).length,
              child_pig: this.deployDataProvider.get_child_pig_in_farm(new_farm.id).length,
              totalPig: this.deployDataProvider.get_all_pig_of_farm(new_farm.id).length
            }
            this.farms.push(new_farm);
            this.navCtrl.pop();
          })
          .catch((err) => {
            console.log(err);
          })
      }
    }

    this.navCtrl.push(FarmInputPage, { callback: callback });
  }

  removeFarm(farm) {
    let idx = this.farms.findIndex(_farm => _farm.id == farm.id);
    if (idx > -1) {
      this.farms.splice(idx, 1);
    }
  }
}
