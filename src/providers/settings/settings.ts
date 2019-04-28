import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { breeds, issues, medicines, pregnancyStatus, breedingType, healthStatus, diseases, farmTypes, foodType, foods, medicineType, medicineUnits, priceCodes, footType, gentialType, markTypes, roles } from '../../common/entity';
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
  footTypes: Array<footType> = [];
  gentialType: Array<gentialType> = [];
  issues: Array<issues> = [];
  markTypes: Array<markTypes> = [];
  roles: Array<roles> = [];
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
    console.log('Hello SettingsProvider Provider');
  }


  getAllSettings() {
    let headers =  new HttpHeaders().set('Authorization', CONFIG.ACCESS_KEY);
    return this.http
      .get(CONFIG.SERVER_API.concat(API.GET_ALL_SETTINGS), { headers: headers })
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
        this.util.showToast('Danh sách kho chưa được cập nhật. Vui lòng kiểm tra kết nối.');
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
    let headers =  new HttpHeaders().set('Authorization', CONFIG.ACCESS_KEY);
    return this.http.post(CONFIG.SERVER_API.concat(API.CREATE_PREGNANCY_STATUS),objBody,{headers:headers})
    .timeout(CONFIG.DEFAULT_TIMEOUT)
    .toPromise();
  }

  deletePregnancyStatus(objBody:pregnancyStatus){
    
    const options = {
      headers: new HttpHeaders({
        'Authorization':  CONFIG.ACCESS_KEY,
      }),
      body: objBody
    };
    return this.http.delete(CONFIG.SERVER_API.concat(API.DELETE_PREGNANCY_STATUS),options)
    .timeout(CONFIG.DEFAULT_TIMEOUT)
    .toPromise();
  }

  updatePregnancyStatus(objBody:pregnancyStatus){
    let headers =  new HttpHeaders().set('Authorization', CONFIG.ACCESS_KEY);
    return this.http.put(CONFIG.SERVER_API.concat(API.UPDATE_PREGNANCY_STATUS),objBody,{headers:headers})
    .timeout(CONFIG.DEFAULT_TIMEOUT)
    .toPromise();
  }
}