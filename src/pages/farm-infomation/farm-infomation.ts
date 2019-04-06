import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Content } from 'ionic-angular';
import { farm } from '../../common/entity';
import { HighChartProvider } from '../../providers/high-chart/high-chart';
import { FarmsProvider } from '../../providers/farms/farms';

/**
 * Generated class for the FarmInfomationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-farm-infomation',
  templateUrl: 'farm-infomation.html',
})
export class FarmInfomationPage {

  public farm: farm = {
    id: '1',
    name: 'Vĩnh Tân 1',
    address: 'Địa chỉ: Vĩnh Tân - Tân Uyên - Bình Dương',
    founding: new Date(),
    area: 12,
    description: '',
    manager: "1",
    total_pig: 5000,
    type_id: 2
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform,
    public chartProvider: HighChartProvider,
    public farmProvider: FarmsProvider
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FarmInfomationPage');
    let data = [
      {
        name: 'Đực',
        y: 400,
        unit: 'con',
        sliced: false,
        selected: false
      }, {
        name: 'Nái',
        y: 1000,
        unit: 'con',
        sliced: false,
        selected: false
      }, {
        name: 'Đực thiến',
        y: 200,
        unit: 'con',
        sliced: false,
        selected: false
      },
    ]

    let data1 = [
      {
        name:'Chờ bán',
        y:0,
        unit:'con',
        sliced:false,
        selected:false
      },{
        name:'Hậu bị',
        y:300,
        unit:'con',
        sliced:false,
        selected:false
      },{
        name:'Mang thai',
        y:500,
        unit:'con',
        sliced:false,
        selected:false
      },{
        name:'Lốc',
        y:0,
        unit:'con',
        sliced:false,
        selected:false
      },{
        name:'Sẩy thai',
        y:1,
        unit:'con',
        sliced:false,
        selected:false
      },{
        name:'Đẻ',
        y:700,
        unit:'con',
        sliced:false,
        selected:false
      },{
        name:'Cai sữa',
        y:0,
        unit:'con',
        sliced:false,
        selected:false
      },
    ]

    let data2 = [
      {
        name:'Hậu bị',
        y:300,
        unit:'con',
        sliced:false,
        selected:false
      },{
        name:'Khai thác tinh',
        y:800,
        unit:'conlol',
        sliced:false,
        selected:false
      },{
        name:'Chờ bán',
        y:0,
        unit:'con',
        sliced:false,
        selected:false
      },{
        name:'Thí tình',
        y:0,
        unit:'con',
        sliced:false,
        selected:false
      },
    ]

    let data3 = [
      {
        name:'Đực',
        y:2,
        unit:'con',
        sliced:false,
        selected:false
      },{
        name:'Cái',
        y:500,
        unit:'con',
        sliced:false,
        selected:false
      },{
        name:'Đực thiến',
        y:510,
        unit:'con',
        sliced:false,
        selected:false
      },
    ]
    this.chartProvider.createPieChart(document.getElementById(this.farm.id),data,'','');
    this.farmProvider.createBarchart(document.getElementById('barChart'));
    this.chartProvider.createPieChart(document.getElementById('chart1'),data1,'Cơ cấu đàn nái','');
    this.chartProvider.createPieChart(document.getElementById('chart2'),data2,'Cơ cấu đàn nộc','');
    this.chartProvider.createPieChart(document.getElementById('chart3'),data3,'Cơ cấu đàn heo con','');
  }



}