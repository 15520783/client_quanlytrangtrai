import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

import { CONFIG } from '../../common/const';
import { EmployeesProvider } from '../../providers/employees/employees';
import { FilterProvider } from '../../providers/filter/filter';
import { FormControl } from '@angular/forms';
import { Utils } from '../../common/utils';
import { user } from '../../common/entity';

@IonicPage()
@Component({
  selector: 'page-user-account-list',
  templateUrl: 'user-account-list.html',
})
export class UserAccountListPage {
  public isSelectMode: boolean = false;

  @Input() public employeeId: string;
  @Input() public users: Array<user> = [];
  @Input() set setUsers(users: Array<user>) {
    this.users = users;
    this.setFilteredItems();
  }

  public mainAttribute = "username";
  public attributes = [
    { name: "email", label: 'Email' },
    { name: "activate", label: 'Trạng thái kích hoạt' },
    { name: "lastActivate", label: 'Last active' },
    { name: "login", label: 'Login' },
    { name: "roleName", label: 'Phân quyền' },
  ];

  public placeholderSearch: string = 'Tìm kiếm tài khoản'
  public filter_default: Array<string> = ["username", "email", "roleName"];

  public page_Idx: number = 1;
  public page_Total: number = 0;
  public rows: Array<any> = [];

  protected searchControl: FormControl = new FormControl();
  protected searchTerm: string = '';

  public visible_items: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public filterProvider: FilterProvider,
    public employeeProvider: EmployeesProvider,
    public util: Utils,
    public platform:Platform
  ) {
    if (this.navParams.data.selectMode) {
      this.isSelectMode = true;
    }

    if (this.navParams.data.employeeId) {
      this.employeeId = this.navParams.data.employeeId;
    }

    if (this.navParams.data.users) {
      this.users = this.navParams.data.users;
      this.setFilteredItems();
    }
  }

  public setFilteredItems() {
    setTimeout(() => {
      this.rows = this.filterItems(this.searchTerm);
      this.page_Total = this.rows.length % CONFIG.PAGE_SITE === 0 ? parseInt(this.rows.length / CONFIG.PAGE_SITE + '') : parseInt(this.rows.length / CONFIG.PAGE_SITE + 1 + '');
      this.page_Idx = 1;
      this.visible_items = this.rows.slice(0, CONFIG.PAGE_SITE);
      if (document.getElementById('content'))
        document.getElementById('content').scrollTop = 0;
    }, 200);
  }


  public filterItems(searchItem) {
    this.users.forEach((user) => {
      user['roleName'] = user.role.name;
    })
    this.filterProvider.input = this.users;
    this.filterProvider.searchText = searchItem;
    this.filterProvider.searchWithText = this.filter_default;
    this.filterProvider.searchWithRange = {}
    return this.filterProvider.filter().sort((a: user, b: user) =>
      (new Date(a.createdAt) > new Date(b.createdAt)) ? -1 : 1
    );
  }

  loadData(infiniteScroll) {
    setTimeout(() => {
      let start = CONFIG.PAGE_SITE * this.page_Idx + 1;
      let end = start + CONFIG.PAGE_SITE;
      this.page_Idx++;

      this.visible_items.push.apply(this.visible_items, this.rows.slice(start, end));
      infiniteScroll.complete();
    }, CONFIG.LOADING_MORE_TIME);
  }

}
