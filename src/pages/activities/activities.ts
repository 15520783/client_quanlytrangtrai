import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Events, Nav } from 'ionic-angular';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { PigOutPage } from '../pig-out/pig-out';
import { VARIABLE } from '../../common/const';

@IonicPage()
@Component({
  selector: 'page-activities',
  templateUrl: 'activities.html',
})
export class ActivitiesPage {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;

  public section_type: any;
  public pages: any = [];
  public components: any = {};
  public rootParam:any = {name:'Thái'};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public deployData: DeployDataProvider,
    public events: Events
  ) {
    this.components = {
      move_pig_khu_cach_ly: {
        name: 'Chuyển(xuất) heo', component: PigOutPage, active: false,
        data:{
          sectionType:VARIABLE.SECTION_TYPE[1]
        }
      },
      move_pig_khu_noc: {
        name: 'Chuyển(xuất) heo', component: PigOutPage, active: false,
        data:{
          sectionType:VARIABLE.SECTION_TYPE[2]
        }
      },
      move_pig_khu_phoi: {
        name: 'Chuyển(xuất) heo', component: PigOutPage, active: false,
        data:{
          sectionType:VARIABLE.SECTION_TYPE[3]
        }
      },
      move_pig_khu_mang_thai: {
        name: 'Chuyển(xuất) heo', component: PigOutPage, active: false,
        data:{
          sectionType:VARIABLE.SECTION_TYPE[4]
        }
      },
      move_pig_khu_de: {
        name: 'Chuyển(xuất) heo', component: PigOutPage, active: false,
        data:{
          sectionType:VARIABLE.SECTION_TYPE[5]
        }
      },
      move_pig_khu_cai_sua: {
        name: 'Chuyển(xuất) heo', component: PigOutPage, active: false,
        data:{
          sectionType:VARIABLE.SECTION_TYPE[6]
        }
      },
      move_pig_khu_hau_bi: {
        name: 'Chuyển(xuất) heo', component: PigOutPage, active: false,
        data:{
          sectionType:VARIABLE.SECTION_TYPE[7]
        }
      },
      move_pig_khu_8:{
        name: 'Chuyển(xuất) heo', component: PigOutPage, active: false,
        data:{
          sectionType:VARIABLE.SECTION_TYPE[8]
        }
      },
      breeding_pig_khu_cach_ly: {
        name: 'Lên giống', component: PigOutPage, active: false
      },
      sperm_pig_khu_noc: {
        name: 'Khai thác tinh heo', component: PigOutPage, active: false
      },
      mating_pig_khu_phoi: {
        name: 'Phối giống', component: PigOutPage, active: false
      },
      pregnancy_pig_khu_mang_thai: {
        name: 'Danh sách heo mang thai', component: PigOutPage, active: false
      },
      chuyen_heo_nen_khu_cai_sua: {
        name: 'Chuyển heo nền', component: PigOutPage, active: false
      }
    }

    this.pages = [
      {
        title: 'Khu cách ly',
        components: [
          this.components.move_pig_khu_cach_ly,
          this.components.breeding_pig_khu_cach_ly
        ],
        icon: 'app-activities', active: true, expand: false
      },
      {
        title: 'Khu nọc',
        components: [
          this.components.move_pig_khu_noc,
          this.components.sperm_pig_khu_noc
        ],
        icon: 'app-activities', active: false, expand: false
      },
      {
        title: 'Khu phối',
        components: [
          this.components.move_pig_khu_phoi,
          this.components.mating_pig_khu_phoi
        ],
        icon: 'app-activities', active: false
      },
      {
        title: 'Khu mang thai',
        components: [
          this.components.move_pig_khu_mang_thai,
          this.components.pregnancy_pig_khu_mang_thai
        ],
        icon: 'app-activities', active: false
      },
      {
        title: 'Khu đẻ ',
        components: [
          this.components.move_pig_khu_de,
        ],
        icon: 'app-activities', active: false
      },
      {
        title: 'Khu cai sữa',
        components: [
          this.components.move_pig_khu_cai_sua,
          this.components.chuyen_heo_nen_khu_cai_sua
        ],
        icon: 'app-activities', active: false
      },
      {
        title: 'Khu hậu bị',
        components: [
          this.components.move_pig_khu_hau_bi,
        ],
        icon: 'app-activities', active: false
      },
      {
        title: 'Khu 8',
        components: [
          this.components.move_pig_khu_8
        ],
        icon: 'app-activities', active: false
      },
    ];


    this.pages[0].active = true;
    this.pages[0].components[0].active = true;
    this.rootPage = this.pages[0].components[0].component;
    this.rootParam = this.pages[0].components[0].data;
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivitiesPage');
    this.init();
  }

  public sectionId: string = '6';

  init() {
    this.sectionId = this.deployData.get_section_list_for_select()[0].value;
    this.events.publish('activities:PigOut');
  }

  openPage(page) {
    if (!page.active) {
      this.pages.forEach((element: any) => {
        element.active = false;
      });
      // Object.keys(this.components).forEach(key => {
      //   this.components[key].active = false;
      // })
      page.active = true;
      // if (page.component)
      //   this.nav.setRoot(page.component);
    }
  }

  openComponent(componentObj) {
    if (!componentObj.active) {
      Object.keys(this.components).forEach(key => {
        this.components[key].active = false;
      })
    }
    componentObj.active = true;
    this.nav.setRoot(componentObj.component,componentObj.data)
  }
} 
