import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG, API, KEY } from '../../common/const';
import { partners } from '../../common/entity';
import { Utils } from '../../common/utils';
import { Events } from 'ionic-angular';

@Injectable()
export class PartnerProvider {

  public partners: Array<partners> = [];
  public updated_flag: boolean = false;

  constructor(
    public http: HttpClient,
    public util: Utils,
    public events: Events
  ) {
    this.util.getKey(KEY.PARTNERS)
      .then((data) => {
        this.partners = data;
      })
  }

  getAllPartners() {
    return this.http.get(API.GET_ALL_PARTNERS)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  sync() {
    this.getAllPartners()
      .then((data: Array<partners>) => {
        if (data.length) {
          this.util.setKey(KEY.PARTNERS, data)
            .then(() => {
              this.partners = data;
              // this.publishUpdateEvent();
            })
        }
      })
      .catch((err) => {
        this.util.showToast('Danh sách trang trại chưa được cập nhật. Vui lòng kiểm tra kết nối.');
        console.log('err_partner_provider', err);
        this.util.getKey(KEY.PARTNERS)
          .then((data: Array<partners>) => {
            this.partners = data;
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
}
