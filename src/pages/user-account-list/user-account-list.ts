import { AlertController, IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Component, Input } from '@angular/core';

import { CONFIG } from '../../common/const';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { EmployeesProvider } from '../../providers/employees/employees';
import { FilterProvider } from '../../providers/filter/filter';
import { FormControl } from '@angular/forms';
import { SettingInputUtilComponent } from '../../components/setting-input-util/setting-input-util';
import { UserInputPage } from '../user-input/user-input';
import { UserProvider } from '../../providers/user/user';
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
    public userProvider: UserProvider,
    public deployData: DeployDataProvider,
    public util: Utils,
    public platform: Platform,
    public alertCtrl: AlertController
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

  add() {
    let callback = (user: user) => {
      if (user) {
        let alert = this.alertCtrl.create({
          title: '',
          message: 'Nhập lại mật khẩu để xác nhận',
          inputs: [
            {
              name: 'password',
              placeholder: 'Nhập lại mật khẩu',
              type: 'password'
            }
          ],
          buttons: [
            {
              text: 'Xác nhận',
              handler: data => {
                if (data.password == user.password) {
                  this.userProvider.createUser(user)
                    .then((new_user: user) => {
                      if (new_user) {
                        this.users.push(new_user);
                        this.setFilteredItems();
                      }
                      this.navCtrl.pop();
                    })
                    .catch((err) => {
                      console.log(err);
                    })
                }
                else {
                  this.util.showToast('Mật khẩu xác nhận không khớp. Vui lòng kiểm tra lại');
                }
              }
            },
            {
              text: 'Hủy',
              role: 'cancel',
              handler: data => {
                console.log('Cancel clicked');
              }
            }
          ]
        })
        alert.present();
      }
    }
    this.navCtrl.push(UserInputPage,
      {
        employeeId: this.employeeId,
        insertMode: true,
        callback: callback
      }
    )
  }

  edit(user) {
    let callback = (user: user) => {
      if (user) {
        this.userProvider.updateUser(user)
          .then((updated_user: user) => {
            if (updated_user) {
              user = updated_user;
              user['roleName'] = user.role.name;
              let idx = this.users.findIndex(_user => _user.id == user.id);
              if (idx > -1) {
                this.users[idx] = updated_user;
              }
            }
            this.navCtrl.pop();
          })
          .catch(err => {
            console.log(err);
          })
      }
    }

    this.navCtrl.push(UserInputPage,
      {
        user: user,
        updateMode: true,
        callback: callback
      }
    )
  }


  changePassword(user) {
    let alert = this.alertCtrl.create({
      title: '',
      message: 'Nhập lại mật khẩu để xác nhận',
      inputs: [
        {
          name: 'password',
          placeholder: 'Nhập mật khẩu mới',
          type: 'password'
        },
        {
          name: 'repeatPassword',
          placeholder: 'Nhập lại mật khẩu',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Xác nhận',
          handler: data => {
            if (!data.password || !data.repeatPassword) {
              this.util.showToast('Mật khẩu không thể để trống');
            } else {
              if (data.password.length > 1000 || data.repeatPassword.length > 1000) {
                this.util.showToast('Mật khẩu không thể vượt quá 1000 ký tự');
              } else {
                if (data.password == data.repeatPassword) {
                  user.password = data.password;
                  this.userProvider.updateUser(user)
                    .then((updated_user: user) => {
                      console.log(updated_user);
                    })
                    .catch((err) => {
                      console.log(err);
                    })
                }
                else {
                  this.util.showToast('Mật khẩu xác nhận không khớp.');
                }
              }
            }
          }
        },
        {
          text: 'Hủy',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        }
      ]
    })
    alert.present();
  }


  remove(user){
    this.userProvider.removeUser(user)
    .then((isOK)=>{
      if(isOK){
        let idx = this.users.findIndex(_user=>_user.id == user.id);
        if(idx > -1){
          this.users.splice(idx,1);
        }
        this.setFilteredItems();
      }
    })
    .catch((err)=>{
      console.log(err);
    })
  }
}