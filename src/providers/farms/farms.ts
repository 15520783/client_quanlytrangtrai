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
    this.util.getKey(KEY.FARMS)
      .then((data) => {
        this.farms = data;
      })
  }


  public getFarms() {
    return this.http
      .get(API.GET_ALL_FARMS)
      .timeout(CONFIG.DEFAULT_TIMEOUT).toPromise()
      .then((data: Array<farm>) => {
        if (data.length) {
          data.sort((a, b) => {
            return a.createdAt < b.createdAt ? -1 : 1;
          })
          this.util.setKey(KEY.FARMS, data)
            .then(() => {
              this.farms = data;
            })
          return data;
        }
      });
  }

  sync() {
    this.getFarms()
      .then((data: Array<farm>) => {
        this.publishUpdateEvent();
      })
      .catch((err) => {
        this.publishUpdateEvent();
        this.util.showToast('Danh sách trang trại chưa được cập nhật. Vui lòng kiểm tra kết nối.');
        console.log('err_farm_provider', err);
        this.util.getKey(KEY.FARMS)
          .then((data: Array<farm>) => {
            this.farms = data;
          })
      })
  }

  updateFarm(objBody: farm) {
    return this.http
      .put(API.UPDATE_FARM, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise()
      .then((farm: farm) => {
        this.util.getKey(KEY.FARMS)
          .then((farms: Array<farm>) => {
            let idx = farms.findIndex(_farm => _farm.id == farm.id);
            if (idx > -1) {
              farms[idx] = farm;
              this.util.setKey(KEY.FARMS, farms);
              this.farms = farms;
            }
          })
        return farm;
      })
  }

  publishUpdateEvent() {
    this.updated_flag = true;
    this.events.publish('updated');
  }
}
