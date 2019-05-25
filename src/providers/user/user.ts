import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user, employee } from '../../common/entity';
import { API, CONFIG, KEY } from '../../common/const';
import { Utils } from '../../common/utils';
import { Events } from 'ionic-angular';

@Injectable()
export class UserProvider {


  public user: employee;
  public updated_flag = false;

  constructor(
    public http: HttpClient,
    public util: Utils,
    public event: Events
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
      .timeout(10000)
      .toPromise();
  }

  getUserInfo(empId: string) {
    return this.http
      .get(API.GET_INFO_EMPLOYEE.concat(empId))
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  sync() {
    this.util.getKey(KEY.EMPID).then((empId) => {
      this.getUserInfo(empId)
        .then((employee: employee) => {
          if (employee) {
            this.user = employee;
            this.util.setKey(KEY.USER, employee).then(() => {
              this.publishUpdateEvent();
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

}
