import { Component, ViewChild } from '@angular/core';
import { Events, IonicPage, Nav, NavController, NavParams, Platform } from 'ionic-angular';

import { BirthListPage } from '../birth-list/birth-list';
import { BreedingListPage } from '../breeding-list/breeding-list';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { MatingListPage } from '../mating-list/mating-list';
import { PigListSectionPage } from '../pig-list-section/pig-list-section';
import { SpermListPage } from '../sperm-list/sperm-list';
import { UserProvider } from '../../providers/user/user';
import { Utils } from '../../common/utils';
import { VARIABLE } from '../../common/const';

@IonicPage()
@Component({
  selector: 'page-activities',
  templateUrl: 'activities.html',
})
export class ActivitiesPage {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;

  public section_type: any;
  public pages: any = [];
  public components: any = {};
  public rootParam: any;

  constructor(
    public util: Utils,
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public deployData: DeployDataProvider,
    public events: Events,
    public userProvider: UserProvider
  ) {
    this.init();

    this.components = {
      list_pig_khu_cach_ly: {
        name: 'Danh sách heo tại khu', component: PigListSectionPage, active: false,
        data: {
          sectionType: VARIABLE.SECTION_TYPE[1],
          getPigs(deployData: DeployDataProvider) {
            return deployData.get_pigs_of_sectionType(VARIABLE.SECTION_TYPE[1].id)
          },
          pigs: []
        }
      },
      list_pig_for_sale_khu_cach_ly: {
        name: 'Danh sách heo chờ bán', component: PigListSectionPage, active: false,
        data: {
          sectionType: VARIABLE.SECTION_TYPE[1],
          getPigs(deployData: DeployDataProvider) {
            return deployData.get_pigs_sale_waiting_of_section(VARIABLE.SECTION_TYPE[1].id)
          },
          pigs: [],
          statusFilter: [VARIABLE.STATUS_PIG.WAIT_FOR_SALE]
        }
      },
      list_pig_for_transfer_cach_ly: {
        name: 'Danh sách heo chờ chuyển trại', component: PigListSectionPage, active: false,
        data: {
          sectionType: VARIABLE.SECTION_TYPE[1],
          getPigs(deployData: DeployDataProvider) {
            return deployData.get_pigs_transfer_waiting_of_section(VARIABLE.SECTION_TYPE[1].id)
          },
          pigs: [],
          statusFilter: [VARIABLE.STATUS_PIG.WAIT_FOR_TRANSFER]
        }
      },
      list_pig_breeding_khu_cach_ly: {
        name: 'Danh sách lên giống heo', component: BreedingListPage, active: false,
        data: {
          sectionType: VARIABLE.SECTION_TYPE[1]
        }
      },
      // list_issue_pig_khu_cach_ly: {
      //   name: 'Danh sách ghi nhận vấn đề', component: IssuePigListPage, active: false,
      //   data: {
      //     sectionType: VARIABLE.SECTION_TYPE[1],
      //     getPigs(deployData: DeployDataProvider) {
      //       return deployData.get_pigs_of_sectionType(VARIABLE.SECTION_TYPE[1].id)
      //     },
      //     pigs: [],
      //   }
      // },


      list_pig_khu_noc: {
        name: 'Danh sách heo tại khu', component: PigListSectionPage, active: false,
        data: {
          sectionType: VARIABLE.SECTION_TYPE[2],
          getPigs(deployData: DeployDataProvider) {
            return deployData.get_pigs_of_sectionType(VARIABLE.SECTION_TYPE[2].id)
          },
          pigs: []
        }
      },
      list_sperm_pig_khu_noc: {
        name: 'Danh sách tinh heo', component: SpermListPage, active: false,
        data: {
          sectionType: VARIABLE.SECTION_TYPE[2],
        }
      },
      list_pig_for_sale_khu_noc: {
        name: 'Danh sách heo chờ bán', component: PigListSectionPage, active: false,
        data: {
          sectionType: VARIABLE.SECTION_TYPE[2],
          getPigs(deployData: DeployDataProvider) {
            return deployData.get_pigs_sale_waiting_of_section(VARIABLE.SECTION_TYPE[2].id)
          },
          pigs: [],
          statusFilter: [VARIABLE.STATUS_PIG.WAIT_FOR_SALE]
        }
      },
      list_pig_for_transfer_khu_noc: {
        name: 'Danh sách heo chờ chuyển trại', component: PigListSectionPage, active: false,
        data: {
          sectionType: VARIABLE.SECTION_TYPE[2],
          getPigs(deployData: DeployDataProvider) {
            return deployData.get_pigs_transfer_waiting_of_section(VARIABLE.SECTION_TYPE[2].id)
          },
          pigs: [],
          statusFilter: [VARIABLE.STATUS_PIG.WAIT_FOR_TRANSFER]
        }
      },
      list_pig_khu_phoi: {
        name: 'Danh sách heo tại khu', component: PigListSectionPage, active: false,
        data: {
          sectionType: VARIABLE.SECTION_TYPE[3],
          getPigs(deployData: DeployDataProvider) {
            return deployData.get_pigs_of_sectionType(VARIABLE.SECTION_TYPE[3].id)
          },
          pigs: []
        }
      },
      list_pig_breeding_khu_phoi: {
        name: 'Danh sách lên giống heo', component: BreedingListPage, active: false,
        data: {
          sectionType: VARIABLE.SECTION_TYPE[3]
        }
      },
      list_mating_pig_khu_phoi: {
        name: 'Danh sách heo nái đã phối', component: PigListSectionPage, active: false,
        data: {
          sectionType: VARIABLE.SECTION_TYPE[3],
          getPigs(deployData: DeployDataProvider) {
            return deployData.get_mated_pig_of_section(VARIABLE.SECTION_TYPE[3].id)
          },
          pigs: []
        },
        pigs: []
      },
      list_mating_khu_phoi: {
        name: 'Danh sách giao phối', component: MatingListPage, active: false,
        data: {
          sectionType: VARIABLE.SECTION_TYPE[3],
        }
      },
      list_pig_for_sale_khu_phoi: {
        name: 'Danh sách heo chờ bán', component: PigListSectionPage, active: false,
        data: {
          sectionType: VARIABLE.SECTION_TYPE[3],
          getPigs(deployData: DeployDataProvider) {
            return deployData.get_pigs_sale_waiting_of_section(VARIABLE.SECTION_TYPE[3].id)
          },
          pigs: [],
          statusFilter: [VARIABLE.STATUS_PIG.WAIT_FOR_SALE]
        }
      },
      list_pig_for_transfer_khu_phoi: {
        name: 'Danh sách heo chờ chuyển trại', component: PigListSectionPage, active: false,
        data: {
          sectionType: VARIABLE.SECTION_TYPE[3],
          getPigs(deployData: DeployDataProvider) {
            return deployData.get_pigs_transfer_waiting_of_section(VARIABLE.SECTION_TYPE[3].id)
          },
          pigs: [],
          statusFilter: [VARIABLE.STATUS_PIG.WAIT_FOR_TRANSFER]
        }
      },
      list_pig_khu_mang_thai: {
        name: 'Danh sách heo tại khu', component: PigListSectionPage, active: false,
        data: {
          sectionType: VARIABLE.SECTION_TYPE[4],
          getPigs(deployData: DeployDataProvider) {
            return deployData.get_pigs_of_sectionType(VARIABLE.SECTION_TYPE[4].id)
          },
          pigs: []
        }
      },
      list_farrowing_pig_khu_mang_thai: {
        name: 'Danh sách heo mang thai', component: PigListSectionPage, active: false,
        data: {
          sectionType: VARIABLE.SECTION_TYPE[4],
          getPigs(deployData: DeployDataProvider) {
            return deployData.get_farrowing_pig_of_section(VARIABLE.SECTION_TYPE[4].id)
          },
          pigs: []
        }
      },
      list_abortion_pig_khu_mang_thai: {
        name: 'Danh sách heo sẩy thai', component: PigListSectionPage, active: false,
        data: {
          sectionType: VARIABLE.SECTION_TYPE[4],
          getPigs(deployData: DeployDataProvider) {
            return deployData.get_abortion_pig_of_section(VARIABLE.SECTION_TYPE[4].id)
          },
          pigs: []
        }
      },
      list_mating_khu_mang_thai: {
        name: 'Danh sách giao phối', component: MatingListPage, active: false,
        data: {
          sectionType: VARIABLE.SECTION_TYPE[4],
        }
      },
      list_pig_for_sale_khu_mang_thai: {
        name: 'Danh sách heo chờ bán', component: PigListSectionPage, active: false,
        data: {
          sectionType: VARIABLE.SECTION_TYPE[4],
          getPigs(deployData: DeployDataProvider) {
            return deployData.get_pigs_sale_waiting_of_section(VARIABLE.SECTION_TYPE[4].id)
          },
          pigs: [],
          statusFilter: [VARIABLE.STATUS_PIG.WAIT_FOR_SALE]
        }
      },
      list_pig_for_transfer_khu_mang_thai: {
        name: 'Danh sách heo chờ chuyển trại', component: PigListSectionPage, active: false,
        data: {
          sectionType: VARIABLE.SECTION_TYPE[4],
          getPigs(deployData: DeployDataProvider) {
            return deployData.get_pigs_transfer_waiting_of_section(VARIABLE.SECTION_TYPE[4].id)
          },
          pigs: [],
          statusFilter: [VARIABLE.STATUS_PIG.WAIT_FOR_TRANSFER]
        }
      },
      list_pig_khu_de: {
        name: 'Danh sách heo tại khu', component: PigListSectionPage, active: false,
        data: {
          sectionType: VARIABLE.SECTION_TYPE[5],
          getPigs(deployData: DeployDataProvider) {
            return deployData.get_pigs_of_sectionType(VARIABLE.SECTION_TYPE[5].id)
          },
          pigs: []
        }
      },
      list_mating_khu_de: {
        name: 'Danh sách giao phối', component: MatingListPage, active: false,
        data: {
          sectionType: VARIABLE.SECTION_TYPE[5],
        }
      },
      list_birth_khu_de: {
        name: 'Danh sách đẻ', component: BirthListPage, active: false,
        data: {
          sectionType: VARIABLE.SECTION_TYPE[5],
          pigs: []
        }
      },
      list_weaning_pig_khu_de: {
        name: 'Danh sách heo nái cai sữa', component: PigListSectionPage, active: false,
        data: {
          sectionType: VARIABLE.SECTION_TYPE[5],
          getPigs(deployData: DeployDataProvider) {
            return deployData.get_weaning_pig_of_section(VARIABLE.SECTION_TYPE[5].id)
          },
          pigs: []
        }
      },
      list_growing_child_pig_khu_de: {
        name: 'Danh sách heo con cai sữa', component: PigListSectionPage, active: false,
        data: {
          sectionType: VARIABLE.SECTION_TYPE[5],
          getPigs(deployData: DeployDataProvider) {
            return deployData.get_growing_child_pig_of_section(VARIABLE.SECTION_TYPE[5].id)
          },
          pigs: []
        }
      },
      list_pig_for_sale_khu_de: {
        name: 'Danh sách heo chờ bán', component: PigListSectionPage, active: false,
        data: {
          sectionType: VARIABLE.SECTION_TYPE[5],
          getPigs(deployData: DeployDataProvider) {
            return deployData.get_pigs_sale_waiting_of_section(VARIABLE.SECTION_TYPE[5].id)
          },
          pigs: [],
          statusFilter: [VARIABLE.STATUS_PIG.WAIT_FOR_SALE]
        }
      },
      list_pig_for_transfer_khu_de: {
        name: 'Danh sách heo chờ chuyển trại', component: PigListSectionPage, active: false,
        data: {
          sectionType: VARIABLE.SECTION_TYPE[5],
          getPigs(deployData: DeployDataProvider) {
            return deployData.get_pigs_transfer_waiting_of_section(VARIABLE.SECTION_TYPE[5].id)
          },
          pigs: [],
          statusFilter: [VARIABLE.STATUS_PIG.WAIT_FOR_TRANSFER]
        }
      },
      list_pig_khu_cai_sua: {
        name: 'Danh sách heo tại khu', component: PigListSectionPage, active: false,
        data: {
          sectionType: VARIABLE.SECTION_TYPE[6],
          getPigs(deployData: DeployDataProvider) {
            return deployData.get_pigs_of_sectionType(VARIABLE.SECTION_TYPE[6].id)
          },
          pigs: []
        }
      },
      list_pig_for_sale_khu_cai_sua: {
        name: 'Danh sách heo chờ bán', component: PigListSectionPage, active: false,
        data: {
          sectionType: VARIABLE.SECTION_TYPE[6],
          getPigs(deployData: DeployDataProvider) {
            return deployData.get_pigs_sale_waiting_of_section(VARIABLE.SECTION_TYPE[6].id)
          },
          pigs: [],
          statusFilter: [VARIABLE.STATUS_PIG.WAIT_FOR_SALE]
        }
      },
      list_pig_for_transfer_khu_cai_sua: {
        name: 'Danh sách heo chờ chuyển trại', component: PigListSectionPage, active: false,
        data: {
          sectionType: VARIABLE.SECTION_TYPE[6],
          getPigs(deployData: DeployDataProvider) {
            return deployData.get_pigs_transfer_waiting_of_section(VARIABLE.SECTION_TYPE[6].id)
          },
          pigs: [],
          statusFilter: [VARIABLE.STATUS_PIG.WAIT_FOR_TRANSFER]
        }
      },
      list_pig_khu_hau_bi: {
        name: 'Danh sách heo tại khu', component: PigListSectionPage, active: false,
        data: {
          sectionType: VARIABLE.SECTION_TYPE[7],
          getPigs(deployData: DeployDataProvider) {
            return deployData.get_pigs_of_sectionType(VARIABLE.SECTION_TYPE[7].id)
          },
        }
      },
      list_pig_breeding_khu_hau_bi: {
        name: 'Danh sách lên giống heo', component: BreedingListPage, active: false,
        data: {
          sectionType: VARIABLE.SECTION_TYPE[7]
        }
      },
      list_pig_for_sale_khu_hau_bi: {
        name: 'Danh sách heo chờ bán', component: PigListSectionPage, active: false,
        data: {
          sectionType: VARIABLE.SECTION_TYPE[7],
          getPigs(deployData: DeployDataProvider) {
            return deployData.get_pigs_sale_waiting_of_section(VARIABLE.SECTION_TYPE[7].id)
          },
          pigs: [],
          statusFilter: [VARIABLE.STATUS_PIG.WAIT_FOR_SALE]
        }
      },
      list_pig_for_transfer_khu_hau_bi: {
        name: 'Danh sách heo chờ chuyển trại', component: PigListSectionPage, active: false,
        data: {
          sectionType: VARIABLE.SECTION_TYPE[6],
          getPigs(deployData: DeployDataProvider) {
            return deployData.get_pigs_transfer_waiting_of_section(VARIABLE.SECTION_TYPE[6].id)
          },
          pigs: [],
          statusFilter: [VARIABLE.STATUS_PIG.WAIT_FOR_TRANSFER]
        }
      },
      list_pig_khu_8: {
        name: 'Danh sách heo tại khu', component: PigListSectionPage, active: false,
        data: {
          sectionType: VARIABLE.SECTION_TYPE[8],
          getPigs(deployData: DeployDataProvider) {
            return deployData.get_all_sale_pig();
          },
          pigs: []
        }
      },
      breeding_pig_khu_cach_ly: {
        name: 'Lên giống', component: PigListSectionPage, active: false
      },

      pregnancy_pig_khu_mang_thai: {
        name: 'Danh sách heo mang thai', component: PigListSectionPage, active: false
      },
      chuyen_heo_nen_khu_cai_sua: {
        name: 'Chuyển heo nền', component: PigListSectionPage, active: false
      }
    }

    if (this.userProvider.rolePermission.ROLE_quan_ly_heo_khu_cach_ly != null) {
      this.pages.push({
        title: 'Khu cách ly',
        components: [
          this.components.list_pig_khu_cach_ly,
          this.components.list_pig_for_sale_khu_cach_ly,
          this.components.list_pig_for_transfer_cach_ly,
          userProvider.rolePermission.ROLE_xem_danh_sach_len_giong != null ? this.components.list_pig_breeding_khu_cach_ly : null,
        ],
        icon: 'app-activities', active: true, expand: false
      });
    }

    if (this.userProvider.rolePermission.ROLE_quan_ly_heo_khu_noc != null) {
      this.pages.push({
        title: 'Khu nọc',
        components: [
          this.components.list_pig_khu_noc,
          this.components.list_pig_for_sale_khu_noc,
          this.components.list_pig_for_transfer_khu_noc,
          this.userProvider.rolePermission.ROLE_xem_danh_sach_khai_thac_tinh_heo!=null ? this.components.list_sperm_pig_khu_noc:null
        ],
        icon: 'app-activities', active: false, expand: false
      });
    }

    if (this.userProvider.rolePermission.ROLE_quan_ly_heo_khu_phoi != null) {
      this.pages.push({
        title: 'Khu phối',
        components: [
          this.components.list_pig_khu_phoi,
          userProvider.rolePermission.ROLE_xem_danh_sach_len_giong != null ? this.components.list_pig_breeding_khu_phoi : null,
          this.components.list_mating_pig_khu_phoi,
          userProvider.rolePermission.ROLE_xem_danh_sach_phoi_giong != null ?this.components.list_mating_khu_phoi :null,
          this.components.list_pig_for_sale_khu_phoi,
          this.components.list_pig_for_transfer_khu_phoi
        ],
        icon: 'app-activities', active: false
      });
    }

    if (this.userProvider.rolePermission.ROLE_quan_ly_heo_khu_mang_thai != null) {
      this.pages.push({
        title: 'Khu mang thai',
        components: [
          this.components.list_pig_khu_mang_thai,
          this.components.list_farrowing_pig_khu_mang_thai,
          this.components.list_abortion_pig_khu_mang_thai,
          userProvider.rolePermission.ROLE_xem_danh_sach_phoi_giong != null ? this.components.list_mating_khu_mang_thai : null,
          this.components.list_pig_for_sale_khu_mang_thai,
          this.components.list_pig_for_transfer_khu_mang_thai
        ],
        icon: 'app-activities', active: false
      });
    }

    if (this.userProvider.rolePermission.ROLE_quan_ly_heo_khu_de != null) {
      this.pages.push({
        title: 'Khu đẻ ',
        components: [
          this.components.list_pig_khu_de,
          userProvider.rolePermission.ROLE_xem_danh_sach_phoi_giong != null ? this.components.list_mating_khu_de : null ,
          userProvider.rolePermission.ROLE_xem_danh_sach_ghi_nhan_heo_de != null ? this.components.list_birth_khu_de : null,
          this.components.list_weaning_pig_khu_de,
          this.components.list_growing_child_pig_khu_de,
          this.components.list_pig_for_sale_khu_de,
          this.components.list_pig_for_transfer_khu_de
        ],
        icon: 'app-activities', active: false
      });
    }

    if (this.userProvider.rolePermission.ROLE_quan_ly_heo_khu_cai_sua != null) {
      this.pages.push({
        title: 'Khu cai sữa',
        components: [
          this.components.list_pig_khu_cai_sua,
          this.components.chuyen_heo_nen_khu_cai_sua,
          this.components.list_pig_for_sale_khu_cai_sua,
          this.components.list_pig_for_transfer_khu_cai_sua,
        ],
        icon: 'app-activities', active: false
      });
    }

    if (this.userProvider.rolePermission.ROLE_quan_ly_heo_khu_hau_bi != null) {
      this.pages.push({
        title: 'Khu hậu bị',
        components: [
          this.components.list_pig_khu_hau_bi,
          userProvider.rolePermission.ROLE_xem_danh_sach_len_giong != null ? this.components.list_pig_breeding_khu_hau_bi : null,
          this.components.list_pig_for_sale_khu_hau_bi,
          this.components.list_pig_for_transfer_khu_hau_bi,
        ],
        icon: 'app-activities', active: false
      });
    }

    if (this.userProvider.rolePermission.ROLE_quan_ly_heo_khu_8 != null) {
      this.pages.push({
        title: 'Khu 8',
        components: [
          this.components.list_pig_khu_8
        ],
        icon: 'app-activities', active: false
      });
    }

    if (this.pages && this.pages.length) {
      this.pages[0].active = true;
      this.pages[0].expand = true;
      this.pages[0].components[0].active = true;
      this.rootPage = this.pages[0].components[0].component;
      if (this.pages[0].components[0].data.hasOwnProperty('getPigs')) {
        this.pages[0].components[0].data['pigs'] = this.pages[0].components[0].data.getPigs(this.deployData);
      }
      this.pages[0].components[0].data['farmId'] = this.selectedFarm;
      this.rootParam = this.pages[0].components[0].data;
    }
  }


