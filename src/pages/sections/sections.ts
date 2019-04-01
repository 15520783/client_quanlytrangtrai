import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { section } from '../../common/entity';
import { SectionsProvider } from '../../providers/sections/sections';
import { Utils } from '../../common/utils';
import { KEY } from '../../common/const';

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
    this.getAllSections();
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


  getAllSections(){
    this.util.showLoading({
      content: 'Đang tải dữ liệu',
      spinner: 'bubbles',
      cssClass: 'ion-loading'
    });
    this.sectionProvider.getSections()
    .then((data:Array<section>)=>{
      if(data.length){
        this.util.setKey(KEY.SECTIONS,data)
        .then(()=>{
          this.sections = this.sectionProvider.sections = data;
          this.util.closeLoading();
        })
        .catch((err)=>{
          console.log('err_storage_section',err);
          this.util.closeLoading();
        })
      }
    })
    .catch((err)=>{
      console.log('err_section_provider',err);
      this.util.getKey(KEY.SECTIONS)
      .then((data:Array<section>)=>{
        this.util.closeLoading();
        this.sections = this.sectionProvider.sections = data;
      })
      .catch((err)=>{
        this.util.closeLoading();
        this.sections = this.sectionProvider.sections = [];
        console.log('err_get_storage_section',err);
      })
    })
  }
}
