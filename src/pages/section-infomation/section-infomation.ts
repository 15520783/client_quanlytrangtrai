import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Slides } from 'ionic-angular';

import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { EmployeesProvider } from '../../providers/employees/employees';
import { HighChartProvider } from '../../providers/high-chart/high-chart';
import { SectionInputPage } from '../section-input/section-input';
import { SectionsProvider } from '../../providers/sections/sections';
import { UserProvider } from '../../providers/user/user';
import { Utils } from '../../common/utils';
import { section } from '../../common/entity';

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
    public platform: Platform,
    public userProvider:UserProvider,
    public deployData:DeployDataProvider
  ) {
    if(this.navParams.data.section){
      this.section = this.navParams.data.section;
    }
    this.deployData.get_employee_by_id
    this.section['managerEmployee'] = this.deployData.get_employee_by_id(this.section.manager);
    this.section['foundingDisplay'] = this.util.convertDate(this.section.founding);
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


  edit() {
    let callback = (section: section) => {
      if (section) {
        this.sectionProvider.updateSection(section)
          .then((updated_section) => {
            if (updated_section) {
              this.sectionProvider.updatedSection(section);
              this.section = section;
              this.section['managerEmployee'] = this.deployData.get_employee_by_id(this.section.manager);
              this.section['foundingDisplay'] = this.util.convertDate(this.section.founding);
            }
            this.navCtrl.pop();
          })
          .catch(err => {
            return err;
          })
      }
    }
    this.navCtrl.push(SectionInputPage, { section: this.section, callback: callback });
  }


  remove(){
    this.sectionProvider.removeSection(this.section)
    .then((isOk)=>{
      if(isOk){
        this.sectionProvider.removedsection(this.section);
        this.navParams.get('callbackRemove')(this.section);
      }
    })
    .catch(err=>{
      return err;
    })
  }
}
