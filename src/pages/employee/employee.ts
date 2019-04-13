import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Menu, Content, ModalController } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { EmployeesProvider } from '../../providers/employees/employees';
import { Utils } from '../../common/utils';
import { employee } from '../../common/entity';
import { KEY } from '../../common/const';
import { FilterProvider } from '../../providers/filter/filter';
import { EmployeeInformationPage } from '../employee-information/employee-information';


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
    public modalCtrl : ModalController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmployeePage');
    this.getAllGroups();
  }


  public getAllGroups() {
    if (!this.employeeProvider.employees.length) {
      this.util.showLoading('Đang tải dữ liệu');
      this.employeeProvider.getAllEmployee()
        .then((data: Array<employee>) => {
          if (data.length) {
            this.util.setKey(KEY.GROUPS, data)
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
          this.util.getKey(KEY.GROUPS)
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
    this.content.scrollToTop().then(()=>{
      this.rows = this.filterItems(this.searchTerm);
      this.page_Total = this.rows.length % 50 === 0 ? parseInt(this.rows.length / 50 + '') : parseInt(this.rows.length / 50 + 1 + '');
      this.page_Idx = 1;
      this.visible_items = this.rows.slice(0, 50);
    });
  }

  public filterItems(searchItem) {
    this.filterProvider.input = this.employeeProvider.employees;
    // this.filterProvider.searchWithInclude.gender = this.genderFilter;/
    // this.filterProvider.searchWithInclude.house_id = this.houseFilter;
    this.filterProvider.searchText = searchItem;
    this.filterProvider.searchWithText = this.filter_default;

    this.filterProvider.searchWithRange = {
      // origin_sum_weight : { min: this.origin_sum_weight.lower, max: this.origin_sum_weight.upper },
      // origin_avg_weight : { min: this.origin_avg_weight.lower, max: this.origin_avg_weight.upper }
    }
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

  viewDeltail(employee){
    const modal = this.modalCtrl.create(
      EmployeeInformationPage, employee, {
        cssClass: 'ion-modal'
      }
    )
    modal.present();
  }
}
