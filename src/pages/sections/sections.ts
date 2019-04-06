import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { section } from '../../common/entity';
import { SectionsProvider } from '../../providers/sections/sections';
import { Utils } from '../../common/utils';
import { KEY } from '../../common/const';
import { SectionInfomationPage } from '../section-infomation/section-infomation';

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

  public sections: Array<section> = this.sectionProvider.sections;

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
    public util : Utils
  ) {
    console.log(this.navParams.data);
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter SectionsPage');
    this.getAllSections();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SectionsPage');
  }

  activeItem(section) {
    if (section.active) {
      section.expand = !section.expand;
    } else {
      this.sections.forEach((e: any) => {
        e.active = false;
        e.expand = false;
      })
      section.active = true;
      section.expand = true;
    }
  }

  convertDate(date: any) {
    return this.util.convertDate(date);
  }


  getAllSections() {
    if (!this.sectionProvider.sections.length) {
      this.util.showLoading('Đang tải dữ liệu');
      this.sectionProvider.getSections()
        .then((data: Array<section>) => {
          if (data.length) {
            this.util.setKey(KEY.SECTIONS, data)
              .then(() => {
                this.sections = this.sectionProvider.sections = data;
                this.util.closeLoading();
              })
              .catch((err) => {
                console.log('err_storage_section', err);
                this.util.closeLoading();
              })
          }
        })
        .catch((err) => {
          this.util.closeLoading().then(() => {
            this.util.showToast('Dữ liệu chưa được cập nhật. Vui lòng kiểm tra kết nối.');
            console.log('err_section_provider', err);
            this.util.getKey(KEY.SECTIONS)
              .then((data: Array<section>) => {
                this.sections = this.sectionProvider.sections = data;
              })
              .catch((err) => {
                this.sections = this.sectionProvider.sections = [];
                console.log('err_get_storage_section', err);
              })
          })
        })
    }
  }


  viewDetail(section: section) {
    this.util.openModal(SectionInfomationPage,section);
  }
}
