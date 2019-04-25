import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { section, house, farm } from '../../common/entity';
import { SectionsProvider } from '../../providers/sections/sections';
import { Utils } from '../../common/utils';
import { KEY } from '../../common/const';
import { SectionInfomationPage } from '../section-infomation/section-infomation';
import { HouseInfomationPage } from '../house-infomation/house-infomation';
import { HouseInputPage } from '../house-input/house-input';
import { FarmsProvider } from '../../providers/farms/farms';
import { HousesProvider } from '../../providers/houses/houses';

@IonicPage()
@Component({
  selector: 'page-sections',
  templateUrl: 'sections.html',
})
export class SectionsPage {

  public sections: Array<section> = [];

  public houses: Array<house> = [];
  
  public farm_init:number;
  public farms_select: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sectionProvider: SectionsProvider,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public util : Utils,
    public farmProvider : FarmsProvider,
    public houseProvider: HousesProvider
  ) {
    this.init();
  }

  init(){
    this.sections = this.sectionProvider.getSectionByIdFarm(this.navParams.data.farm.id);
    this.sections.forEach((section:any)=>{
      section.houses = this.houseProvider.getHouseByIdSection(section.id);
    })
    
    this.farmProvider.farms.forEach((e:farm)=>{
      this.farms_select.push({
        name:e.name,
        value:e.id
      })
    })
  }

  

  ionViewWillEnter() {
    console.log('ionViewWillEnter SectionsPage');
    this.getAllSections();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SectionsPage');
    this.farm_init = this.navParams.data.farm.id;
  }

  changeFarm(res){
    this.sections = this.sectionProvider.getSectionByIdFarm(res.valueId);
    this.sections.forEach((section:any)=>{
      section.houses = this.houseProvider.getHouseByIdSection(section.id);
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
    this.navCtrl.push(SectionInfomationPage,section);
  }

  viewHouse(house:house){
    // this.util.openModal(HouseInfomationPage,house);
    this.navCtrl.push(HouseInfomationPage,{house:house});
  }


  addNewHouse(section){
    // let modal = this.modalCtrl.create(HouseInputPage,{section:section});
    // modal.present();
    this.navCtrl.push(HouseInputPage);
  }
}
