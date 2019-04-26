import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utils } from '../../common/utils';
import { API, CONFIG, KEY } from '../../common/const';
import { farm } from '../../common/entity';
import { Events } from 'ionic-angular';

@Injectable()
export class FarmsProvider {

  public farms: Array<farm> = []
  public updated_flag = false;

  constructor(
    public http: HttpClient,
    public util: Utils,
    public events: Events
  ) {

  }


  public getFarms() {
    let headers = new HttpHeaders().set('Authorization', CONFIG.ACCESS_KEY);
    return this.http
      .get(API.GET_ALL_FARMS,{headers:headers})
      .timeout(CONFIG.DEFAULT_TIMEOUT).toPromise();
  }

  sync() {
    this.getFarms()
      .then((data: Array<farm>) => {
        if (data.length) {
          this.util.setKey(KEY.FARMS, data)
            .then(() => {
              this.farms = data;
              this.publishUpdateEvent();
            })
            .catch((err) => {
              this.farms = data;
              this.publishUpdateEvent();
              console.log('err_storage_farm', err);
            })
        }
      })
      .catch((err) => {
        this.util.showToast('Danh sách trang trại chưa được cập nhật. Vui lòng kiểm tra kết nối.');
        console.log('err_farm_provider', err);
        this.util.getKey(KEY.FARMS)
          .then((data: Array<farm>) => {
            this.farms = data;
            this.publishUpdateEvent();
          })
          .catch((err) => {
            this.farms = [];
            this.publishUpdateEvent();
            console.log('err_get_storage_farm', err);
          })
      })
  }


  publishUpdateEvent() {
    this.updated_flag = true;
    this.events.publish('updated');
  }
}
