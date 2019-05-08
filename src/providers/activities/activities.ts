import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { breedings } from '../../common/entity';
import { CONFIG, API } from '../../common/const';

@Injectable()
export class ActivitiesProvider {

  constructor(public http: HttpClient) {
  }

  createBreeding(objBody:breedings){
    return this.http
    .post(API.CREATE_BREEDING,objBody)
    .timeout(CONFIG.DEFAULT_TIMEOUT)
    .toPromise();
  }

}
