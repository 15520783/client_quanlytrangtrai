import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { group } from '../../common/entity';
import { API, CONFIG } from '../../common/const';

/*
  Generated class for the PigGroupsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PigGroupsProvider {

  public groups:Array<group> = [];

  constructor(public http: HttpClient) {
    console.log('Hello PigGroupsProvider Provider');
  }

  getAllGroups(){
    return this.http.get(CONFIG.SERVER_API.concat(API.GET_ALL_GROUPS)).timeout(CONFIG.DEFAULT_TIMEOUT).toPromise();
  }
}
