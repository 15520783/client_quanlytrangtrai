import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API, CONFIG } from '../../common/const';

@Injectable()
export class HousesProvider {

  constructor(public http: HttpClient) {
    console.log('Hello HousesProvider Provider');
  }

  getAllHouses(){
    return this.http.get(CONFIG.SERVER_API.concat(API.GET_ALL_HOUSES)).toPromise();
  }
}
