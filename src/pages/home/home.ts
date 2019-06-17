import { CONFIG, ERROR_NAME, KEY, MESSAGE, VARIABLE } from '../../common/const';
import { Component, ViewChild } from '@angular/core';
import { Events, LoadingController, Nav, NavController, NavParams, Platform } from 'ionic-angular';
import { employee, permission, pig, user } from '../../common/entity';

import { ActivitiesPage } from '../activities/activities';
import { ActivitiesProvider } from '../../providers/activities/activities';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { DatePlanPage } from '../date-plan/date-plan';
import { EmployeePage } from '../employee/employee';
import { EmployeesProvider } from '../../providers/employees/employees';
import { FarmsPage } from '../farms/farms';
import { FarmsProvider } from '../../providers/farms/farms';
import { HouseInfomationPage } from '../house-infomation/house-infomation';
import { HousesProvider } from '../../providers/houses/houses';
import { InvoicesPage } from '../invoices/invoices';
import { IssuePigListPage } from '../issue-pig-list/issue-pig-list';
import { PartnerProvider } from '../../providers/partner/partner';
import { PartnersPage } from '../partners/partners';
import { PigGroupsProvider } from '../../providers/pig-groups/pig-groups';
import { PigSummaryPage } from '../pig-summary/pig-summary';
import { PigsPage } from '../pigs/pigs';
import { PigsProvider } from '../../providers/pigs/pigs';
import { SectionsPage } from '../sections/sections';
import { SectionsProvider } from '../../providers/sections/sections';
import { SettingsPage } from '../settings/settings';
import { SettingsProvider } from '../../providers/settings/settings';
import { UserProvider } from '../../providers/user/user';
import { Utils } from '../../common/utils';
import { WarehousesPage } from '../warehouses/warehouses';
import { WarehousesProvider } from '../../providers/warehouses/warehouses';
import { house } from '../../common/entity';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  pages: Array<any> = [];
  activeLogOut: boolean = false;
  public user: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public util: Utils,
    public farmProvider: FarmsProvider,
    public sectionProvider: SectionsProvider,
    public activitiesProvider: ActivitiesProvider,
    public pigProvider: PigsProvider,
    public pigGroupProvider: PigGroupsProvider,
    public employeeProvider: EmployeesProvider,
    public houseProvider: HousesProvider,
    public warehouseProvider: WarehousesProvider,
    public settingProvider: SettingsProvider,
    public userProvider: UserProvider,
    public partnerProvider: PartnerProvider,
    public events: Events,
    public platform: Platform,
    public scanner: BarcodeScanner
  ) {
    this.util.getKey(KEY.EMPLOYEE_USER).then((user) => {
      if (user) {
        this.user.name = user.name;
      }
    })
    this.util.getKey(KEY.USERNAME).then((username) => {
      this.user['username'] = username;
    })

    this.userProvider.rolePermission.ROLE_xem_danh_sach_trang_trai != null ?
      this.pages.push({
        title: 'Trang trại', component: FarmsPage, icon: 'app-farm', active: false
      }) : null;

    this.userProvider.rolePermission.ROLE_xem_danh_sach_khu != null ?
      this.pages.push({
        title: 'Khu', component: SectionsPage, icon: 'app-sections', active: false
      }) : null;

    this.userProvider.rolePermission.ROLE_xem_danh_sach_heo != null ?
      this.pages.push({
        title: 'Heo', component: PigsPage, icon: 'app-pig-outline', active: false,
      }) : null;

    this.userProvider.rolePermission.ROLE_xem_danh_sach_nhan_vien != null ?
      this.pages.push({
        title: 'Nhân viên', component: EmployeePage, icon: 'app-employees', active: false
      }) : null;

    this.userProvider.rolePermission.ROLE_xem_danh_sach_kho != null ?
      this.pages.push({
        title: 'Kho', component: WarehousesPage, icon: 'app-warehouse', active: false
      }) : null;

    this.userProvider.rolePermission.ROLE_xem_danh_sach_chung_tu != null ?
      this.pages.push({
        title: 'Chứng từ', component: InvoicesPage, icon: 'app-file', active: false,
      }) : null;

    this.pages.push({
      title: 'Quản lý lâm sàn', component: IssuePigListPage, icon: 'app-medicine-manager', active: false,
    })

    this.pages.push({
      title: 'Hoạt động', component: ActivitiesPage, icon: 'app-activities', active: false,
    })

    this.userProvider.rolePermission.ROLE_xem_danh_sach_thiet_lap != null ?
      this.pages.push({
        title: 'Thiết lập', component: SettingsPage, icon: 'app-settings', active: false,
      }) : null;

    this.userProvider.rolePermission.ROLE_xem_bang_ke_hoach != null ?
      this.pages.push({
        title: 'Bảng kế hoạch', component: DatePlanPage, icon: 'app-schedule', active: false, isSchedule: true,
      }) : null;

    this.events.subscribe('sync', (something) => {
      this.sync();
    })

    if (this.platform.is('android') || this.platform.is('ios')) {
      this.events.subscribe('scan', (something) => {
        this.scan();
      })
    }

    this.events.subscribe('home:reloadSchedule', () => {
      this.nav.setRoot(DatePlanPage);
    })
  }

  ionViewDidLoad() {
    this.rootPage = this.pages[0].component;
    this.pages[0].active = true;
    setTimeout(() => {
      this.activeLogOut = true;
    }, 3000);
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (!page.active) {
      this.pages.forEach((element: any) => {
        element.active = false;
      });
      page.active = true;
      this.nav.setRoot(page.component);
    }
  }

  logOut() {
    this.util.clearAllKeyStorage()
      .then((isOK) => {
        console.log(isOK);
        this.events.publish('app_logout');
      })
      .catch((err: any) => {
        console.log(err);
      })
  }

  test() {
    this.util.clearAllKeyStorage();
  }


  sync() {
    this.farmProvider.updated_flag =
      this.pigProvider.updated_flag =
      this.employeeProvider.updated_flag =
      this.sectionProvider.updated_flag =
      this.houseProvider.updated_flag =
      this.warehouseProvider.updated_flag =
      this.settingProvider.updated_flag = false;
    this.intinial_sync();
  }

  intinial_sync() {
    this.util.openBackDrop();
    this.subscribeEventUpdate();
    this.userProvider.checkServer()
      .then((res: any) => {
        if (res.success) {
          this.getRolePermission().then(() => {
            // this.userProvider.sync();
            this.farmProvider.sync();
            this.pigProvider.sync();
            this.employeeProvider.sync();
            this.sectionProvider.sync();
            this.houseProvider.sync();
            this.warehouseProvider.sync();
            this.settingProvider.sync();
            this.sectionProvider.sync();
          })
        }
      })
      .catch((err: any) => {
        this.util.closeBackDrop();
        if (err.status != 401) {
          if (err.name == ERROR_NAME.TIMEMOUT_ERROR || err.name == ERROR_NAME.ERROR_RESPONSE) {
            this.util.showToast(MESSAGE[CONFIG.LANGUAGE_DEFAULT].TIMEOUT_REQUEST);
            this.events.unsubscribe('updated');
          }
        }
      })
  }

  checkUpdate() {
    if (
      // this.userProvider.updated_flag &&
      this.farmProvider.updated_flag &&
      this.pigProvider.updated_flag &&
      this.employeeProvider.updated_flag &&
      this.sectionProvider.updated_flag &&
      this.houseProvider.updated_flag &&
      this.warehouseProvider.updated_flag &&
      this.settingProvider.updated_flag ) {
      this.events.unsubscribe('updated');
      this.util.closeBackDrop();
    }
  }

  subscribeEventUpdate() {
    this.events.subscribe('updated', () => {
      this.checkUpdate();
    })
  }

  scan() {
    if (this.platform.is('android') || this.platform.is('ios')) {
      this.scanner.scan()
        .then((result: any) => {
          if (result.text) {
            this.util.openBackDrop();
            let target = JSON.parse(result.text);
            if (target.type == VARIABLE.OBJECT_BARCODE_TYPE.PIG) {
              this.util.getKey(KEY.PIGS).then((pigs: Array<pig>) => {
                let idx = pigs.findIndex(pig => pig.pigCode == target.id);
                if (idx > -1) {
                  this.navCtrl.push(PigSummaryPage, { pig: pigs[idx] }).then(() => {
                    this.util.closeBackDrop();
                  });
                } else {
                  this.util.showToastInform('Không tìm thấy đối tượng');
                }
              })
            } else if (target.type == VARIABLE.OBJECT_BARCODE_TYPE.HOUSE) {
              this.util.getKey(KEY.HOUSES).then((houses: Array<house>) => {
                let idx = houses.findIndex(house => house.id == target.id);
                if (idx > -1) {
                  this.navCtrl.push(HouseInfomationPage, { house: houses[idx] }).then(() => {
                    this.util.closeBackDrop();
                  });
                } else {
                  this.util.showToastInform('Không tìm thấy đối tượng');
                }
              })
            } else {
              this.util.showToastInform('Không tìm thấy đối tượng');
            }
          } else {
            this.util.showToastInform('Không tìm thấy đối tượng');
          }
        })
        .catch((err: Error) => {
          console.log(err);
          this.util.closeBackDrop();
          this.util.showToastInform('Không tìm thấy đối tượng');
        })
    }
  }

  /**
   * Cập nhật lại danh sách quyền
   */
  getRolePermission() {
    return this.util.getKey(KEY.USER)
      .then((userAccount: user) => {
        if (userAccount) {
          if (userAccount.employee.farm.id == '0') {
            this.userProvider.getPermissionOfUserMaster()
              .then((permissions: Array<permission>) => {
                if (permissions) {
                  let data: any = {};
                  permissions.forEach((permission: permission) => {
                    if (permission) {
                      data[permission.code] = permission;
                    }
                  })
                  this.util.setKey(KEY.PERMISSIONS, data).then(() => {
                    this.userProvider.rolePermission = data;
                  });
                }
                return permissions;
              })
              .catch((err) => {
                this.util.showToast('Lỗi phân quyền người dùng');
                this.logOut();
              })
          } else {
            this.settingProvider.getPermissionOfRole(userAccount.role.id)
              .then((permissions: Array<permission>) => {
                if (permissions) {
                  let data: any = {};
                  permissions.forEach((permission: permission) => {
                    if (permission) {
                      data[permission.code] = permission;
                    }
                  })
                  this.util.setKey(KEY.PERMISSIONS, data).then(() => {
                    this.userProvider.rolePermission = data;
                  });
                  // this.util.setKey(KEY.PERMISSIONS,)
                }
                return permissions;
              })
              .catch((err) => {
                this.util.showToast('Lỗi phân quyền người dùng');
                this.logOut();
              })
          }
        } else {
          this.logOut();
        }
      })
      .catch(err => { console.log(err) });
  }

  settingRole(permissions) {
    if (permissions) {
      let data: any = {};
      permissions.forEach((permission: permission) => {
        if (permission) {
          data[permission.code] = permission;
        }
      })
      this.util.setKey(KEY.PERMISSIONS, data).then(() => {
        this.userProvider.rolePermission = data;
      });
      console.log(data);
      // this.util.setKey(KEY.PERMISSIONS,)
    }
  }
}
