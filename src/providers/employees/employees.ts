import { API, CONFIG, KEY } from '../../common/const';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Events } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Utils } from '../../common/utils';
import { employee } from '../../common/entity';

@Injectable()
export class EmployeesProvider {

  public employees: Array<employee> = [];
  public updated_flag = false;


  constructor(
    public http: HttpClient,
    public util: Utils,
    public events: Events
  ) {
    this.util.getKey(KEY.EMPLOYEES)
      .then((data) => {
        this.employees = data;
      })
  }

  getAllEmployee() {
    return this.http
      .get(API.GET_ALL_EMPLOYEES)
      .timeout(CONFIG.DEFAULT_TIMEOUT).toPromise()
      .then((data: Array<employee>) => {
        if (data.length) {
          data.sort((a, b) => {
            return a.createdAt < b.createdAt ? -1 : 1;
          })
          this.util.setKey(KEY.EMPLOYEES, data)
            .then(() => {
              this.employees = data;
            })
          return data;
        }
      });
  }

  getEmployeeByID(id: string) {
    let employee: Array<employee> = this.employees.filter((employee: employee) => {
      return employee.id == id ? true : false;
    })
    return employee[0];
  }

  sync() {
    this.getAllEmployee()
      .then((data: Array<employee>) => {
        if (data.length) {
          // this.util.setKey(KEY.EMPLOYEES, data)
          //   .then(() => {
          //     this.employees = data;
          //   })
          this.publishUpdateEvent();
        }
      })
      .catch((err) => {
        this.publishUpdateEvent();
        console.log('err_employee_provider', err);
        this.util.getKey(KEY.EMPLOYEES)
          .then((data: Array<employee>) => {
            this.employees = data;
          })
        this.util.showToast('Danh sách nhân viên chưa được cập nhật. Vui lòng kiểm tra kết nối.');
      })
  }

  publishUpdateEvent() {
    this.updated_flag = true;
    this.events.publish('updated');
  }

  /**
   * Tạo mới nhân viên
   * @param objBody 
   */
  createNewEmployee(objBody: employee) {
    return this.http
      .post<employee>(API.CREATE_EMPLOYEE, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise()
  }

  /**
   * Cập nhật nhân viên
   * @param objBody 
   */
  updateEmployee(objBody: employee) {
    return this.http
      .put<employee>(API.UPDATE_EMPLOYEE, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }


  /**
   * Xóa nhân viên
   * @param objBody 
   */
  deleteEmployees(objBody: employee) {
    const options = {
      headers: new HttpHeaders(),
      body: objBody
    };
    return this.http
      .delete(API.DELETE_EMPLOYEE, options)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise()
  }

  /**
   * Lấy danh sách tài khoản của nhân viên
   * @param empId 
   */
  getUserAccountsOfEmployee(empId: string) {
    return this.http
      .get(API.GET_USER_ACCOUNT_OF_EMPLOYEE + '/' + empId)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  updatedEmployee = (employee: employee) => {
    if (employee) {
      let idx = this.employees.findIndex(_employee => _employee.id == employee.id);
      if (idx > -1) {
        this.util.getKey(KEY.EMPLOYEES).then((employees) => {
          let idx = employees.findIndex(_employee => _employee.id == employee.id);
          if (idx > -1) {
            employees[idx] = employee;
          } else {
            employees.push(employee);
          }
          this.util.setKey(KEY.EMPLOYEES, employees).then(() => {
            this.employees = employees;
          })
        })
      }
      else {
        this.util.getKey(KEY.EMPLOYEES).then((employees: Array<employee>) => {
          employees.push(employee);
          this.util.setKey(KEY.EMPLOYEES, employees).then(() => {
            this.employees = employees;
          })
        })
      }
    }
  }

  removedEmployee = (employee: employee) => {
    if (employee) {
      let idx = this.employees.findIndex(_employee => _employee.id == employee.id);
      if (idx > -1) {
        this.employees.splice(idx, 1);
        this.util.getKey(KEY.EMPLOYEES).then(employees => {
          let idx = employees.findIndex(_employee => _employee.id == employee.id);
          if (idx > -1) {
            employees.splice(idx, 1);
            this.util.setKey(KEY.EMPLOYEES, employees);
          }
        })
      }
    }
  }

  /**
   * Lấy danh sách kế hoạch của nhân viên
   * @param employeeId 
   */
  getScheduleOfEmployee(employeeId:string){
    return this.http
    .get(API.GET_SCHEDULE_OF_EMPLOYEE + employeeId)
    .timeout(CONFIG.DEFAULT_TIMEOUT)
    .toPromise();
  }
}
