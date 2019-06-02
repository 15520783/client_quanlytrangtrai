import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Slides, ModalController, Menu, Events } from 'ionic-angular';
import { farm, pig, house } from '../../common/entity';
import { HighChartProvider } from '../../providers/high-chart/high-chart';
import { FarmsProvider } from '../../providers/farms/farms';
import { FarmInputPage } from '../farm-input/farm-input';
import { EmployeesProvider } from '../../providers/employees/employees';
import { PigGroupsProvider } from '../../providers/pig-groups/pig-groups';
import { Utils } from '../../common/utils';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { VARIABLE } from '../../common/const';


@IonicPage()
@Component({
  selector: 'page-farm-infomation',
  templateUrl: 'farm-infomation.html',
})
export class FarmInfomationPage {

  @ViewChild('slider') slider: Slides;
  @ViewChild('menuEmployee') menuEmployee: Menu;
  @ViewChild('menuPigs') menuPigs: Menu;

  public title = [
    "Thông tin chi tiết",
    "Quy mô trang trại",
    "Quy mô các khu",
    "Cơ cấu đàn nái",
    "Cơ cấu đàn nộc",
    "Cơ cấu đàn heo con"];

  public farm: farm = new farm();
  public summary: {
    male_pig: Array<pig>,
    female_pig: Array<pig>,
    child_pig: Array<pig>,
    total_pig: Array<pig>,
    khu_cach_ly: any,
    khu_noc: any,
    khu_phoi: any,
    khu_mang_thai: any,
    khu_de: any,
    khu_cai_sua: any,
    khu_hau_bi: any,
    co_cau_dan_nai: any,
    co_cau_dan_noc: any,
    co_cau_dan_heo_con: any
  } = {
      male_pig: [],
      female_pig: [],
      child_pig: [],
      total_pig: [],
      khu_cach_ly: {},
      khu_noc: {},
      khu_phoi: {},
      khu_mang_thai: {},
      khu_de: {},
      khu_cai_sua: {},
      khu_hau_bi: {},
      co_cau_dan_nai: {},
      co_cau_dan_noc: {},
      co_cau_dan_heo_con: {}
    }
  slideElements: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public chartProvider: HighChartProvider,
    public farmProvider: FarmsProvider,
    public modalCtrl: ModalController,
    public employeeProvider: EmployeesProvider,
    public groupProvider: PigGroupsProvider,
    public deployData: DeployDataProvider,
    public events: Events,
    public util: Utils
  ) {
    if (this.navParams.data.farm) {
      this.farm = this.navParams.data.farm;
      this.farm['foundingDisplay'] = this.util.convertDate(this.farm.founding);
      this.farm['managerEmployee'] = this.employeeProvider.employees.filter((emp) => {
        return emp.farm.id == this.farm.id ? true : false;
      })[0];

      this.getSummary();


    }
  }

  ngAfterViewInit() {
    if (this.slider)
      this.slider.autoHeight = true;
    console.log('ngAfterViewInit FarmInfomationPage');
  }

  ionViewDidLoad() {
    let data = [
      {
        name: 'Heo nọc',
        y: this.summary.male_pig.length,
        unit: 'con',
        sliced: false,
        selected: false
      }, {
        name: 'Heo nái',
        y: this.summary.female_pig.length,
        unit: 'con',
        sliced: false,
        selected: false
      }, {
        name: 'Heo con',
        y: this.summary.child_pig.length,
        unit: 'con',
        sliced: false,
        selected: false
      },
    ]

    let data1 = [
      {
        name: 'Chờ bán',
        y: this.summary.co_cau_dan_nai.wait_for_sale.length,
        unit: 'con',
        sliced: false,
        selected: false
      },
      //  {
      //   name: 'Hậu bị',
      //   y: 300,
      //   unit: 'con',
      //   sliced: false,
      //   selected: false
      // },
      {
        name: 'Mang thai',
        y: this.summary.co_cau_dan_nai.farrowing.length,
        unit: 'con',
        sliced: false,
        selected: false
      },
      // {
      //   name: 'Lốc',
      //   y: 0,
      //   unit: 'con',
      //   sliced: false,
      //   selected: false
      // },
      {
        name: 'Sẩy thai',
        y: this.summary.co_cau_dan_nai.abort.length,
        unit: 'con',
        sliced: false,
        selected: false
      }, {
        name: 'Đẻ',
        y: this.summary.co_cau_dan_nai.born.length,
        unit: 'con',
        sliced: false,
        selected: false
      }, {
        name: 'Cai sữa',
        y: this.summary.co_cau_dan_nai.weaning.length,
        unit: 'con',
        sliced: false,
        selected: false
      },
    ]

    let data2 = [
      {
        name: 'Hậu bị',
        y: 300,
        unit: 'con',
        sliced: false,
        selected: false
      }, {
        name: 'Khai thác tinh',
        y: 800,
        unit: 'conlol',
        sliced: false,
        selected: false
      }, {
        name: 'Chờ bán',
        y: 0,
        unit: 'con',
        sliced: false,
        selected: false
      }, {
        name: 'Thí tình',
        y: 0,
        unit: 'con',
        sliced: false,
        selected: false
      },
    ]

    let data3 = [
      {
        name: 'Đực',
        y: 2,
        unit: 'con',
        sliced: false,
        selected: false
      }, {
        name: 'Cái',
        y: 500,
        unit: 'con',
        sliced: false,
        selected: false
      }, {
        name: 'Đực thiến',
        y: 510,
        unit: 'con',
        sliced: false,
        selected: false
      },
    ]

    let dataBarChart = {
      khu_cach_ly: this.summary.khu_cach_ly,
      khu_noc: this.summary.khu_noc,
      khu_phoi: this.summary.khu_phoi,
      khu_mang_thai: this.summary.khu_mang_thai,
      khu_de: this.summary.khu_de,
      khu_cai_sua: this.summary.khu_cai_sua,
      khu_hau_bi: this.summary.khu_hau_bi
    }

    this.chartProvider.createPieChart(document.getElementById('chartMain'), data, '', '');
    this.chartProvider.createBarchart(document.getElementById('barChart'), dataBarChart);
    this.chartProvider.createPieChart(document.getElementById('chart1'), data1, 'Cơ cấu đàn nái', '');
    this.chartProvider.createPieChart(document.getElementById('chart2'), data2, 'Cơ cấu đàn nộc', '');
    this.chartProvider.createPieChart(document.getElementById('chart3'), data3, 'Cơ cấu đàn heo con', '');
  }

  editFarm() {
    let callback = (farm: farm) => {
      if (farm) {
        this.farmProvider.updateFarm(farm)
          .then((updatedFarm: farm) => {
            if (updatedFarm) {
              this.farm = updatedFarm;
              this.events.publish('Farms:update_farm', this.farm);
              this.farm['foundingDisplay'] = this.util.convertDate(this.farm.founding);
              this.farm['managerEmployee'] = this.employeeProvider.employees.filter((emp) => {
                return emp.farm.id == this.farm.id ? true : false;
              })[0];
              this.navCtrl.pop();
            }
          })
          .catch((err) => { console.log(err) })
      }
    }

    this.navCtrl.push(FarmInputPage, { farm: this.farm, callback: callback });
  }


  viewEmployee() {
    this.menuEmployee.enable(true);
    this.menuEmployee.open();
    this.events.publish('viewEmployee:open');
  }

  closeViewEmployee() {
    this.menuEmployee.close();
  }

  viewPigGroups() {
    this.menuPigs.enable(true);
    this.menuPigs.open();
    this.events.publish('viewPigs:open');
  }

  closeViewPigGroups() {
    this.menuPigs.close();
  }


  getSummary() {
    let houses = this.deployData.get_object_list_key_of_house();
    this.summary.child_pig = this.deployData.get_child_pig_in_farm(this.farm.id);
    this.summary.male_pig = this.deployData.get_male_pig_of_farm(this.farm.id);
    this.summary.female_pig = this.deployData.get_female_pig_of_farm(this.farm.id);
    this.summary.total_pig = this.deployData.get_all_pig_of_farm(this.farm.id);

    /**
     * Tổng quan khu cách ly
     */
    this.summary.khu_cach_ly.male_pig = this.summary.male_pig.filter((pig) => {
      return houses[pig.houseId].section.typeId == VARIABLE.SECTION_TYPE[1].value ? true : false;
    })
    this.summary.khu_cach_ly.female_pig = this.summary.female_pig.filter((pig) => {
      return houses[pig.houseId].section.typeId == VARIABLE.SECTION_TYPE[1].value ? true : false;
    })
    this.summary.khu_cach_ly.child_pig = this.summary.child_pig.filter((pig) => {
      return houses[pig.houseId].section.typeId == VARIABLE.SECTION_TYPE[1].value ? true : false;
    })

    /**
     * Tổng quan khu nọc
     */
    this.summary.khu_noc.male_pig = this.summary.male_pig.filter((pig) => {
      return houses[pig.houseId].section.typeId == VARIABLE.SECTION_TYPE[2].value ? true : false;
    })
    this.summary.khu_noc.female_pig = this.summary.female_pig.filter((pig) => {
      return houses[pig.houseId].section.typeId == VARIABLE.SECTION_TYPE[2].value ? true : false;
    })
    this.summary.khu_noc.child_pig = this.summary.child_pig.filter((pig) => {
      return houses[pig.houseId].section.typeId == VARIABLE.SECTION_TYPE[2].value ? true : false;
    })

    /**
     * Tổng quan khu phối
     */
    this.summary.khu_phoi.male_pig = this.summary.male_pig.filter((pig) => {
      return houses[pig.houseId].section.typeId == VARIABLE.SECTION_TYPE[3].value ? true : false;
    })
    this.summary.khu_phoi.female_pig = this.summary.female_pig.filter((pig) => {
      return houses[pig.houseId].section.typeId == VARIABLE.SECTION_TYPE[3].value ? true : false;
    })
    this.summary.khu_phoi.child_pig = this.summary.child_pig.filter((pig) => {
      return houses[pig.houseId].section.typeId == VARIABLE.SECTION_TYPE[3].value ? true : false;
    })

    /**
     * Tổng quan khu mang thai
     */
    this.summary.khu_mang_thai.male_pig = this.summary.male_pig.filter((pig) => {
      return houses[pig.houseId].section.typeId == VARIABLE.SECTION_TYPE[4].value ? true : false;
    })
    this.summary.khu_mang_thai.female_pig = this.summary.female_pig.filter((pig) => {
      return houses[pig.houseId].section.typeId == VARIABLE.SECTION_TYPE[4].value ? true : false;
    })
    this.summary.khu_mang_thai.child_pig = this.summary.child_pig.filter((pig) => {
      return houses[pig.houseId].section.typeId == VARIABLE.SECTION_TYPE[4].value ? true : false;
    })

    /**
     * Tổng quan khu đẻ
     */
    this.summary.khu_de.male_pig = this.summary.male_pig.filter((pig) => {
      return houses[pig.houseId].section.typeId == VARIABLE.SECTION_TYPE[5].value ? true : false;
    })
    this.summary.khu_de.female_pig = this.summary.female_pig.filter((pig) => {
      return houses[pig.houseId].section.typeId == VARIABLE.SECTION_TYPE[5].value ? true : false;
    })
    this.summary.khu_de.child_pig = this.summary.child_pig.filter((pig) => {
      return houses[pig.houseId].section.typeId == VARIABLE.SECTION_TYPE[5].value ? true : false;
    })

    /**
     * Tổng quan khu cai sữa
     */
    this.summary.khu_cai_sua.male_pig = this.summary.male_pig.filter((pig) => {
      return houses[pig.houseId].section.typeId == VARIABLE.SECTION_TYPE[6].value ? true : false;
    })
    this.summary.khu_cai_sua.female_pig = this.summary.female_pig.filter((pig) => {
      return houses[pig.houseId].section.typeId == VARIABLE.SECTION_TYPE[6].value ? true : false;
    })
    this.summary.khu_cai_sua.child_pig = this.summary.child_pig.filter((pig) => {
      return houses[pig.houseId].section.typeId == VARIABLE.SECTION_TYPE[6].value ? true : false;
    })

    /**
     * Tổng quan khu hậu bị
     */
    this.summary.khu_hau_bi.male_pig = this.summary.male_pig.filter((pig) => {
      return houses[pig.houseId].section.typeId == VARIABLE.SECTION_TYPE[7].value ? true : false;
    })
    this.summary.khu_hau_bi.female_pig = this.summary.female_pig.filter((pig) => {
      return houses[pig.houseId].section.typeId == VARIABLE.SECTION_TYPE[7].value ? true : false;
    })
    this.summary.khu_hau_bi.child_pig = this.summary.child_pig.filter((pig) => {
      return houses[pig.houseId].section.typeId == VARIABLE.SECTION_TYPE[7].value ? true : false;
    })

    let status = this.deployData.get_object_list_key_of_status();

    /**
     * Cơ cấu đàn nái
     */
    this.summary.co_cau_dan_nai = {
      wait_for_sale: this.summary.female_pig.filter((pig) => {
        return (status[pig.statusId].code).toString() == VARIABLE.STATUS_PIG.WAIT_FOR_SALE ? true : false;
      }),
      wait_for_transfer: this.summary.female_pig.filter((pig) => {
        return (status[pig.statusId].code).toString() == VARIABLE.STATUS_PIG.WAIT_FOR_TRANSFER ? true : false;
      }),
      farrowing: this.summary.female_pig.filter((pig) => {
        return ((status[pig.statusId].code).toString() == VARIABLE.STATUS_PIG.FARROWING &&
          (houses[pig.houseId].section.typeId).toString() == VARIABLE.SECTION_TYPE[4].value) ? true : false;
      }),
      abort: this.summary.female_pig.filter((pig) => {
        return (status[pig.statusId].code).toString() == VARIABLE.STATUS_PIG.ABORTION ? true : false;
      }),
      born: this.summary.female_pig.filter((pig) => {
        return ((status[pig.statusId].code).toString() == VARIABLE.STATUS_PIG.FARROWING &&
          (houses[pig.houseId].section.typeId).toString() == VARIABLE.SECTION_TYPE[5].value) ? true : false;
      }),
      weaning: this.summary.female_pig.filter((pig) => {
        return ((status[pig.statusId].code).toString() == VARIABLE.STATUS_PIG.WEANING) ? true : false;
      })
    }
    console.log(this.summary.co_cau_dan_nai);
  }
}
