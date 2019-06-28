import { App, Events, Nav, Platform, ToastController } from 'ionic-angular';
import { CONFIG, KEY, MESSAGE, SETTING_KEY } from '../common/const';
import { Component, ViewChild } from '@angular/core';
import { permission, user } from '../common/entity';

import { DeployDataProvider } from '../providers/deploy-data/deploy-data';
import { EmployeesProvider } from '../providers/employees/employees';
import { FarmsProvider } from '../providers/farms/farms';
import { FcmProvider } from '../providers/fcm/fcm';
import { HeaderColor } from '@ionic-native/header-color';
import { HomePage } from '../pages/home/home';
import { HousesProvider } from '../providers/houses/houses';
import { LoginPage } from '../pages/login/login';
import { PartnerProvider } from '../providers/partner/partner';
import { PigGroupsProvider } from '../providers/pig-groups/pig-groups';
import { PigsProvider } from '../providers/pigs/pigs';
import { SectionsProvider } from '../providers/sections/sections';
import { SettingsProvider } from '../providers/settings/settings';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { UserProvider } from '../providers/user/user';
import { Utils } from '../common/utils';
import { WarehousesProvider } from '../providers/warehouses/warehouses';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  rootParams: any;
  splash: boolean = true;
  public counter = 0;
  lastBack: number;
  allowClose: any;
  dismissing: any;
  spamming: any;

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
    public toastCtrl:ToastController
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

        this.platform.registerBackButtonAction(() => {
          // getActiveNav is being deprecated so, fetch the first available nav.
          const nav = this.app.getActiveNavs()[0]; 
          const active = nav.getActive();
    
          let closeDelay = 2000;
          let spamDelay = 500;
    
          if (active.isOverlay) {
            // Checks if is dismissing something..
            // avoid exceptions if user spams back-button and stack isn't finished dismissing view yet.
            if (!this.dismissing) { 
              active.dismiss().then(() => this.dismissing = false);
            }
            this.dismissing = true;
          } else if (((Date.now() - this.lastBack) < closeDelay) &&
            (Date.now() - this.lastBack) > spamDelay) {
            // Leaves app if user pressed button not faster than 500ms a time, 
            // and not slower than 2000ms a time.
            this.platform.exitApp();
          } else {
            if (!this.spamming) { // avoids multiple toasts caused by button spam.
              let t = this.toastCtrl.create({
                message: "Nhấn lần nữa để thoát",
                duration: closeDelay,
                dismissOnPageChange: true
              });
              t.onDidDismiss(() => this.spamming = false);
              t.present();
            }
            this.spamming = true;
          }
    
          this.lastBack = Date.now();
        });

      }

      this.settingConfig().then(() => {
        this.app_start();
      });

      this.events.subscribe('app_begin', () => {
        this.settingConfig().then(() => {
          this.app_start();
        });
      })

      if (this.platform.is('cordova')) {
        // Listen to incoming messages
        this.fcmProvider.listenToNotifications();
      }

      this.listener_logout();
    })
  }


  settingConfig() {
    return this.util.getKey(SETTING_KEY.SERVER_API)
      .then((serverApi: string) => {
        console.log(serverApi);
        if (serverApi) {
          CONFIG.SERVER_API = serverApi;
        }
        this.util.getKey(SETTING_KEY.DEFAULT_REQUEST_TIMEOUT)
          .then((timeOut: number) => {
            if (timeOut) {
              CONFIG.DEFAULT_TIMEOUT = timeOut;
            }
            this.util.getKey(SETTING_KEY.INTERVAL_SYNC_DELAY)
              .then((intervalDelay: number) => {
                if (intervalDelay) {
                  CONFIG.SYNC_DELAY_DURATION = intervalDelay;
                }
              })
          })
      })
      .catch(err => {
        console.log(err);
      })
  }

  app_start() {
    this.util.getKey(KEY.ACCESSTOKEN)
      .then((accessToken) => {
        if (accessToken) {
          this.util.getKey(KEY.TOKENTYPE)
            .then((tokenType) => {
              if (tokenType) {
                CONFIG.ACCESS_KEY = tokenType.concat(' ').concat(accessToken);
                this.util.getKey(KEY.EMPLOYEE_USER).then((employee) => {
                  this.userProvider.user = employee;
                })
                this.splash = true;
                this.registerFCM();
                this.getRolePermission();
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
  }

  /**
   * Check status of connecting to server
   * Update database by requesting to server and  recieved database will be store in local storage..
   */
  intinial_sync() {
    this.farmProvider.updated_flag = false;
    this.pigProvider.updated_flag = false;
    this.employeeProvider.updated_flag = false;
    this.sectionProvider.updated_flag = false;
    this.houseProvider.updated_flag = false;
    this.warehouseProvider.updated_flag = false;
    this.settingProvider.updated_flag = false;
    this.userProvider.updated_flag = false;

    this.subscribeEventUpdate();
    this.userProvider.checkServer()
      .then((res: any) => {
        if (res.success) {
          this.userProvider.syncSchedule();
          this.farmProvider.sync();
          this.sectionProvider.sync();

          this.pigProvider.sync();

          if (this.userProvider.rolePermission.ROLE_xem_danh_sach_nhan_vien != null) {
            this.employeeProvider.sync();
          } else this.employeeProvider.updated_flag = true;

          this.sectionProvider.sync();
          this.houseProvider.sync();

          if (this.userProvider.rolePermission.ROLE_xem_danh_sach_kho != null) {
            this.warehouseProvider.sync();
          } else this.warehouseProvider.updated_flag = true;


          this.settingProvider.sync();
        }
      })
      .catch((err: any) => {
        this.util.showToast(MESSAGE[CONFIG.LANGUAGE_DEFAULT].TIMEOUT_REQUEST);
        this.rootPage = HomePage;
        setTimeout(() => {
          this.splash = false;
        }, 1000);
        return err;
      })
  }



  subscribeEventUpdate() {
    this.events.subscribe('updated', () => {
      this.checkUpdate();
    })
  }

  checkUpdate() {
    if (
      this.userProvider.updated_flag &&
      this.farmProvider.updated_flag &&
      this.pigProvider.updated_flag &&
      this.employeeProvider.updated_flag &&
      this.sectionProvider.updated_flag &&
      this.houseProvider.updated_flag &&
      this.warehouseProvider.updated_flag &&
      this.settingProvider.updated_flag) {
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

  registerFCM() {
    if (this.platform.is('cordova')) {
      this.util.getTokenNotification().then((token) => {
        if (token) {
          this.util.getKey(KEY.USER).then((userAccount: user) => {
            if (userAccount) {
              this.userProvider.updateTokenNotification(userAccount.id, token)
                .then((isOk) => {
                  console.log(isOk);
                })
                .catch((err) => { return err; })
            }
          })
        }
      })
    }
  }

  /**
   * Xử lý lấy phân quyền người dùng
   */
  getRolePermission() {
    return this.util.getKey(KEY.USER)
      .then((userAccount: user) => {
        if (userAccount) {
          if (userAccount.employee.farm.id == '0') {
            this.userProvider.getPermissionOfUserMaster()
              .then((permissions: Array<permission>) => {
                if (permissions) {
                  let data: any = {};
                  permissions.forEach((permission: permission) => {
                    if (permission) {
                      data[permission.code] = permission;
                    }
                  })
                  this.util.setKey(KEY.PERMISSIONS, data).then(() => {
                    this.userProvider.rolePermission = data;
                  });

                  this.intinial_sync();
                }
              })
              .catch((err) => {
                console.log(err);
                this.util.showToast('Lỗi phân quyền người dùng');
                this.logOut();
              })
          } else {
            this.settingProvider.getPermissionOfRole(userAccount.role.id)
              .then((permissions: Array<permission>) => {
                if (permissions) {
                  let data: any = {};
                  permissions.forEach((permission: permission) => {
                    if (permission) {
                      data[permission.code] = permission;
                    }
                  })
                  this.util.setKey(KEY.PERMISSIONS, data).then(() => {
                    this.userProvider.rolePermission = data;
                  });

                  this.intinial_sync();
                }
              })
              .catch((err) => {
                console.log(err);
                this.util.showToast('Lỗi phân quyền người dùng');
                this.logOut();
              })
          }
        } else {
          this.logOut();
        }
      })
      .catch(err => { console.log(err) });
  }

  settingRole(permissions) {
    if (permissions) {
      let data: any = {};
      permissions.forEach((permission: permission) => {
        if (permission) {
          data[permission.code] = permission;
        }
      })
      this.util.setKey(KEY.PERMISSIONS, data).then(() => {
        this.userProvider.rolePermission = data;
      });
      console.log(data);
      // this.util.setKey(KEY.PERMISSIONS,)
    }
  }


  /**
   * Đăng xuất
   */
  logOut() {
    this.util.clearAllKeyStorage()
      .then((isOK) => {
        console.log(isOK);
        this.events.publish('app_logout');
      })
      .catch((err: any) => {
        console.log(err);
      })
  }
}
