import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API, CONFIG, KEY } from '../../common/const';
import 'rxjs/add/operator/timeout';
import { house } from '../../common/entity';
import { Utils } from '../../common/utils';
import { Events } from 'ionic-angular';

@Injectable()
export class HousesProvider {

  public houses: Array<house> = [];
  public updated_flag = false;


  constructor(
    public http: HttpClient,
    public util: Utils,
    public events: Events
  ) {
    console.log('Hello HousesProvider Provider');
  }

  getAllHouses() {
    return this.http.get(CONFIG.SERVER_API.concat(API.GET_ALL_HOUSES)).timeout(CONFIG.DEFAULT_TIMEOUT).toPromise();
  }

  sync() {
    this.getAllHouses()
      .then((data: Array<house>) => {
        if (data.length) {
          this.util.setKey(KEY.HOUSES, data)
            .then(() => {
              this.houses = data;
              this.publishUpdateEvent();
            })
            .catch((err) => {
              this.houses = data;
              console.log('err_storage_house', err);
              this.publishUpdateEvent();
            })
        }
      })
      .catch((err) => {
        this.util.showToast('Danh sách nhà chưa được cập nhật. Vui lòng kiểm tra kết nối.');
        console.log('err_farm_provider', err);
        this.util.getKey(KEY.HOUSES)
          .then((data: Array<house>) => {
            this.houses = data;
            this.publishUpdateEvent();
          })
          .catch((err) => {
            this.houses = [];
            this.publishUpdateEvent();
            console.log('err_get_storage_farm', err);
          })
      })
  }

  publishUpdateEvent() {
    this.updated_flag = true;
    this.events.publish('updated:house');
  }
}
