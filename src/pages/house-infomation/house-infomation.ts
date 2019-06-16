import { ActionSheetController, Content, IonicPage, Menu, ModalController, NavController, NavParams, Platform, Slides } from 'ionic-angular';
import { Component, Renderer, ViewChild } from '@angular/core';
import { house, pig } from '../../common/entity';

import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { EmployeesProvider } from '../../providers/employees/employees';
import { HighChartProvider } from '../../providers/high-chart/high-chart';
import { HouseInputPage } from '../house-input/house-input';
import { HousesProvider } from '../../providers/houses/houses';
import { UserProvider } from '../../providers/user/user';
import { Utils } from '../../common/utils';

@IonicPage()
@Component({
  selector: 'page-house-infomation',
  templateUrl: 'house-infomation.html',
})
export class HouseInfomationPage {
  @ViewChild('slider') slider: Slides;
  @ViewChild('menuEmployee') menuEmployee: Menu;
  @ViewChild('menuPigs') menuPigs: Menu;

  public title = ["Thông tin chi tiết", "Quy mô khu"];

  public house: house = new house();
  public pigs: Array<pig> = [];
  public tab = "0";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public houseProvider: HousesProvider,
    public chartProvider: HighChartProvider,
    public platform: Platform,
    public actionSheetCtrl: ActionSheetController,
    public employeeProvider: EmployeesProvider,
    public modalCtrl: ModalController,
    public deployData: DeployDataProvider,
    public util: Utils,
    public renderer: Renderer,
    public userProvider:UserProvider
  ) {
    if (this.navParams.data.house) {
      this.house = this.navParams.data.house;
      this.pigs = this.deployData.get_pigs_of_house(this.navParams.data.house.id);
      // this.house.founding = this.util.convertDate(this.house.founding);
    }
  }

  ngAfterViewInit() {
    if (this.slider)
      this.slider.autoHeight = true;

    let element = document.getElementsByClassName('scroll-content');
    this.renderer.setElementStyle(element[0], 'overflow', 'hidden');
  }

  slideChange() {
    this.tab = this.slider.realIndex.toString();
  }

  selectedTab(index) {
    this.slider.slideTo(index);
  }

  ionViewDidLoad() {

    setTimeout(() => {
    }, 500);
    console.log('ionViewDidLoad HouseInfomationPage');
    let data = [
      {
        name: 'Đực',
        y: 400,
        unit: 'con',
        sliced: false,
        selected: false,
      }, {
        name: 'Nái',
        y: 1000,
        unit: 'con',
        sliced: false,
        selected: false,
      }, {
        name: 'Đực thiến',
        y: 200,
        unit: 'con',
        sliced: false,
        selected: false
      },
    ]
    this.chartProvider.createPieChart(document.getElementById('chartSummary'), data, 'Quy mô khu', '');
  }


  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create(<any>{
      title: 'Danh sách chức năng',
      buttons: [
        {
          text: 'Nhập heo',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        }, {
          text: 'Lên giống heo nái',
          handler: () => {
            console.log('Archive clicked');
          }
        }, {
          text: 'Lên giống heo nái',
          handler: () => {
            console.log('Archive clicked');
          }
        }, {
          text: 'Đóng',
          role: 'cancel',
          cssClass: 'cancel-button-actionsheet',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ],
      cssClass: 'ion-actionsheet'
    });
    actionSheet.present();
  }


  viewEmployee() {
    this.menuEmployee.enable(true);
    this.menuEmployee.open();
  }

  closeViewEmployee() {
    this.menuEmployee.close();
  }

  viewPigs() {
    this.menuPigs.enable(true);
    this.menuPigs.open();
  }

  closeViewPigs() {
    this.menuPigs.close();
  }

  editHouse() {
    let callback = (house: house) => {
      if (house) {
        this.houseProvider.updateHouse(house)
          .then((house: house) => {
            if (house) {
              this.houseProvider.updatedHouse(house);
              this.navParams.data.callbackUpdate(this.house);
              this.house = house;
              this.navCtrl.pop();
            }
          })
          .catch((err) => { console.log(err) })
      }
    }
    this.navCtrl.push(HouseInputPage, { house: this.house, callback: callback });
  }


  removeHouse(){
    this.houseProvider.removeHouse(this.house)
    .then((isOK)=>{
      if(isOK){
        this.houseProvider.removedHouse(this.house);
        this.navParams.get('callbackRemove')(this.house);
      }
    })
  }
}
