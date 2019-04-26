import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { section } from '../../common/entity';
import { API, CONFIG, KEY } from '../../common/const';
import { Utils } from '../../common/utils';
import { Events } from 'ionic-angular';

@Injectable()
export class SectionsProvider {

  public sections: Array<section> = [];
  public updated_flag = false;


  constructor(
    public http: HttpClient,
    public util: Utils,
    public events: Events
  ) {
    console.log('Hello SectionsProvider Provider');
  }

  getSections() {
    let headers = new HttpHeaders().set('Authorization', CONFIG.ACCESS_KEY);
    return this.http
      .get(CONFIG.SERVER_API.concat(API.GET_ALL_SECTIONS), { headers: headers })
      .timeout(CONFIG.DEFAULT_TIMEOUT).toPromise();
  }


  sync() {
    this.getSections()
      .then((data: Array<section>) => {
        if (data.length) {
          this.util.setKey(KEY.SECTIONS, data)
            .then(() => {
              this.sections = data;
              this.publishUpdateEvent();
            })
            .catch((err) => {
              console.log('err_storage_section', err);
              this.publishUpdateEvent();
            })
        }
      })
      .catch((err) => {
        this.util.showToast('Danh sách khu chưa được cập nhật. Vui lòng kiểm tra kết nối.');
        console.log('err_section_provider', err);
        this.util.getKey(KEY.SECTIONS)
          .then((data: Array<section>) => {
            this.sections = data;
            this.publishUpdateEvent();
          })
          .catch((err) => {
            this.sections = [];
            this.publishUpdateEvent();
            console.log('err_get_storage_section', err);
          })
      })
  }

  publishUpdateEvent() {
    this.updated_flag = true;
    this.events.publish('updated');
  }

  getSectionByIdFarm(id: string) {
    return this.sections.filter((section) => {
      return section.farm.id === id ? true : false;
    })
  }
}
