import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG, API } from '../../common/const';
import { employee } from '../../common/entity';

@Injectable()
export class EmployeesProvider {

  public employees:Array<employee> = [];

  constructor(public http: HttpClient) {
    console.log('Hello EmployeesProvider Provider');
  }

  getAllEmployee(){
    return this.http.get(CONFIG.SERVER_API.concat(API.GET_ALL_EMPLOYEES)).toPromise();
  }
}
