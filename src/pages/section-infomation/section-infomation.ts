import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Slides } from 'ionic-angular';
import { SectionsProvider } from '../../providers/sections/sections';
import { Utils } from '../../common/utils';
import { HighChartProvider } from '../../providers/high-chart/high-chart';
import { section } from '../../common/entity';
import { EmployeesProvider } from '../../providers/employees/employees';

@IonicPage()
@Component({
  selector: 'page-section-infomation',
  templateUrl: 'section-infomation.html',
})
export class SectionInfomationPage {
  @ViewChild('slider') slider: Slides;

  public section: section = new section();

  public title = ["Thông tin chi tiết", "Cơ cấu đàn nái"];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sectionProvider: SectionsProvider,
    public chartProvider: HighChartProvider,
    public employeeProvider: EmployeesProvider,
    public util: Utils,
    public platform: Platform
  ) {
    this.section = this.navParams.data;
    this.section['managerEmployee']=this.employeeProvider.employees.filter((emp)=>{
      return emp.id == this.section.manager? true:false;
    })[0];
    this.section.founding = this.util.convertDate(this.section.founding);
  }

  ngAfterViewInit() {
    if (this.slider)
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
        drilldown: "Đực"
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
            "Nhà 1", 200
          ],
          [
            "Nhà 2", 300
          ],
          [
            "Nhà 3", 500
          ]
        ]
      },
      {
        "name": "Đực",
        "id": "Đực",
        "data": [
          [
            "Nhà 1", 300
          ],
          [
            "Nhà 2", 200
          ],
          [
            "Nhà 3", 0
          ]
        ]
      }
    ]
    this.chartProvider.createPieDrilldownChart(document.getElementById('chartSummary'), data, drilldown, 'Quy mô khu', '');
  }

}
