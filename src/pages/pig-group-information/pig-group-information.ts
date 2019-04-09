import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Slides, Content } from 'ionic-angular';
import { group, pig } from '../../common/entity';
import { Utils } from '../../common/utils';
import { KEY } from '../../common/const';
import { PigViewPage } from '../../tabs/pig-view/pig-view';

@IonicPage()
@Component({
  selector: 'page-pig-group-information',
  templateUrl: 'pig-group-information.html',
})
export class PigGroupInformationPage {
  @ViewChild('content') content: Content;
  @ViewChild('slider') slider: Slides;

  public showSearchbar = false;
  public group: group;
  public pigs: Array<pig> = [];
  public header = ["", "Thông tin chi tiết", "Danh sách theo nhóm", "Thông tin chi tiết"];
  public title = this.header[1];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public util: Utils,
    public modalCtrl: ModalController
  ) {
    this.group = this.navParams.data;
    this.util.getKey(KEY.PIGS).then((data: Array<pig>) => {
      this.pigs = data.filter((value) => {
        return value.round_id === this.group.round_id;
      })
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PigGroupInformationPage');
  }

  slideChange() {
    console.log(this.slider.getActiveIndex());
    if (this.slider.getActiveIndex() === 0) {
      this.slider.slideTo(this.header.length - 2, 0);
    }
    else if (this.slider.getActiveIndex() === 2) {
      this.showSearchbar = true;
    } else {
      this.showSearchbar = false;
    }
    this.content.resize();
    this.title = this.header[this.slider.getActiveIndex()];
  }

  ngAfterViewInit() {
    if (this.slider)
      this.slider.autoHeight = true;
    console.log('ngAfterViewInit FarmInfomationPage');
  }

  viewDeltail(pig) {
    // this.navCtrl.push(PigViewPage,{data:pig});
    const modal = this.modalCtrl.create(
      PigViewPage, pig, {
        cssClass: 'ion-modal'
      }
    )
    modal.present();
  }
}
