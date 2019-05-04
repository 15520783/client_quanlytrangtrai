import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, App, ToastController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HeaderColor } from '@ionic-native/header-color';
import { FarmsProvider } from '../providers/farms/farms';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { PigsProvider } from '../providers/pigs/pigs';
import { PigGroupsProvider } from '../providers/pig-groups/pig-groups';
import { SectionsProvider } from '../providers/sections/sections';
import { EmployeesProvider } from '../providers/employees/employees';
import { HousesProvider } from '../providers/houses/houses';
import { WarehousesProvider } from '../providers/warehouses/warehouses';
import { Utils } from '../common/utils';
import { KEY, CONFIG } from '../common/const';
import { SettingsProvider } from '../providers/settings/settings';
import { UserProvider } from '../providers/user/user';
import { PartnerProvider } from '../providers/partner/partner';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  splash: boolean = true;
  public counter = 0;
  dismissing: any;
  lastBack: number;
  spamming: any;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public headerColor: HeaderColor,
    public toast: ToastController,
    public app: App,
    public events: Events,
    public farmProvider: FarmsProvider,
    public pigProvider: PigsProvider,
    public pigGroupProvider: PigGroupsProvider,
    public sectionProvider: SectionsProvider,
    public employeeProvider: EmployeesProvider,
    public houseProvider: HousesProvider,
    public warehouseProvider: WarehousesProvider,
    public settingProvider: SettingsProvider,
    public partnerProvider: PartnerProvider,
    public util: Utils,
    public userProvider: UserProvider,
  ) {
    this.initializeApp();
    this.util.getKey(KEY.ACCESSTOKEN)
      .then((accessToken) => {
        if (accessToken) {
          this.util.getKey(KEY.TOKENTYPE)
            .then((tokenType) => {
              if (tokenType) {
                CONFIG.ACCESS_KEY = tokenType.concat(' ').concat(accessToken);
                this.splash = true;
                this.intinial_sync();
                this.subscribeEventUpdate();
              }
              else {
                this.splash = false;
                this.rootPage = LoginPage;
              }
            })
        } else {
          this.splash = false;
          this.rootPage = LoginPage;
        }
      })

    this.events.subscribe('app_logout', () => {
      this.splash = false;
      this.rootPage = LoginPage;
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if (this.platform.is('cordova')) {
        this.statusBar.styleDefault();
        this.statusBar.styleBlackTranslucent();
        this.splashScreen.hide();
        this.headerColor.tint('#01C2FA');
      }

      this.events.subscribe('app_begin', () => {
        this.util.getKey(KEY.ACCESSTOKEN)
          .then((accessToken) => {
            if (accessToken) {
              this.util.getKey(KEY.TOKENTYPE)
                .then((tokenType) => {
                  if (tokenType) {
                    CONFIG.ACCESS_KEY = tokenType.concat(' ').concat(accessToken);
                    this.splash = true;
                    this.intinial_sync();
                    this.subscribeEventUpdate();
                  }
                  else {
                    this.rootPage = LoginPage;
                  }
                })
            } else {
              this.rootPage = LoginPage;
            }
          })
      })

    })
  }

  /**
   * Check status of connecting to server
   * Update database by requesting to server and  recieved database will be store in local storage..
   */
  intinial_sync() {
    this.userProvider.checkServer()
      .then((res: any) => {
        if (res.success) {
          this.farmProvider.sync();
          this.pigProvider.sync();
          this.pigGroupProvider.sync();
          this.employeeProvider.sync();
          this.partnerProvider.sync();
          this.sectionProvider.sync();
          this.houseProvider.sync();
          this.warehouseProvider.sync();
          this.settingProvider.sync();
          this.sectionProvider.sync();
          // this.invoicesProvider.sync();
        }
      })
    .catch((err: any) => {
      console.log(err);
      // if (err.status == 401) {
      //   this.rootPage = LoginPage;
      //   this.splash = false;
      //   this.util.showToast('Phiên làm việc quá hạn. Vui lòng đăng nhập lại');
      // }
      // else {
      //   this.util.showToast('Lỗi kết nối đến máy chủ. Vui lòng kiểm tra lại kết nối.');
      //   this.rootPage = HomePage;
      //   setTimeout(() => {
      //     this.splash = false;
      //   }, 1000);
      // }
    })
  }


  subscribeEventUpdate() {
    this.events.subscribe('updated', () => {
      this.checkUpdate();
    })
  }

  checkUpdate() {
    if (
      this.farmProvider.updated_flag &&
      this.pigProvider.updated_flag &&
      this.pigGroupProvider.updated_flag &&
      this.employeeProvider.updated_flag &&
      this.sectionProvider.updated_flag &&
      this.houseProvider.updated_flag &&
      this.warehouseProvider.updated_flag &&
      this.settingProvider.updated_flag &&
      this.partnerProvider.updated_flag) {
      this.rootPage = HomePage;
      setTimeout(() => {
        this.splash = false;
      }, 1000);
    }
  }
}
