import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { warehouse } from '../../common/entity';
import { CONFIG, KEY } from '../../common/const';
import { API } from '../../common/const';
import { Utils } from '../../common/utils';
import { Events } from 'ionic-angular';

@Injectable()
export class WarehousesProvider {

  public warehouses: Array<warehouse> = []
  public updated_flag = false;

  constructor(
    public http: HttpClient,
    public util: Utils,
    public events: Events
  ) {
    console.log('Hello WarehousesProvider Provider');
  }

  public getWarehouses() {
    return this.http.get(CONFIG.SERVER_API.concat(API.GET_ALL_WAREHOUSES)).timeout(CONFIG.DEFAULT_TIMEOUT).toPromise();
  }

  sync() {
    this.getWarehouses()
      .then((data: Array<warehouse>) => {
        if (data.length) {
          this.util.setKey(KEY.WAREHOUSES, data)
            .then(() => {
              this.warehouses = data;
              this.publishUpdateEvent();
            })
            .catch((err) => {
              this.warehouses = data;
              this.publishUpdateEvent();
              console.log('err_storage_warehouse', err);
            })
        }
      })
      .catch((err) => {
        this.util.showToast('Danh sách kho chưa được cập nhật. Vui lòng kiểm tra kết nối.');
        console.log('err_warehouse_provider', err);
        this.util.getKey(KEY.WAREHOUSES)
          .then((data: Array<warehouse>) => {
            this.warehouses = data;
            this.publishUpdateEvent();
          })
          .catch((err) => {
            this.warehouses = [];
            this.publishUpdateEvent();
            console.log('err_get_storage_warehouse', err);
          })
      })
  }

  publishUpdateEvent() {
    this.updated_flag = true;
    this.events.publish('updated:warehouse');
  }

  getFoodWarehouse() {
    return this.warehouses.filter((warehouse: warehouse) => {
      return warehouse.type_id === "1" ? true : false;
    })
  }

  getMedicineWarehouse() {
    return this.warehouses.filter((warehouse: warehouse) => {
      return warehouse.type_id === "2" ? true : false;
    })
  }
}
