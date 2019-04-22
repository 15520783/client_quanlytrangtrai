import { Component, ViewChild } from '@angular/core';
import { NavController, Nav, LoadingController } from 'ionic-angular';
import { FarmsPage } from '../farms/farms';
import { SectionsPage } from '../sections/sections';
import { PigsPage } from '../pigs/pigs';
import { Utils } from '../../common/utils';
import { farm } from '../../common/entity';
import { FarmsProvider } from '../../providers/farms/farms';
import { SectionsProvider } from '../../providers/sections/sections';
import { PigGroupsPage } from '../pig-groups/pig-groups';
import { EmployeePage } from '../employee/employee';
import { DatePlanPage } from '../date-plan/date-plan';
import { WarehousesPage } from '../warehouses/warehouses';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = FarmsPage;

  // pages: Array<{ title: string, component: any, icon: string, active: boolean, init: any }>;
  pages: any;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public util: Utils,
    public farmProvider: FarmsProvider,
    public sectionProvider: SectionsProvider
  ) {
    

    this.pages = [
      { title: 'Trang trại', component: FarmsPage, icon: 'app-farm', active: true },
      {
        title: 'Khu', component: SectionsPage, icon: 'app-sections', active: false, init: true,
        initProcess(util: Utils, nav: Nav, pages: any, component, farms: Array<farm>) {
          let data = [];
          farms.forEach((e: farm) => {
            if (e) {
              data.push({
                name: e.name,
                type: 'radio',
                label: e.name,
                value: e,
              })
            }
          });
          data[0].check = true;

          let options = {
            multiple: false,
            cssClass: 'ion-alert',
            title: 'Chọn trang trại',
            inputs: data,
            buttons: [
              {
                text: 'Đóng',
                role: 'cancel',
                cssClass: 'secondary',
                handler: () => {
                  console.log('Confirm Cancel');
                }
              }, {
                text: 'Chọn',
                handler: (data) => {
                  pages.forEach((element: any) => {
                    element.active = false;
                  });
                  this.active = true;
                  nav.setRoot(component,data);
                }
              }
            ]
          }

          return util.showAlert(options);
        }
      },
      { title: 'Heo', component: PigsPage, icon: 'app-pig-outline', active: false },
      { title: 'Nhóm heo', component: PigGroupsPage, icon: 'app-pig-foot', active: false },
      { title: 'Nhân viên', component: EmployeePage, icon: 'app-employees', active: false },
      { title: 'Kho', component: WarehousesPage, icon: 'app-warehouse', active: false },
      { title: 'Lịch biểu', component: DatePlanPage, icon: 'app-schedule', active: false },
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.init) {
      page.initProcess(this.util, this.nav, this.pages, page.component, this.farmProvider.farms);
    } else {
      if (!page.active) {
        this.pages.forEach((element: any) => {
          element.active = false;
        });
        page.active = true;
        this.nav.setRoot(page.component);
      }
    }
  }

  
}
