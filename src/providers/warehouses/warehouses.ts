import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { warehouse, medicineWarehouse } from '../../common/entity';
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
    this.util.getKey(KEY.WAREHOUSES)
      .then((data) => {
        this.warehouses = data;
      })
  }

  public getWarehouses() {
    return this.http
      .get(API.GET_ALL_WAREHOUSES)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  sync() {
    this.getWarehouses()
      .then((data: Array<warehouse>) => {
        if (data.length) {
          this.util.setKey(KEY.WAREHOUSES, data)
            .then(() => {
              this.warehouses = data;
            })
        }
      })
      .catch((err) => {
        this.util.showToast('Danh sách kho chưa được cập nhật. Vui lòng kiểm tra kết nối.');
        console.log('err_warehouse_provider', err);
        this.util.getKey(KEY.WAREHOUSES)
          .then((data: Array<warehouse>) => {
            this.warehouses = data;
          })
      })
      .then(() => {
        this.publishUpdateEvent();
      })
  }

  publishUpdateEvent() {
    this.updated_flag = true;
    this.events.publish('updated');
  }

  getFoodWarehouse() {
    return this.warehouses.filter((warehouse: warehouse) => {
      return warehouse.type.id == "1" ? true : false;
    })
  }

  getMedicineWarehouse() {
    return this.warehouses.filter((warehouse: warehouse) => {
      return warehouse.type.id == "2" ? true : false;
    })
  }

  /**
  * Lấy danh sách chi tiết cám thuộc nhà kho
  * @param warehouseId 
  */
  getFoodWarehouseByWarehousId(warehouseId: string) {
    return this.http
      .get(API.GET_FOOD_WAREHOUSE_OF_WAREHOUSE.concat(warehouseId))
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Lấy danh sách chi tiết thuốc thuộc nhà kho
   * @param warehouseId 
   */
  getMedicineWarehouseByWarehouseId(warehouseId: string) {
    return this.http
      .get(API.GET_MEDICINE_WAREHOUSE_OF_WAREHOUSE.concat(warehouseId))
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }


  /**
   * Lấy danh sách thuốc lưu trữ của một loại thuốc
   * @param medicineId 
   */
  getMedicineWarehouseOfMedicine(medicineId:string){
    return this.http
    .get<Array<medicineWarehouse>>(API.GET_MEDICINEWAREHOUSE_OF_MEDICINE+'/'+medicineId)
    .timeout(CONFIG.DEFAULT_TIMEOUT)
    .toPromise();
  }
}
