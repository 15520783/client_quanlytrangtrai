import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, Platform, Slides } from 'ionic-angular';
import { PigInfomationPage } from '../pig-infomation/pig-infomation';
import { pig } from '../../common/entity';
import { VARIABLE } from '../../common/const';
import { PigsProvider } from '../../providers/pigs/pigs';
import { Utils } from '../../common/utils';
import { BreedingListPage } from '../breeding-list/breeding-list';
import { SpermListPage } from '../sperm-list/sperm-list';
import { MatingListPage } from '../mating-list/mating-list';

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

  // public pig: pig;
  public data: any = {

  }
  // public dataActivities: any = {};
  public pages: any = [];

  constructor(
    public navCtrl: NavController,
    public pigProvider: PigsProvider,
    public navParams: NavParams,
    public platform: Platform,
    public util: Utils
  ) {
    if (this.navParams.data.pig) {
      this.data.pig = this.navParams.data.pig;
    }

    this.pages = [
      {
        title: 'Thông tin heo',
        component: PigInfomationPage,
        icon: 'ios-information-circle', active: true, expand: false,
      },
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
    ]

    this.rootPage = PigInfomationPage;
    this.rootParam = this.data;
  }

  ngAfterViewInit() {
    if (this.slider)
      this.slider.autoHeight = true;
  }

  slideChange() {
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
        console.log(this.data);
        this.nav.setRoot(page.component, this.data);
      }
    }
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

  // setData = data => {
  //   if (data) {
  //     this.data.dataActivities = data;
  //   }
  // }
}
