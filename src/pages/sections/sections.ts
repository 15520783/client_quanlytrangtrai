import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { section } from '../../common/entity';
import { SectionsProvider } from '../../providers/sections/sections';
import { Utils } from '../../common/utils';

/**
 * Generated class for the SectionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sections',
  templateUrl: 'sections.html',
})
export class SectionsPage {

  public sections: Array<section> = [];

  items = [
    { idx: 1, expand: false },
    { idx: 2, expand: false },
    { idx: 3, expand: false },
    { idx: 4, expand: false }
  ]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sectionProvider: SectionsProvider,
    public loadingCtrl: LoadingController,
    public util: Utils
  ) {
    console.log(this.navParams.data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SectionsPage');
    let loading = this.loadingCtrl.create({
      content: 'Đang tải dữ liệu',
      spinner: 'bubbles',
      cssClass: 'ion-loading'
    });
    loading.present();
    this.sectionProvider.getSections().then((data:Array<section>)=>{
      if(data.length){
        this.sections = data;
        loading.dismiss();
      }
    })
  }

  activeItem(section){
    if(section.active){
      section.expand = !section.expand;
    }else{
      this.sections.forEach((e:any)=>{
        e.active=false;
        e.expand=false;
      })
      section.active = true;
      section.expand = true;
    }
  }

  convertDate(date: any) {
    return this.util.convertDate(date);
  }
}
