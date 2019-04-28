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


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  splash: boolean = false;
  public counter = 0;
  dismissing: any;
  lastBack: number;
  spamming: any;

  // public updated_flag = {
  //   farms: false,
  //   sections:false,
  //   houses:false,
  //   pigs: false,
  //   pigGroups:false,
  //   employees:false
  // }



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
    public util: Utils,
    public userProvider:UserProvider
  ) {
    this.initializeApp();
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

      this.events.subscribe('app_logout', () => {
        this.rootPage = LoginPage;
      })
    })
  }


  intinial_sync() {
    this.userProvider.checkServer()
    .then((res:any)=>{
      if(res.success){
        this.farmProvider.sync();
        this.pigProvider.sync();
        this.pigGroupProvider.sync();
        this.employeeProvider.sync();
        this.sectionProvider.sync();
        this.houseProvider.sync();
        this.warehouseProvider.sync();
        this.settingProvider.sync();
        this.sectionProvider.sync();
      }
    })
    .catch((err:any)=>{
      if(err.status == 401){
        this.rootPage = LoginPage;
        this.splash = false;
        this.util.showToast('Phiên làm việc quá hạn. Vui lòng đăng nhập lại');
      }
      else{
        this.util.showToast('Lỗi kết nối đến máy chủ. Vui lòng kiểm tra lại kết nối.');
        this.rootPage = HomePage;
        setTimeout(() => {
          this.splash = false;
        }, 1000);
      }
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
      this.settingProvider.updated_flag) {
      this.rootPage = HomePage;
      setTimeout(() => {
        this.splash = false;
      }, 1000);
    }
  }
}
