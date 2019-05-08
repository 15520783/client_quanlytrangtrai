import { Component, ViewChild } from '@angular/core';
import { NavController, Nav, LoadingController, Events } from 'ionic-angular';
import { FarmsPage } from '../farms/farms';
import { SectionsPage } from '../sections/sections';
import { PigsPage } from '../pigs/pigs';
import { Utils } from '../../common/utils';
import { FarmsProvider } from '../../providers/farms/farms';
import { SectionsProvider } from '../../providers/sections/sections';
import { EmployeePage } from '../employee/employee';
import { WarehousesPage } from '../warehouses/warehouses';
import { SettingsPage } from '../settings/settings';
import { KEY } from '../../common/const';
import { PartnersPage } from '../partners/partners';
import { ActivitiesPage } from '../activities/activities';
import { InvoicesPage } from '../invoices/invoices';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: any;

  activeLogOut: boolean = false;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public util: Utils,
    public farmProvider: FarmsProvider,
    public sectionProvider: SectionsProvider,
    public events: Events
  ) {
    this.pages = [
      { title: 'Trang trại', component: FarmsPage, icon: 'app-farm', active: true },
      { title: 'Khu', component: SectionsPage, icon: 'app-sections', active: false, },
      { title: 'Heo', component: PigsPage, icon: 'app-pig-outline', active: false },
      { title: 'Nhân viên', component: EmployeePage, icon: 'app-employees', active: false },
      { title: 'Kho', component: WarehousesPage, icon: 'app-warehouse', active: false },
      { title: 'Đối tác', component: PartnersPage, icon: 'app-partner', active: false },
      { title: 'Chứng từ', component: InvoicesPage, icon: 'app-file', active: false },
      { title: 'Hoạt động', component: ActivitiesPage, icon: 'app-activities', active: false },
      { title: 'Thiết lập', component: SettingsPage, icon: 'app-settings', active: false },
      // { title: 'Lịch biểu', component: DatePlanPage, icon: 'app-schedule', active: false },
    ];
  }

  ionViewDidLoad() {
    this.rootPage = this.pages[0].component;
    setTimeout(() => {
      this.activeLogOut = true;
    }, 3000);
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (!page.active) {
      this.pages.forEach((element: any) => {
        element.active = false;
      });
      page.active = true;
      this.nav.setRoot(page.component);
    }
  }

  logOut() {
    this.util.removeKey(KEY.ACCESSTOKEN)
      .then(() => {
        this.util.removeKey(KEY.TOKENTYPE)
          .then(() => {
            this.events.publish('app_logout');
          })
      })
      .catch((err: any) => {
        console.log(err);
      })
  }
}
