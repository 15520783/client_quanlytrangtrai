import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { section, house, farm } from '../../common/entity';
import { SectionsProvider } from '../../providers/sections/sections';
import { Utils } from '../../common/utils';
import { KEY } from '../../common/const';
import { SectionInfomationPage } from '../section-infomation/section-infomation';
import { HouseInfomationPage } from '../house-infomation/house-infomation';
import { HouseInputPage } from '../house-input/house-input';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { HousesProvider } from '../../providers/houses/houses';

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
    public util: Utils,
  ) {
    this.init();
  }

  init() {
    this.farms = this.deployData.get_farm_list_for_select();
    this.sections = this.deployData.get_sections_of_farm(this.farms[0].value);
    this.sections.forEach((section: any) => {
      section.houses = this.deployData.get_houses_of_section(section.id);
    })
    this.employees = this.deployData.get_object_list_key_of_employees();
  }



  ionViewWillEnter() {
    console.log('ionViewWillEnter SectionsPage');
    this.getAllSections();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SectionsPage');
    this.farmSelected = this.farms[0].id;
  }

  changeFarm(res) {
    this.sections = this.deployData.get_sections_of_farm(res.valueId);
    
    this.sections.forEach((section: any) => {
      section.houses = this.deployData.get_houses_of_section(section.id);
    })
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
    // this.util.openModal(SectionInfomationPage,section);
    this.navCtrl.push(SectionInfomationPage, section);
  }

  viewHouse(house: house) {
    // this.util.openModal(HouseInfomationPage,house);
    this.navCtrl.push(HouseInfomationPage, { house: house });
  }


  addNewHouse(section) {
    let callback = (house: house) => {
      if (house) {
        this.houseProvider.createNewHouse(house)
          .then((house: house) => {
            section.houses.push(house);
            this.navCtrl.pop();
          })
          .catch((err)=>{
            console.log(err);
          })
      }
    }
    this.navCtrl.push(HouseInputPage, {
      section: section,
      callback: callback
    });
  }
}
