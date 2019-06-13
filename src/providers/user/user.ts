import { API, CONFIG, KEY } from '../../common/const';
import { Events, Platform } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { employee, user } from '../../common/entity';

import { Injectable } from '@angular/core';
import { Utils } from '../../common/utils';

@Injectable()
export class UserProvider {


  public user: employee;
  public updated_flag = false;
  public rolePermission: any;

  constructor(
    public http: HttpClient,
    public util: Utils,
    public event: Events,
    public platform: Platform
  ) {
    console.log('Hello UserProvider Provider');
  }

  login(param) {
    let body = {
      username: param.username,
      password: param.password
    }
    return this.http
      .post(API.LOGIN, body)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  checkServer() {
    return this.http
      .get(API.CHECK_SERVER)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  getEmployeeInfo(empId: string) {
    return this.http
      .get(API.GET_INFO_EMPLOYEE.concat(empId))
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  sync() {
    this.util.getKey(KEY.EMPID).then((empId) => {
      this.getEmployeeInfo(empId)
        .then((employee: employee) => {
          if (employee) {
            this.user = employee;
            this.util.setKey(KEY.EMPLOYEE_USER, employee).then(() => {
              this.publishUpdateEvent();
              if (this.platform.is('cordova')) {
                this.util.getTokenNotification().then((token) => {
                  if (token) {
                    this.util.getKey(KEY.USER).then((userAccount: user) => {
                      if (userAccount) {
                        userAccount.tokenNotification = token;
                        this.updateUser(userAccount)
                          .then((updated_user) => {
                            if (updated_user) {
                              this.util.setKey(KEY.USER, updated_user);
                            }
                          })
                          .catch((err) => {
                            console.log(err);
                          })
                      }
                    })
                  }
                })
              }
            })
          }
        })
        .catch((err) => {
          this.util.showToast('Thông tin người dùng chưa được cập nhật. Vui lòng kiểm tra kết nối.');
          console.log('err_user_provider', err);
          this.publishUpdateEvent();
        })
    })
  }

  publishUpdateEvent() {
    this.updated_flag = true;
    this.event.publish('updated');
  }

  getSchedule() {
    return this.http
      .get(API.GET_SCHEDULE)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }


  getRoleUser() {
    return this.http
      .get('../../assets/data/role.json').toPromise()
      .then((role) => {
        this.rolePermission = role;
        return role;
      })
      .catch((err) => {
        return err;
      });
  }



  /**
   * Tạo mới user
   * @param objBody 
   */
  createUser(objBody: user) {
    return this.http
      .post(API.CREATE_USER, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Cập nhật thông tin user
   * @param objBody 
   */
  updateUser(objBody: user) {
    return this.http
      .post(API.UPDATE_USER, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Xóa user
   * @param objBody 
   */
  removeUser(objBody: user) {
    const options = {
      headers: new HttpHeaders(),
      body: objBody
    };
    return this.http.delete(API.DELETE_USER, options)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }
}
