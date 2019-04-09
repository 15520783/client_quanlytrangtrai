import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Slides } from 'ionic-angular';
import { SectionsProvider } from '../../providers/sections/sections';
import { Utils } from '../../common/utils';
import { HighChartProvider } from '../../providers/high-chart/high-chart';
import { section } from '../../common/entity';

@IonicPage()
@Component({
  selector: 'page-section-infomation',
  templateUrl: 'section-infomation.html',
})
export class SectionInfomationPage {
  @ViewChild('slider') slider: Slides;

  public section: section = {
    description: "",
    founding: new Date("2015-04-01T00:00:00.000Z"),
    id: "1",
    manager: "15",
    name: "Khu cách ly",
    type_id: "1",
    department_id:""
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sectionProvider: SectionsProvider,
    public chartProvider: HighChartProvider,
    public util: Utils,
    public platform: Platform
  ) {
    this.section = this.navParams.data;
  }

  ngAfterViewInit() {
    if(this.slider)
    this.slider.autoHeight = true;
    console.log('ngAfterViewInit FarmInfomationPage');
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SectionInfomationPage');
    let data = [
      {
        name: 'Đực',
        y: 400,
        unit: 'con',
        sliced: false,
        selected: false,
        drilldown:"Đực"
      }, {
        name: 'Nái',
        y: 1000,
        unit: 'con',
        sliced: false,
        selected: false,
        drilldown: "Nái"
      }, {
        name: 'Đực thiến',
        y: 200,
        unit: 'con',
        sliced: false,
        selected: false
      },
    ]


    let drilldown = [
      {
        "name": "Nái",
        "id": "Nái",
        "data": [
          [
            "Nhà 1",200
          ],
          [
            "Nhà 2",300
          ],
          [
            "Nhà 3",500
          ]
        ]
      },
      {
        "name": "Đực",
        "id": "Đực",
        "data": [
          [
            "Nhà 1",300
          ],
          [
            "Nhà 2",200
          ],
          [
            "Nhà 3",0
          ]
        ]
      }
    ]
    this.chartProvider.createPieDrilldownChart(document.getElementById('chartSummary'), data, drilldown, 'Quy mô khu', '');
  }

}
