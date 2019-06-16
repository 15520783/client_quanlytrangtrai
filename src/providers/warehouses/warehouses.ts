import { CONFIG, KEY } from '../../common/const';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { medicineWarehouse, warehouse } from '../../common/entity';

import { API } from '../../common/const';
import { Events } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Utils } from '../../common/utils';

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
  getMedicineWarehouseOfMedicine(farmId: string, medicineId: string) {
    return this.http
      .get<Array<medicineWarehouse>>(API.GET_MEDICINEWAREHOUSE_OF_MEDICINE + '/' + farmId + '/' + medicineId)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }


  /**
   * Tạo mới một kho
   * @param objBody 
   */
  createNewWarehouse(objBody:warehouse){
    return this.http
    .post<warehouse>(API.CREATE_WAREHOUSE,objBody)
    .timeout(CONFIG.DEFAULT_TIMEOUT)
    .toPromise()
    .then((new_warehouse:warehouse)=>{
      if(new_warehouse){
        this.updatedwarehouse(new_warehouse);
      }
      return new_warehouse;
    })
    // .then((new_warehouse)=>{
    //   if(new_warehouse){
    //     this.util.getKey(KEY.WAREHOUSES).then((warehouses:Array<warehouse>)=>{
    //       warehouses.push(new_warehouse);
    //       this.util.setKey(KEY.WAREHOUSES,warehouses);
    //     })
    //     this.warehouses.push(new_warehouse);
    //   }
    //   return new_warehouse;
    // })
  }

  /**
   * Cập nhật một kho
   * @param objBody 
   */
  updateWarehouse(objBody:warehouse){
    return this.http
    .put<warehouse>(API.UPDATE_WAREHOUSE,objBody)
    .timeout(CONFIG.DEFAULT_TIMEOUT)
    .toPromise()
    .then((updated_warehouse:warehouse)=>{
      if(updated_warehouse){
        this.updatedwarehouse(updated_warehouse);
      }
      return updated_warehouse;
    });
  }

  /**
   * Xóa kho
   * @param objBody 
   */
  deleteWarehouse(objBody:warehouse){
    const options = {
      headers: new HttpHeaders(),
      body: objBody
    };
    return this.http
      .delete(API.DELETE_WAREHOUSE, options)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise()
      .then((isOK:boolean)=>{
        if(isOK){
          this.removedwarehouse(objBody);
        }
        return isOK;
      })
  }



  updatedwarehouse = (warehouse: warehouse) => {
    if (warehouse) {
      let idx = this.warehouses.findIndex(_warehouse => _warehouse.id == warehouse.id);
      if (idx > -1) {
        this.warehouses.push(warehouse);
        this.util.getKey(KEY.WAREHOUSES).then((warehouses) => {
          let idx = warehouses.findIndex(_warehouse => _warehouse.id == warehouse.id);
          if (idx > -1) {
            warehouses[idx] = warehouse;
          } else {
            warehouses.push(warehouse);
          }
          this.util.setKey(KEY.WAREHOUSES, warehouses);
        })
      }
      else {
        this.util.getKey(KEY.WAREHOUSES).then((warehouses: Array<warehouse>) => {
          warehouses.push(warehouse);
          this.util.setKey(KEY.WAREHOUSES, warehouses).then(() => {
            this.warehouses = warehouses;
          })
        })
      }
    }
  }


  removedwarehouse = (warehouse: warehouse) => {
    if (warehouse) {
      let idx = this.warehouses.findIndex(_warehouse => _warehouse.id == warehouse.id);
      if (idx > -1) {
        this.warehouses.splice(idx, 1);
        this.util.getKey(KEY.WAREHOUSES).then(warehouses => {
          let idx = warehouses.findIndex(_warehouse => _warehouse.id == warehouse.id);
          if (idx > -1) {
            warehouses.splice(idx, 1);
            this.util.setKey(KEY.WAREHOUSES, warehouses);
          }
        })
      }
    }
  }
}
