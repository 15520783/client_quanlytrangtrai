import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../../common/entity';
import { API, CONFIG } from '../../common/const';

@Injectable()
export class UserProvider {


  public user:user;
  
  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }

  login(param){
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/json',
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    //     'Access-Control-Allow-Headers': 'Content-Type'
    //   })
    // };

    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    headers = headers.set('Access-Control-Allow-Origin', '*');
    headers = headers.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    headers = headers.set('Access-Control-Allow-Headers', 'Content-Type');

    let body = {
      username:param.username,
      password:param.password
    }
    console.log(body);
    return this.http.post(API.LOGIN,body,{headers:headers}).toPromise();
  }

}
