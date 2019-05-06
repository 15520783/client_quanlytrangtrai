import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { breeds, issues, medicines, pregnancyStatus, breedingType, healthStatus, diseases, farmTypes, foodType, foods, medicineType, medicineUnits, priceCodes, footType, gentialType, markTypes, roles, status, round } from '../../common/entity';
import { CONFIG, API, KEY } from '../../common/const';
import { Utils } from '../../common/utils';
import { Events } from 'ionic-angular';


export class setting {
  pregnancyStatus: Array<pregnancyStatus> = [];
  breeds: Array<breeds> = [];
  breedingType: Array<breedingType> = [];
  healthStatus: Array<healthStatus> = [];
  diseases: Array<diseases> = [];
  farmTypes: Array<farmTypes> = [];
  foodType: Array<foodType> = [];
  foods: Array<foods> = [];
  medicineType: Array<medicineType> = [];
  medicineUnits: Array<medicineUnits> = [];
  medicines: Array<medicines> = [];
  priceCodes: Array<priceCodes> = [];
  footType: Array<footType> = [];
  gentialType: Array<gentialType> = [];
  issues: Array<issues> = [];
  // markTypes: Array<markTypes> = [];
  roles: Array<roles> = [];
  status: Array<status> = [];
  rounds: Array<round> = [];
  constructor() {

  }
}

@Injectable()
export class SettingsProvider {


  public setting: setting = new setting();
  public updated_flag = false;

  constructor(
    public http: HttpClient,
    public util: Utils,
    public events: Events
  ) {
    this.util.getKey(KEY.SETTINGS)
    .then((data)=>{
      this.setting = data;
    })
  }


  getAllSettings() {
    return this.http
      .get(API.GET_ALL_SETTINGS)
      .timeout(CONFIG.DEFAULT_TIMEOUT).toPromise();
  }


  sync() {
    this.getAllSettings()
      .then((data: setting) => {
        if (data) {
          this.util.setKey(KEY.SETTINGS, data)
            .then(() => {
              this.setting = data;
              this.publishUpdateEvent();
            })
            .catch((err) => {
              this.setting = data;
              this.publishUpdateEvent();
              console.log('err_storage_setting', err);
            })
        }
      })
      .catch((err) => {
        this.util.showToast('Danh sách thiết lập chưa được cập nhật. Vui lòng kiểm tra kết nối.');
        console.log('err_setting_provider', err);
        this.util.getKey(KEY.SETTINGS)
          .then((data: setting) => {
            this.setting = data;
            this.publishUpdateEvent();
          })
          .catch((err) => {
            this.publishUpdateEvent();
            console.log('err_get_setting', err);
          })
      })
  }

  publishUpdateEvent() {
    this.updated_flag = true;
    this.events.publish('updated');
  }


  createNewPregnancyStatus(objBody:pregnancyStatus) {
    return this.http.post(API.CREATE_PREGNANCY_STATUS,objBody)
    .timeout(CONFIG.DEFAULT_TIMEOUT)
    .toPromise();
  }

  deletePregnancyStatus(objBody:pregnancyStatus){
    const options = {
      headers: new HttpHeaders(),
      body: objBody
    };
    return this.http.delete(API.DELETE_PREGNANCY_STATUS,options)
    .timeout(CONFIG.DEFAULT_TIMEOUT)
    .toPromise();
  }

  updatePregnancyStatus(objBody:pregnancyStatus){
    return this.http.put(API.UPDATE_PREGNANCY_STATUS,objBody)
    .timeout(CONFIG.DEFAULT_TIMEOUT)
    .toPromise();
  }

  createNewBreed(objBody:breeds){
    return this.http
    .post(API.CREATE_BREED,objBody)
    .timeout(CONFIG.DEFAULT_TIMEOUT)
    .toPromise();
  }

  deleteBreed(objBody:breeds){
    const options = {
      headers: new HttpHeaders(),
      body: objBody
    };
    return this.http.delete(API.DELETE_BREED,options)
    .timeout(CONFIG.DEFAULT_TIMEOUT)
    .toPromise();
  }

  updateBreed(objBody:breeds){
    return this.http.put(API.UPDATE_BREED,objBody)
    .timeout(CONFIG.DEFAULT_TIMEOUT)
    .toPromise();
  }
}