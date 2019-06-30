import { API, CONFIG, KEY } from '../../common/const';

import { Events } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utils } from '../../common/utils';
import { group } from '../../common/entity';

@Injectable()
export class PigGroupsProvider {

  public groups: Array<group> = [];
  public updated_flag = false;


  constructor(
    public http: HttpClient,
    public util: Utils,
    public events: Events
  ) {
    this.util.getKey(KEY.GROUPS)
    .then((data)=>{
      this.groups = data;
    })
  }

  getAllGroups() {
    return this.http
    .get(API.GET_ALL_GROUPS)
    .timeout(CONFIG.DEFAULT_TIMEOUT).toPromise();
  }

  sync() {
    this.getAllGroups()
      .then((data: Array<group>) => {
        if (data.length) {
          this.util.setKey(KEY.GROUPS, data)
            .then(() => {
              this.groups = data;
              this.publishUpdateEvent();
            })
            .catch((err) => {
              this.groups = data;
              this.publishUpdateEvent();
              console.log('err_storage_pigs', err);
            })
        }
      })
      .catch((err) => {
        console.log('err_pig_provider', err);
        this.util.getKey(KEY.GROUPS)
          .then((data: Array<group>) => {
            this.groups = data;
            this.publishUpdateEvent();
          })
          .catch((err) => {
            console.log('err_get_storage_pig', err);
            this.groups = [];
            this.publishUpdateEvent();
          })
        this.util.showToast('Danh sách nhóm heo chưa được cập nhật. Vui lòng kiểm tra kết nối.');
      })
  }

  publishUpdateEvent(){
    this.updated_flag = true;
    this.events.publish('updated');
  }
}
