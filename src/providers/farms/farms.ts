import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utils } from '../../common/utils';
import { API, CONFIG } from '../../common/const';
import { farm } from '../../common/entity';

@Injectable()
export class FarmsProvider {

  public farms: Array<farm> = []

  constructor(
    public http: HttpClient,
    public util: Utils
  ) {

  }


  public getFarms() {
    return this.http.get(CONFIG.SERVER_API.concat(API.GET_ALL_FARMS)).timeout(CONFIG.DEFAULT_TIMEOUT).toPromise()
    .then((data:Array<farm>)=>{
      if(data && data.length)
      data.forEach(e=>{
        e.founding = this.util.convertDate(e.founding);
      })
      return data;
    });
  }

  
}
