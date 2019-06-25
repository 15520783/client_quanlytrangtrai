import { Component, ViewChild } from '@angular/core';
import { IonicPage, Nav, NavController, NavParams, Platform, Slides } from 'ionic-angular';

import { BreedingListPage } from '../breeding-list/breeding-list';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { MatingListPage } from '../mating-list/mating-list';
import { PigInfomationPage } from '../pig-infomation/pig-infomation';
import { PigsProvider } from '../../providers/pigs/pigs';
import { SpermListPage } from '../sperm-list/sperm-list';
import { UserProvider } from '../../providers/user/user';
import { Utils } from '../../common/utils';
import { VARIABLE } from '../../common/const';

@IonicPage()
@Component({
  selector: 'page-pig-summary',
  templateUrl: 'pig-summary.html',
})
export class PigSummaryPage {
  @ViewChild('slider') slider: Slides;
  @ViewChild(Nav) nav: Nav;

  public rootPage: any;
  public rootParam: any;
  public tab = "0";

  public data: any = {}
  public sectionTypeId: string;
  public pages: any = [];

  constructor(
    public navCtrl: NavController,
    public pigProvider: PigsProvider,
    public navParams: NavParams,
    public platform: Platform,
    public util: Utils,
    public deployData: DeployDataProvider,
    public userProvider:UserProvider
  ) {
    if (this.navParams.data.pig) {
      this.data.callbackUpdate = this.navParams.data.callbackUpdate;
      this.data.callbackRemove = this.navParams.data.callbackRemove;
      this.data.pig = this.navParams.data.pig;
      this.data.pig.house = this.deployData.get_house_by_id(this.data.pig.houseId);
      this.data.sectionType = { id: this.data.pig.house.section.typeId };
    }

    if(this.userProvider.rolePermission.ROLE_xem_thong_tin_heo != null){
      this.pages.push(
        {
          title: 'Thông tin heo',
          component: PigInfomationPage,
          icon: 'ios-information-circle', active: true, expand: false,
        }
      )
    }

    if(this.userProvider.rolePermission.ROLE_xem_lich_su_hoat_dong != null){
      this.pages.push(
        {
          title: 'Danh sách hoạt động',
          components: [
            {
              title: 'Danh sách lên giống', component: BreedingListPage,
              active: false,
              notShow: (this.data.pig.gender == VARIABLE.GENDER[2].id) ? false : true,
            },
            {
              title: 'Danh sách lấy tinh', component: SpermListPage,
              active: false,
              notShow: (this.data.pig.gender == VARIABLE.GENDER[1].id) ? false : true
            },
            {
              title: 'Danh sách phối', component: MatingListPage,
              active: false,
            }
          ],
          icon: 'ios-information-circle', active: false, expand: false,
        }
      )
    }
    
    if(this.pages && this.pages.length){
      this.rootPage = this.pages[0].component;
      this.rootParam = this.data;
    }
  }

  ngAfterViewInit() {
    if (this.slider)
      this.slider.autoHeight = true;
  }

  slideChange() {
    if (this.tab == "2" || this.slider.realIndex == 2) {
      this.getActivities();
    }
    this.tab = this.slider.realIndex.toString();
  }

  selectedTab(index) {
    this.slider.slideTo(index);
  }


  openPage(page) {
    if (!page.active) {
      this.pages.forEach((element: any) => {
        element.active = false;
        if (element.components) {
          element.components.forEach((e: any) => {
            e.active = false;
          })
        }
      });
      page.active = true;
      if (page.component) {
        this.data.viewMode = true;
        this.nav.setRoot(page.component, this.data);
      }
    }
  }

  openOptions(page) {
    this.navCtrl.push(page, this.data);
  }

  getActivities() {
    if (!this.data.breedings || !this.data.matings || !this.data.sperms) {
      this.util.openBackDrop();
      this.pigProvider.getInformationPig(this.data.pig.id)
        .then((data: any) => {
          if (data) {
            this.data.breedings = data.breedings ? data.breedings : [];
            this.data.sperms = data.sperms ? data.sperms : [];
            this.data.matings = data.matings ? data.matings : [];
          }
          this.util.closeBackDrop();
        })
        .catch((err: Error) => {
          console.log(err);
          this.util.closeBackDrop();
        })
    }
  }


  updateCallback(pig){
    if(pig){
      this.data.pig = pig;
      this.navParams.get('callbackUpdate')(pig);
      this.navCtrl.pop();
    }
  }

  removeCallback(pig){
    if(pig){
      this.data.pig = pig;
      this.navParams.get('callbackRemove')(pig);
      this.navCtrl.pop();
    }
  }
}
