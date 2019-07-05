import { IonicPage, LoadingController, ModalController, NavController, NavParams, Platform } from 'ionic-angular';
import { farm, house, section } from '../../common/entity';

import { Component } from '@angular/core';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { HouseInfomationPage } from '../house-infomation/house-infomation';
import { HouseInputPage } from '../house-input/house-input';
import { HousesProvider } from '../../providers/houses/houses';
import { KEY } from '../../common/const';
import { SectionInfomationPage } from '../section-infomation/section-infomation';
import { SectionInputPage } from '../section-input/section-input';
import { SectionsProvider } from '../../providers/sections/sections';
import { UserProvider } from '../../providers/user/user';
import { Utils } from '../../common/utils';

@IonicPage()
@Component({
  selector: 'page-sections',
  templateUrl: 'sections.html',
})
export class SectionsPage {

  public sections: Array<section> = [];
  public employees: any = {};

  public houses: Array<house> = [];

  public farms: any = [];
  public farmSelected: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sectionProvider: SectionsProvider,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public deployData: DeployDataProvider,
    public houseProvider: HousesProvider,
    public platform: Platform,
    public util: Utils,
    public userProvider: UserProvider
  ) {
    this.init();
  }

  init() {
    this.farms = this.deployData.get_farm_list_for_select();
    this.farmSelected = this.farms[0].value;
    this.sections = this.deployData.get_sections_of_farm(this.farmSelected);
    this.sections.forEach((section: any) => {
      section.houses = this.deployData.get_houses_of_section(section.id);
      section.houses.forEach((e:house)=>{
        e['foundingDisplay'] = this.util.convertDate(e.founding);
        e['totalPig'] = this.deployData.get_pigs_of_house(e.id).length;
      });
    })
    this.employees = this.deployData.get_object_list_key_of_employees();
  }



  ionViewWillEnter() {
    this.getAllSections();
  }

  ionViewDidLoad() {
  }

  changeFarm(res) {
    this.farmSelected = res.valueId;
    this.sections = this.deployData.get_sections_of_farm(this.farmSelected);

    this.sections.forEach((section: any) => {
      section.houses = this.deployData.get_houses_of_section(section.id);
      section.houses.forEach((e:house)=>{
        e['foundingDisplay'] = this.util.convertDate(e.founding);
        e['totalPig'] = this.deployData.get_pigs_of_house(e.id).length;
      });
    });
  }

  activeItem(section) {
    if (section.active) {
      section.expand = !section.expand;
    } else {
      this.sections.forEach((e: any) => {
        e.active = false;
        e.expand = false;
      })
      section.active = true;
      section.expand = true;
    }
  }

  convertDate(date: any) {
    return this.util.convertDate(date);
  }


  getAllSections() {
    if (!this.sectionProvider.sections.length) {
      this.util.showLoading('Đang tải dữ liệu');
      this.sectionProvider.getSections()
        .then((data: Array<section>) => {
          if (data.length) {
            this.util.setKey(KEY.SECTIONS, data)
              .then(() => {
                this.sections = this.sectionProvider.sections = data;
                this.util.closeLoading();
              })
              .catch((err) => {
                console.log('err_storage_section', err);
                this.util.closeLoading();
              })
          }
        })
        .catch((err) => {
          this.util.closeLoading().then(() => {
            this.util.showToast('Dữ liệu chưa được cập nhật. Vui lòng kiểm tra kết nối.');
            console.log('err_section_provider', err);
            this.util.getKey(KEY.SECTIONS)
              .then((data: Array<section>) => {
                this.sections = this.sectionProvider.sections = data;
              })
              .catch((err) => {
                this.sections = this.sectionProvider.sections = [];
                console.log('err_get_storage_section', err);
              })
          })
        })
    }
  }


  viewDetail(section: section) {
    let callbackRemove = (section: section) => {
      if (section) {
        let idx = this.sections.findIndex(_secion => _secion.id == section.id);
        if (idx > -1) {
          this.sections.splice(idx, 1);
        }
        this.navCtrl.pop();
      }
    }
    this.navCtrl.push(SectionInfomationPage, { section: section, callbackRemove: callbackRemove });
  }

  viewHouse(house: house) {
    if (this.userProvider.rolePermission.ROLE_xem_thong_tin_chuong != null) {
      let callbackRemove = (_house: house) => {
        if (_house) {
          let idx = this.sections.findIndex(section => section.id == _house.section.id);
          if (idx > -1) {
            let idx1 = this.sections[idx]['houses'].findIndex(obj => obj.id == _house.id);
            if (idx1 > -1) {
              this.sections[idx]['houses'].splice(idx1, 1);
            }
          }
          this.navCtrl.pop();
        }
      }
      this.navCtrl.push(HouseInfomationPage, { house: house, callbackRemove: callbackRemove });
    }
  }


  addNewHouse(section) {
    let callback = (house: house) => {
      if (house) {
        this.houseProvider.createNewHouse(house)
          .then((house: house) => {
            if (house) {
              section.houses.push(house);
              this.houseProvider.updatedHouse(house);
              this.navCtrl.pop();
            }
          })
          .catch((err) => {
            console.log(err);
          })
      }
    }
    this.navCtrl.push(HouseInputPage, {
      section: section,
      callback: callback
    });
  }


  addNewSection() {
    let callback = (section: section) => {
      if (section) {
        this.sectionProvider.createNewSection(section)
          .then((newSection: section) => {
            if (newSection) {
              this.sectionProvider.updatedSection(newSection);
              this.sections.push(newSection);
            }
            this.navCtrl.pop();
          })
          .catch(err => { return err; })
      }
    }

    this.navCtrl.push(SectionInputPage, { farmId: this.farmSelected, callback: callback })
  }
}
