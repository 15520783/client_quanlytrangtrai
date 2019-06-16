import 'rxjs/add/operator/timeout';

import { API, CONFIG, KEY } from '../../common/const';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Events } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Utils } from '../../common/utils';
import { house } from '../../common/entity';

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
      .timeout(CONFIG.DEFAULT_TIMEOUT).toPromise()
      .then((data: Array<house>) => {
        if (data.length) {
          data.sort((a, b) => {
            return a.createdAt < b.createdAt ? -1 : 1;
          })
          this.util.setKey(KEY.HOUSES, data)
            .then(() => {
              this.houses = data;
            })
          return data;
        }
      });;
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
          this.publishUpdateEvent();
        }
      })
      .catch((err) => {
        this.publishUpdateEvent();
        this.util.showToast('Danh sách nhà chưa được cập nhật. Vui lòng kiểm tra kết nối.');
        console.log('err_house_provider', err);
        this.util.getKey(KEY.HOUSES)
          .then((data: Array<house>) => {
            this.houses = data;
          })
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
  }

  updateHouse(objBody: house) {
    return this.http
      .put(API.UPDATE_HOUSE, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise()
  }


  updatedHouse = (house: house) => {
    if (house) {
      let idx = this.houses.findIndex(_house => _house.id == house.id);
      if (idx > -1) {
        this.util.getKey(KEY.HOUSES).then((houses) => {
          let idx = houses.findIndex(_house => _house.id == house.id);
          if (idx > -1) {
            houses[idx] = house;
          } else {
            houses.push(house);
          }
          this.util.setKey(KEY.HOUSES, houses).then(() => {
            this.houses = houses;
          })
        })
      }
      else {
        this.util.getKey(KEY.HOUSES).then((houses: Array<house>) => {
          houses.push(house);
          this.util.setKey(KEY.HOUSES, houses).then(() => {
            this.houses = houses;
          })
        })
      }
    }
  }

  removeHouse(objBody) {
    const options = {
      headers: new HttpHeaders(),
      body: objBody
    };
    return this.http.delete(API.DELETE_HOUSE, options)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  removedHouse = (house: house) => {
    if (house) {
      let idx = this.houses.findIndex(_house => _house.id == house.id);
      if (idx > -1) {
        this.houses.splice(idx, 1);
        this.util.getKey(KEY.HOUSES).then(houses => {
          let idx = houses.findIndex(_house => _house.id == house.id);
          if (idx > -1) {
            houses.splice(idx, 1);
            this.util.setKey(KEY.HOUSES, houses);
          }
        })
      }
    }
  }

}
