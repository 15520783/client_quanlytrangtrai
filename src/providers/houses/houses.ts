import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    this.util.getKey(KEY.HOUSES)
      .then((data) => {
        this.houses = data;
      })
  }

  getAllHouses() {
    return this.http
      .get(API.GET_ALL_HOUSES)
      .timeout(CONFIG.DEFAULT_TIMEOUT).toPromise();
  }

  getHouseByIdSection(id: string) {
    return this.houses.filter((house) => {
      return house.section.id === id ? true : false;
    })
  }

  sync() {
    this.getAllHouses()
      .then((data: Array<house>) => {
        if (data.length) {
          this.util.setKey(KEY.HOUSES, data)
            .then(() => {
              this.houses = data;
            })
        }
      })
      .catch((err) => {
        this.util.showToast('Danh sách nhà chưa được cập nhật. Vui lòng kiểm tra kết nối.');
        console.log('err_house_provider', err);
        this.util.getKey(KEY.HOUSES)
          .then((data: Array<house>) => {
            this.houses = data;
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


  createNewHouse(objBody: house) {
    return this.http
      .post(API.CREATE_HOUSE, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise()
      .then((house: house) => {
        this.util.getKey(KEY.HOUSES)
          .then((houses: Array<house>) => {
            houses.push(house);
            this.util.setKey(KEY.HOUSES, houses);
          })
        return house;
      });
  }

  updateHouse(objBody: house) {
    return this.http
      .put(API.UPDATE_HOUSE, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise()
      .then((house: house) => {
        this.util.getKey(KEY.HOUSES)
          .then((houses: Array<house>) => {
            let idx = houses.findIndex(_house => _house.id == house.id);
            if (idx > -1) {
              houses[idx] = house;
              this.util.setKey(KEY.HOUSES, houses);
            }
          })
        return house;
      })
  }
}
