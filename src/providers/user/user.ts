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

    let body = {
      username:param.username,
      password:param.password
    }
    return this.http
    .post(CONFIG.SERVER_API.concat(API.LOGIN),body)
    .timeout(CONFIG.DEFAULT_TIMEOUT)
    .toPromise();
  }

  checkServer(){
    let headers = new HttpHeaders().set('Authorization', CONFIG.ACCESS_KEY);
    return this.http
    .get(CONFIG.SERVER_API.concat(API.CHECK_SERVER),{headers:headers})
    .timeout(10000)
    .toPromise();
  }

}
