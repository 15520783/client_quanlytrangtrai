import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utils } from '../../common/utils';
import { KEY, API, CONFIG } from '../../common/const';
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
    return this.http.get(CONFIG.SERVER_API.concat(API.GET_ALL_FARMS)).timeout(CONFIG.DEFAULT_TIMEOUT).toPromise();
  }

  public sync() {
    this.farms = [];
    this.getFarms()
      .then((data: Array<farm>) => {
        if (data.length) {
          this.util.setKey(KEY.FARMS, data);
          this.farms = data;
        }
      })
      .catch((err) => {
        console.log('err_farm_provider', err);
        this.util.getKey(CONFIG.SERVER_API.concat(KEY.FARMS))
          .then((data:Array<farm>)=>{
            this.farms = data;
          })
      })
  }
}
