import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Slides, Content } from 'ionic-angular';
import { group, pig } from '../../common/entity';
import { Utils } from '../../common/utils';
import { KEY } from '../../common/const';
import { PigViewPage } from '../../tabs/pig-view/pig-view';
import { PigGroupInputPage } from '../pig-group-input/pig-group-input';

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
  public header = ["Thông tin chi tiết", "Danh sách theo nhóm"];
  public title = this.header[0];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public util: Utils,
    public modalCtrl: ModalController
  ) {
    this.group = this.navParams.data;

    this.util.showLoading('Đang lấy danh sách heo thuộc nhóm');
    this.util.getKey(KEY.PIGS).then((data: Array<pig>) => {
      this.pigs = data.filter((value) => {
        return value.round_id == this.group.round.id;
      })
    }).then(() => { this.util.closeLoading(); })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PigGroupInformationPage');
  }


  slideChange() {
    this.content.resize();
  }

  ngAfterViewInit() {
    if (this.slider) {
      this.slider.autoHeight = true;
    }
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

  editGroup() {
    this.navCtrl.push(PigGroupInputPage, { group: this.group });
  }
}
