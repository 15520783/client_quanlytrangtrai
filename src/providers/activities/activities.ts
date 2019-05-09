import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { breedings, sperms } from '../../common/entity';
import { CONFIG, API } from '../../common/const';

@Injectable()
export class ActivitiesProvider {

  constructor(public http: HttpClient) {
  }

  /**
   * Lấy danh sách tinh heo
   */
  getAllSperms(){
    return this.http
    .get(API.GET_ALL_SPERMS)
    .timeout(CONFIG.DEFAULT_TIMEOUT)
    .toPromise();
  }

  /**
   * Tạo một hành động lên giống heo nái
   * @param objBody 
   */
  createBreeding(objBody: breedings) {
    return this.http
      .post(API.CREATE_BREEDING, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Tạo một hành động lấy tinh heo nọc
   * @param objBody 
   */
  createSperm(objBody: sperms) {
    return this.http
      .post(API.CREATE_SPERM, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

}
