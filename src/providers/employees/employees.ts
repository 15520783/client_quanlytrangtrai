import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG, API, KEY } from '../../common/const';
import { employee } from '../../common/entity';
import { Utils } from '../../common/utils';
import { Events } from 'ionic-angular';

@Injectable()
export class EmployeesProvider {

  public employees: Array<employee> = [];
  public updated_flag = false;


  constructor(
    public http: HttpClient,
    public util: Utils,
    public events: Events
  ) {
    console.log('Hello EmployeesProvider Provider');
    this.util.getKey(KEY.EMPLOYEES)
    .then((data)=>{
      this.employees = data;
    })
  }

  getAllEmployee() {
    return this.http
    .get(API.GET_ALL_EMPLOYEES)
    .timeout(CONFIG.DEFAULT_TIMEOUT).toPromise();
  }

  getEmployeeByID(id: string) {
    let employee:Array<employee> =  this.employees.filter((employee: employee) => {
      return employee.id == id ? true : false;
    })
    return employee[0];
  }

  sync() {
    this.getAllEmployee()
      .then((data: Array<employee>) => {
        if (data.length) {
          this.util.setKey(KEY.EMPLOYEES, data)
            .then(() => {
              this.employees = data;
            })
        }
      })
      .catch((err) => {
        console.log('err_employee_provider', err);
        this.util.getKey(KEY.EMPLOYEES)
          .then((data: Array<employee>) => {
            this.employees = data;
          })
        this.util.showToast('Danh sách nhân viên chưa được cập nhật. Vui lòng kiểm tra kết nối.');
      })
      .then(() => {
        this.publishUpdateEvent();
      })
  }

  publishUpdateEvent() {
    this.updated_flag = true;
    this.events.publish('updated');
  }
}