  ionViewDidLoad() {
    this.init();
  }

  public sectionId: string = '6';
  public farms:Array<any> = [];
  public selectedFarm:string;

  init() {
    this.farms = this.deployData.get_farm_list_for_select();
    this.selectedFarm = this.farms[0].value;
    
    this.sectionId = this.deployData.get_section_list_for_select()[0].value;
    this.events.publish('activities:PigOut');
  }

  openPage(page) {
    if (!page.active) {
      this.pages.forEach((element: any) => {
        element.active = false;
      });
      page.active = true;
    }
  }

  openComponent(componentObj) {
    if (this.platform.is('core')) {
      if (!componentObj.active) {
        Object.keys(this.components).forEach(key => {
          this.components[key].active = false;
        })
      }
      componentObj.active = true;
      if (componentObj.data.hasOwnProperty('getPigs')) {
        componentObj.data['pigs'] = componentObj.data.getPigs(this.deployData);
      }
      componentObj.data['farmId'] = this.selectedFarm;

      this.nav.setRoot(componentObj.component, componentObj.data)
    }
    else {
      if (componentObj.data.hasOwnProperty('getPigs')) {
        componentObj.data['pigs'] = componentObj.data.getPigs(this.deployData);
      }
      componentObj.data['farmId'] = this.selectedFarm;

      this.navCtrl.push(componentObj.component, componentObj.data)
    }
  }

  changeFarm(farm){
    this.pages.forEach(page => {
      page.active = false;
      page.expand = false;
      page.components.forEach((component)=>{
        component.active = false;
      })
    });
    
    this.selectedFarm = farm.valueId;
    if (this.pages && this.pages.length) {
      this.pages[0].active = true;
      this.pages[0].expand = true;
      this.pages[0].components[0].active = true;
      if (this.pages[0].components[0].data.hasOwnProperty('getPigs')) {
        this.pages[0].components[0].data['pigs'] = this.pages[0].components[0].data.getPigs(this.deployData);
      }
      this.pages[0].components[0].data['farmId'] = this.selectedFarm;
      this.nav.setRoot(this.pages[0].components[0].component, this.pages[0].components[0].data)
    }
  }
} 
