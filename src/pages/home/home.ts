import { Component, ViewChild } from '@angular/core';
import { NavController, Nav } from 'ionic-angular';
import { FarmsPage } from '../farms/farms';
import { SectionsPage } from '../sections/sections';
import { PigsPage } from '../pigs/pigs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Nav) nav: Nav;
  
  rootPage: any = FarmsPage;

  pages: Array<{ title: string, component: any, icon: string , active:boolean }>;

  
  constructor(public navCtrl: NavController) {
    this.pages = [
      { title: 'Quản lý trang trại', component: FarmsPage , icon: 'app-farm' ,active : true},
      { title: 'Quản lý khu', component: SectionsPage , icon: 'app-section' ,active : false},
      { title: 'Quản lý heo', component: PigsPage , icon: 'app-pig-outline' ,active : false},
    ];
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(!page.active){
      this.pages.forEach((element:any) => {
        element.active= false;
      });

      page.active = true;
  
      this.nav.setRoot(page.component);
    }
  }
}
