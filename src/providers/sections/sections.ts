import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { section } from '../../common/entity';
import { API, CONFIG } from '../../common/const';

/*
  Generated class for the SectionsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SectionsProvider {

  public sections:Array<section> = [];
  
  constructor(public http: HttpClient) {
    console.log('Hello SectionsProvider Provider');
  }

  getSections(){
    return this.http.get(CONFIG.SERVER_API.concat(API.GET_ALL_SECTIONS)).timeout(CONFIG.DEFAULT_TIMEOUT).toPromise();
  }

}
