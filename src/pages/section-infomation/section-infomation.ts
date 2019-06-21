import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Slides } from 'ionic-angular';
import { house, pig, section } from '../../common/entity';

import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { EmployeesProvider } from '../../providers/employees/employees';
import { HighChartProvider } from '../../providers/high-chart/high-chart';
import { SectionInputPage } from '../section-input/section-input';
import { SectionsProvider } from '../../providers/sections/sections';
import { UserProvider } from '../../providers/user/user';
import { Utils } from '../../common/utils';

@IonicPage()
@Component({
  selector: 'page-section-infomation',
  templateUrl: 'section-infomation.html',
})
export class SectionInfomationPage {
  @ViewChild('slider') slider: Slides;

  public section: section = new section();
  public summary: any = {};
  public title = ["Thông tin chi tiết", "Quy mô khu"];
  public houses: Array<house> = [];

  public drilldown_heo_noc = [];
  public drilldown_heo_nai = [];
  public drilldown_heo_con = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sectionProvider: SectionsProvider,
    public chartProvider: HighChartProvider,
    public employeeProvider: EmployeesProvider,
    public util: Utils,
    public platform: Platform,
    public userProvider: UserProvider,
    public deployData: DeployDataProvider
  ) {
    if (this.navParams.data.section) {
      this.section = this.navParams.data.section;
    }
    this.summary = this.deployData.get_summary_pig_of_section(this.section.id, this.section.typeId);
    this.houses = this.deployData.get_houses_of_section(this.section.id);

    

    this.houses.forEach((house: house) => {
      house['female_pigs'] = this.summary.female_pig.filter((pig: pig) => {
        return pig.houseId == house.id  ? true : false;
      })
      house['male_pigs'] = this.summary.male_pig.filter((pig: pig) => {
        return pig.houseId == house.id? true : false;
      })
      house['child_pigs'] = this.summary.child_pig.filter((pig: pig) => {
        return pig.houseId == house.id ? true : false;
      })
      this.drilldown_heo_noc.push([house.name,house['female_pigs'].length]);
      this.drilldown_heo_nai.push([house.name,house['male_pigs'].length]);
      this.drilldown_heo_con.push([house.name,house['child_pigs'].length]);
    })


    this.deployData.get_employee_by_id
    this.section['managerEmployee'] = this.deployData.get_employee_by_id(this.section.manager);
    this.section['foundingDisplay'] = this.util.convertDate(this.section.founding);
  }

  ngAfterViewInit() {
    if (this.slider)
      this.slider.autoHeight = true;
  }

  ionViewDidLoad() {
    



    let data = [
      {
        name: 'Đực',
        y: this.summary.female_pig.length,
        unit: 'con',
        sliced: false,
        selected: false,
        drilldown: "Đực"
      }, {
        name: 'Nái',
        y: this.summary.male_pig.length,
        unit: 'con',
        sliced: false,
        selected: false,
        drilldown: "Nái"
      }, {
        name: 'Heo con',
        y: this.summary.child_pig.length,
        unit: 'con',
        sliced: false,
        selected: false,
        drilldown: "Heo con"
      },
    ]


    let drilldown = [
      {
        "name": "Nái",
        "id": "Nái",
        "data": this.drilldown_heo_nai,
        "unit":"con"
      },
      {
        "name": "Đực",
        "id": "Đực",
        "data": this.drilldown_heo_noc,
        "unit":"con"
      },
      {
        "name": "Heo con",
        "id": "Heo con",
        "data": this.drilldown_heo_con,
        "unit":"con"
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


  remove() {
    this.sectionProvider.removeSection(this.section)
      .then((isOk) => {
        if (isOk) {
          this.sectionProvider.removedsection(this.section);
          this.navParams.get('callbackRemove')(this.section);
        }
      })
      .catch(err => {
        return err;
      })
  }
}
