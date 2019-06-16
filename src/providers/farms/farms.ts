import { API, CONFIG, KEY } from '../../common/const';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Events } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Utils } from '../../common/utils';
import { farm } from '../../common/entity';

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
      })
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

  /**
   * Thêm mới trang trại
   * @param objBody 
   */
  createFarm(objBody: farm) {
    return this.http
      .post(API.CREATE_FARM, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise()
      .then((new_farm: farm) => {
        this.util.getKey(KEY.FARMS)
          .then((farms: Array<farm>) => {
            farms.push(new_farm);
            this.util.setKey(KEY.FARMS, farms);
            this.farms.push(new_farm);
          })
        return new_farm;
      });
  }

  /**
   * Cập nhật thông tin trang trại
   * @param objBody 
   */
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

  removeFarm(objBody: farm) {
    const options = {
      headers: new HttpHeaders(),
      body: objBody
    };
    return this.http
      .delete(API.DELETE_FARM, options)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise()
      .then((isOK) => {
        if (isOK) {
          let idx = this.farms.findIndex(_farm => _farm.id == objBody.id);
          if (idx > -1) {
            this.farms.splice(idx, 1);
            this.util.getKey(KEY.FARMS)
              .then((farms) => {
                idx = farms.findIndex(_farm => _farm.id == objBody.id);
                if (idx > -1) {
                  farms.splice(idx, 1);
                  this.util.setKey(KEY.FARMS, farms);
                }
              })
          }
        }
        return isOK;
      });
  }

  publishUpdateEvent() {
    this.updated_flag = true;
    this.events.publish('updated');
  }
}
