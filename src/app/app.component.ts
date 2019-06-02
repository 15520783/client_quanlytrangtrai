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
import { KEY, CONFIG, MESSAGE, ERROR_NAME } from '../common/const';
import { SettingsProvider } from '../providers/settings/settings';
import { UserProvider } from '../providers/user/user';
import { PartnerProvider } from '../providers/partner/partner';
import { DeployDataProvider } from '../providers/deploy-data/deploy-data';
import { FcmProvider } from '../providers/fcm/fcm';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  rootParams: any;
  splash: boolean = true;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public headerColor: HeaderColor,
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
    public deployData: DeployDataProvider,
    public util: Utils,
    public userProvider: UserProvider,
    public fcmProvider: FcmProvider,
    public toastCtrl: ToastController,
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
                  if (this.platform.is('cordova')) {
                    // Get a FCM token
                    this.fcmProvider.getToken();
                  }
                  CONFIG.ACCESS_KEY = tokenType.concat(' ').concat(accessToken);
                  this.splash = true;
                  this.userProvider.getRoleUser()
                      .then((data) => {
                        console.log(data);
                      })
                      .catch(err => {
                        console.log(err);
                      })
                  this.intinial_sync();
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

      this.events.subscribe('app_begin', () => {
        this.util.getKey(KEY.ACCESSTOKEN)
          .then((accessToken) => {
            if (accessToken) {
              this.util.getKey(KEY.TOKENTYPE)
                .then((tokenType) => {
                  if (tokenType) {
                    CONFIG.ACCESS_KEY = tokenType.concat(' ').concat(accessToken);
                    this.splash = true;
                    this.userProvider.getRoleUser()
                      .then((data) => {
                        console.log(data);
                      })
                      .catch(err => {
                        console.log(err);
                      })
                    this.intinial_sync();
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
      })

      if (this.platform.is('cordova')) {
        // Listen to incoming messages
        this.fcmProvider.listenToNotifications();
      }

      this.listener_logout();
    })
  }

  /**
   * Check status of connecting to server
   * Update database by requesting to server and  recieved database will be store in local storage..
   */
  intinial_sync() {
    // this.farmProvider.updated_flag = false;
    // this.pigProvider.updated_flag = false;
    // this.employeeProvider.updated_flag = false;
    // this.sectionProvider.updated_flag = false;
    // this.houseProvider.updated_flag = false;
    // this.warehouseProvider.updated_flag = false;
    // this.settingProvider.updated_flag = false;
    // this.partnerProvider.updated_flag = false;
    this.subscribeEventUpdate();
    this.userProvider.checkServer()
      .then((res: any) => {
        if (res.success) {
          this.userProvider.sync();
          this.farmProvider.sync();
          this.pigProvider.sync();
          this.employeeProvider.sync();
          this.partnerProvider.sync();
          this.sectionProvider.sync();
          this.houseProvider.sync();
          this.warehouseProvider.sync();
          this.settingProvider.sync();
          this.sectionProvider.sync();
        }
      })
      .catch((err: any) => {
        if (err.status != 401) {
          if (err.name == ERROR_NAME.TIMEMOUT_ERROR || err.name == ERROR_NAME.ERROR_RESPONSE) {
            this.util.showToast(MESSAGE[CONFIG.LANGUAGE_DEFAULT].TIMEOUT_REQUEST);
            this.rootPage = HomePage;
            setTimeout(() => {
              this.splash = false;
            }, 1000);
          }
        }
        this.events.unsubscribe('updated');
      })
  }

  subscribeEventUpdate() {
    this.events.subscribe('updated', () => {
      this.checkUpdate();
    })
  }

  checkUpdate() {
    if (this.userProvider.updated_flag &&
      this.farmProvider.updated_flag &&
      this.pigProvider.updated_flag &&
      this.employeeProvider.updated_flag &&
      this.sectionProvider.updated_flag &&
      this.houseProvider.updated_flag &&
      this.warehouseProvider.updated_flag &&
      this.settingProvider.updated_flag &&
      this.partnerProvider.updated_flag) {
      this.rootPage = HomePage;
      this.events.unsubscribe('updated');
      setTimeout(() => {
        this.splash = false;
      }, 2000);
    }
  }

  listener_logout() {
    this.events.subscribe('app_logout', () => {
      this.splash = true;
      this.rootPage = LoginPage;
      setTimeout(() => {
        this.splash = false;
      }, 2000);
    })
  }
}
