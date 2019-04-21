import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, App, ToastController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HeaderColor } from '@ionic-native/header-color';
import { FarmsProvider } from '../providers/farms/farms';
import { LoginPage } from '../pages/login/login';
import { EmployeeInformationPage } from '../pages/employee-information/employee-information';
import { HomePage } from '../pages/home/home';
import { TestInputPage } from '../pages/test-input/test-input';
import { FarmInputPage } from '../pages/farm-input/farm-input';
import { PigsProvider } from '../providers/pigs/pigs';
import { PigGroupsProvider } from '../providers/pig-groups/pig-groups';
import { SectionsProvider } from '../providers/sections/sections';
import { EmployeesProvider } from '../providers/employees/employees';
import { HousesProvider } from '../providers/houses/houses';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
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
    public houseProvider: HousesProvider
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
              let t = this.toast.create({
                message: "'Nhấn lần nữa để thoát.",
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



      // this.intinial_sync();
      // this.subscribeEventUpdate();


      this.events.subscribe('app_begin',()=>{
        this.splash=true;
        this.intinial_sync();
        this.subscribeEventUpdate();
      })
    })
  }


  intinial_sync() {
    this.farmProvider.sync();
    this.pigProvider.sync();
    this.pigGroupProvider.sync();
    this.employeeProvider.sync();
    this.sectionProvider.sync();
    this.houseProvider.sync();
  }


  subscribeEventUpdate() {
    this.events.subscribe('updated:farm', () => {
      this.checkUpdate();
    })
    this.events.subscribe('updated:pig', () => {
      this.checkUpdate();
    })
    this.events.subscribe('updated:pigGroup', () => {
      this.checkUpdate();
    })
    this.events.subscribe('updated:section', () => {
      this.checkUpdate();
    })
    this.events.subscribe('updated:employee', () => {
      this.checkUpdate();
    })
    this.events.subscribe('updated:house', () => {
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
      this.houseProvider.updated_flag) {
      this.rootPage = HomePage;
      setTimeout(() => {
        this.splash = false;
      }, 1000);
    }
  }
}
