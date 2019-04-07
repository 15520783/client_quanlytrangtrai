import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ActionSheetController } from 'ionic-angular';
import { house } from '../../common/entity';
import { HousesProvider } from '../../providers/houses/houses';
import { HighChartProvider } from '../../providers/high-chart/high-chart';

/**
 * Generated class for the HouseInfomationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-house-infomation',
  templateUrl: 'house-infomation.html',
})
export class HouseInfomationPage {

  public house: house = {
    description: "",
    founding: "2015-04-01T00:00:00.000Z",
    house_code: "01",
    id: "1",
    manager: "16",
    name: "Nhà 01",
    position: null,
    section_id: "1",
    type_id: "1",
  }


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public houseProvider: HousesProvider,
    public chartProvider: HighChartProvider,
    public platform: Platform,
    public actionSheetCtrl: ActionSheetController
  ) {

  }


  ionViewDidLoad() {
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

}
