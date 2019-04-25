import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ActionSheetController, Slides, Menu, Content, ModalController } from 'ionic-angular';
import { house } from '../../common/entity';
import { HousesProvider } from '../../providers/houses/houses';
import { HighChartProvider } from '../../providers/high-chart/high-chart';
import { EmployeesProvider } from '../../providers/employees/employees';
import { PigGroupsProvider } from '../../providers/pig-groups/pig-groups';
import { HouseInputPage } from '../house-input/house-input';

@IonicPage()
@Component({
  selector: 'page-house-infomation',
  templateUrl: 'house-infomation.html',
})
export class HouseInfomationPage {
  @ViewChild('slider') slider: Slides;
  @ViewChild('menuEmployee') menuEmployee: Menu;
  @ViewChild('menuPigs') menuPigs: Menu;

  public title = ["Thông tin chi tiết","Quy mô khu"];

  public house: house = new house();


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public houseProvider: HousesProvider,
    public chartProvider: HighChartProvider,
    public platform: Platform,
    public actionSheetCtrl: ActionSheetController,
    public employeeProvider: EmployeesProvider,
    public groupProvider: PigGroupsProvider,
    public modalCtrl: ModalController
  ) {

  }
  ngAfterViewInit() {
    if(this.slider)
    this.slider.autoHeight = true;
    console.log('ngAfterViewInit FarmInfomationPage');
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
          cssClass:'cancel-button-actionsheet',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ],
      cssClass:'ion-actionsheet'
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

  editHouse(){
    // let modal = this.modalCtrl.create(HouseInputPage,{house:this.house});
    // return modal.present();
    this.navCtrl.push(HouseInputPage,{house:this.house});
  }
}
