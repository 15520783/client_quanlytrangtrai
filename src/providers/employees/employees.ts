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

  /**
   * Tạo mới nhân viên
   * @param objBody 
   */
  createNewEmployee(objBody:employee){
    return this.http
    .post<employee>(API.CREATE_EMPLOYEE,objBody)
    .timeout(CONFIG.DEFAULT_TIMEOUT)
    .toPromise()
    .then((new_employee)=>{
      if(new_employee){
        this.util.getKey(KEY.EMPLOYEES).then((employees:Array<employee>)=>{
          employees.push(new_employee);
          this.util.setKey(KEY.EMPLOYEES,employees);
        })
        this.employees.push(new_employee);
      }
      return new_employee;
    })
    .catch((err)=>{
      return err;
    })
  }

  /**
   * Cập nhật nhân viên
   * @param objBody 
   */
  updateEmployee(objBody:employee){
    return this.http
    .put<employee>(API.UPDATE_EMPLOYEE,objBody)
    .timeout(CONFIG.DEFAULT_TIMEOUT)
    .toPromise()
    .then((updated_employee)=>{
      if(updated_employee){
        this.util.getKey(KEY.EMPLOYEES).then((employees:Array<employee>)=>{
          let idx = employees.findIndex(_employee=>_employee.id == updated_employee.id);
          if(idx > -1){
            employees[idx] = updated_employee;
            this.util.setKey(KEY.EMPLOYEES,employees);
          }
        })
        let idx =this.employees.findIndex(_employee=>_employee.id == updated_employee.id);
        if(idx>-1){
          this.employees[idx] = updated_employee;
        }
      }
      return updated_employee;
    })
    .catch((err)=>{
      return err;
    })
  }


  /**
   * Xóa nhân viên
   * @param objBody 
   */
  deleteEmployees(objBody:employee){
    const options = {
      headers: new HttpHeaders(),
      body: objBody
    };
    return this.http
      .delete(API.DELETE_EMPLOYEE, options)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise()
      .then((isOK)=>{
        if(isOK){
          this.util.getKey(KEY.EMPLOYEES).then((employees:Array<employee>)=>{
            let idx = employees.findIndex(_employee=>_employee.id == objBody.id);
            if(idx > -1){
              employees.splice(idx,1);
              this.util.setKey(KEY.EMPLOYEES,employees);
            }
          })
          let idx = this.employees.findIndex(_employee=>_employee.id == objBody.id);
          if(idx > -1){
            this.employees.splice(idx,1);
          }
        }
        return isOK;
      })
      .catch((err)=>{
        return err;
      })
  }

  /**
   * Lấy danh sách tài khoản của nhân viên
   * @param empId 
   */
  getUserAccountsOfEmployee(empId:string){
    return this.http
    .get(API.GET_USER_ACCOUNT_OF_EMPLOYEE+'/'+empId)
    .timeout(CONFIG.DEFAULT_TIMEOUT)
    .toPromise();
  }
}
