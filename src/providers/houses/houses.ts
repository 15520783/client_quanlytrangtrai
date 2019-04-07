import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API, CONFIG } from '../../common/const';
import 'rxjs/add/operator/timeout';
import { house } from '../../common/entity';

@Injectable()
export class HousesProvider {

  public houses:Array<house> = [];

  constructor(public http: HttpClient) {
    console.log('Hello HousesProvider Provider');
  }

  getAllHouses(){
    return this.http.get(CONFIG.SERVER_API.concat(API.GET_ALL_HOUSES)).timeout(CONFIG.DEFAULT_TIMEOUT).toPromise();
  }
}
