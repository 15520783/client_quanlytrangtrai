import { API, CONFIG, KEY, VARIABLE } from '../../common/const';
import { Events, Platform } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { employee, schedule, user } from '../../common/entity';

import { Injectable } from '@angular/core';
import { Utils } from '../../common/utils';

@Injectable()
export class UserProvider {


  public user: employee;
  public updated_flag = false;
  public rolePermission: any;
  public schedules: Array<schedule> = [];

  constructor(
    public http: HttpClient,
    public util: Utils,
    public event: Events,
    public platform: Platform
  ) {
    this.util.getKey(KEY.EMPLOYEE_USER).then((employee) => {
      this.user = employee;
    })
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

  // sync() {
  //   this.util.getKey(KEY.EMPID).then((empId) => {
  //     this.getEmployeeInfo(empId)
  //       .then((employee: employee) => {
  //         if (employee) {
  //           this.user = employee;
  //           this.publishUpdateEvent();
  //         }
  //       })
  //       .catch((err) => {
  //         this.util.showToast('Thông tin người dùng chưa được cập nhật. Vui lòng kiểm tra kết nối.');
  //         console.log('err_user_provider', err);
  //         this.publishUpdateEvent();
  //       })
  //   })
  // }

  syncSchedule() {
    this.getPersonalSchedule()
      .then((schedules: Array<schedule>) => {
        if (schedules) {
          let today = new Date(new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate());

          this.schedules = schedules.filter((schedule: schedule) => {
            return (schedule.status == VARIABLE.SCHEDULE_STATUS.ASSIGNED.name && new Date(schedule.date) >= today) ? true : false;
          });
          this.publishUpdateEvent();
        }
      })
      .catch((err) => {
        this.util.showToast('Thông tin người dùng chưa được cập nhật. Vui lòng kiểm tra kết nối.');
        console.log('err_user_provider', err);
        this.publishUpdateEvent();
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

  getPersonalSchedule() {
    return this.http
      .get(API.GET_SCHEDULE_OF_EMPLOYEE + this.user.id)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  getRoleUserList() {
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
   * Cập nhật password user
   * @param objBody 
   */
  updatePassword(objBody: user) {
    return this.http
      .post(API.UPDATE_USER, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Cập nhật token notification
   * @param userId 
   * @param token 
   */
  updateTokenNotification(userId: string, token: string) {
    return this.http
      .get(API.UPDATE_TOKEN + userId + '/' + token)
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

  /**
   * Lấy danh sách quyền của người dùng admin
   */
  getPermissionOfUserMaster() {
    return this.http
      .get(API.GET_ALL_PERMISSION)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }
}
