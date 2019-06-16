import { Component, ViewChild } from '@angular/core';
import { Content, Events, IonicPage, Menu, ModalController, NavController, NavParams, Platform } from 'ionic-angular';

import { EmployeeInformationPage } from '../employee-information/employee-information';
import { EmployeeInputPage } from '../employee-input/employee-input';
import { EmployeesProvider } from '../../providers/employees/employees';
import { FilterProvider } from '../../providers/filter/filter';
import { FormControl } from '@angular/forms';
import { KEY } from '../../common/const';
import { UserProvider } from '../../providers/user/user';
import { Utils } from '../../common/utils';
import { employee } from '../../common/entity';

@IonicPage()
@Component({
  selector: 'page-employee',
  templateUrl: 'employee.html',
})
export class EmployeePage {
  @ViewChild('menuFilter') menuFilter: Menu;
  @ViewChild('content') content: Content;

  public page_Idx: number = 1;
  public page_Total: number = 0;
  public rows: Array<employee> = [];
  public cols: any = [];
  public filter_default: any = ["name", "address", "email", "birthday"];
  protected visible_items: Array<employee> = [];

  protected searchControl: FormControl = new FormControl();
  protected searchTerm: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public employeeProvider: EmployeesProvider,
    public platform: Platform,
    public util: Utils,
    public filterProvider: FilterProvider,
    public modalCtrl: ModalController,
    public events: Events,
    public userProvider: UserProvider
  ) {
  }

  ionViewDidLoad() {
    this.getAllEmployee();
  }

  public getAllEmployee() {
    if (!this.employeeProvider.employees.length) {
      this.util.showLoading('Đang tải dữ liệu');
      this.employeeProvider.getAllEmployee()
        .then((data: Array<employee>) => {
          if (data.length) {
            this.util.setKey(KEY.EMPLOYEES, data)
              .then(() => {
                this.employeeProvider.employees = data;
                this.util.closeLoading().then(() => {
                  this.setFilteredItems();
                });
              })
              .catch((err) => {
                this.employeeProvider.employees = data;
                console.log('err_storage_employee', err);
                this.util.closeLoading().then(() => {
                  this.setFilteredItems();
                });
              })
          }
        })
        .catch((err) => {
          console.log('err_employee_provider', err);
          this.util.getKey(KEY.EMPLOYEES)
            .then((data: Array<employee>) => {
              this.employeeProvider.employees = data;
              this.util.closeLoading().then(() => {
                this.setFilteredItems();
              });
            })
            .catch((err) => {
              console.log('err_get_storage_employee', err);
              this.employeeProvider.employees = [];
            })
          this.util.showToast('Dữ liệu chưa được cập nhật. Vui lòng kiểm tra kết nối.');
        })
    } else {
      this.setFilteredItems();
    }
  }

  public setFilteredItems() {
    this.content.scrollToTop().then(() => {
      this.rows = this.filterItems(this.searchTerm);
      this.page_Total = this.rows.length % 50 === 0 ? parseInt(this.rows.length / 50 + '') : parseInt(this.rows.length / 50 + 1 + '');
      this.page_Idx = 1;
      this.visible_items = this.rows.slice(0, 50);
    });
  }

  public filterItems(searchItem) {
    let employees = this.util.deepClone(this.employeeProvider.employees)
    this.filterProvider.input = employees;
    this.filterProvider.searchText = searchItem;
    this.filterProvider.searchWithText = this.filter_default;
    this.filterProvider.searchWithRange = {}
    return this.filterProvider.filter();
  }

  loadData(infiniteScroll) {
    setTimeout(() => {
      let start = 50 * this.page_Idx + 1;
      let end = start + 50;
      this.page_Idx++;

      this.visible_items.push.apply(this.visible_items, this.rows.slice(start, end));
      infiniteScroll.complete();
    }, 800);
  }

  viewDeltail(employee) {
    if (this.userProvider.rolePermission.ROLE_xem_thong_tin_nhan_vien != null) {
      let callbacklUpdate = data => {
        if (data) {
          employee = data;
        }
      }

      let callbackRemove = data => {
        if (data) {
          let idx = this.visible_items.findIndex(_employee => _employee.id == data.id);
          if (idx > -1) {
            this.visible_items.splice(idx, 1);
          }
        }
      }
      this.navCtrl.push(EmployeeInformationPage,
        {
          employee: employee,
          callbacklUpdate: callbacklUpdate,
          callbackRemove: callbackRemove
        });
    }
  }

  addNewEmployee() {
    let callback = (employee: employee) => {
      if (employee) {
        this.employeeProvider.createNewEmployee(employee)
          .then((new_employee: employee) => {
            if (new_employee) {
              this.employeeProvider.updatedEmployee(new_employee);
              this.setFilteredItems()
              this.navCtrl.pop();
            }
          })
          .catch((err) => {
            console.log(err);
          })
      }
    }

    this.navCtrl.push(EmployeeInputPage, { callback: callback });
  }

  sync() {
    this.events.publish('sync', true);
  }


}
