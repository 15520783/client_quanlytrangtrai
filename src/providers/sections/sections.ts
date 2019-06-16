import { API, CONFIG, KEY } from '../../common/const';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Events } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Utils } from '../../common/utils';
import { section } from '../../common/entity';

@Injectable()
export class SectionsProvider {

  public sections: Array<section> = [];
  public updated_flag = false;


  constructor(
    public http: HttpClient,
    public util: Utils,
    public events: Events
  ) {
    this.util.getKey(KEY.SECTIONS)
      .then((data) => {
        this.sections = data;
      })
  }

  getSections() {
    return this.http
      .get(API.GET_ALL_SECTIONS)
      .timeout(CONFIG.DEFAULT_TIMEOUT).toPromise()
      .then((data: Array<section>) => {
        if (data.length) {
          data.sort((a, b) => {
            return a.createdAt < b.createdAt ? -1 : 1;
          })
          this.util.setKey(KEY.SECTIONS, data)
            .then(() => {
              this.sections = data;
            })
          return data;
        }
      });
  }


  sync() {
    this.getSections()
      .then((data: Array<section>) => {
        if (data.length) {
          // this.util.setKey(KEY.SECTIONS, data)
          //   .then(() => {
          //     this.sections = data;
          //   })
          this.publishUpdateEvent();
        }
      })
      .catch((err) => {
        this.publishUpdateEvent();
        this.util.showToast('Danh sách khu chưa được cập nhật. Vui lòng kiểm tra kết nối.');
        console.log('err_section_provider', err);
        this.util.getKey(KEY.SECTIONS)
          .then((data: Array<section>) => {
            this.sections = data;
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

  /**
   * Tạo mới khu
   * @param objBody 
   */
  createNewSection(objBody) {
    return this.http
      .post(API.CREATE_SECTION, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise()
  }

  /**
   * Cập nhật thông tin khu
   * @param objBody 
   */
  updateSection(objBody: section) {
    return this.http
      .put(API.UPDATE_SECTION, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise()
  }

  /**
   * Xóa khu
   * @param objBody 
   */
  removeSection(objBody:section){
    const options = {
      headers: new HttpHeaders(),
      body: objBody
    };
    return this.http.delete(API.DELETE_SECTION, options)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }


  updatedSection = (section: section) => {
    if (section) {
      let idx = this.sections.findIndex(_section => _section.id == section.id);
      if (idx > -1) {
        this.util.getKey(KEY.SECTIONS).then((sections) => {
          let idx = sections.findIndex(_section => _section.id == section.id);
          if (idx > -1) {
            sections[idx] = section;
          } else {
            sections.push(section);
          }
          this.util.setKey(KEY.SECTIONS, sections).then(() => {
            this.sections = sections;
          })
        })
      }
      else {
        this.util.getKey(KEY.SECTIONS).then((sections: Array<section>) => {
          sections.push(section);
          this.util.setKey(KEY.SECTIONS, sections).then(() => {
            this.sections = sections;
          })
        })
      }
    }
  }


  removedsection = (section: section) => {
    if (section) {
      let idx = this.sections.findIndex(_section => _section.id == section.id);
      if (idx > -1) {
        this.sections.splice(idx, 1);
        this.util.getKey(KEY.SECTIONS).then(sections => {
          let idx = sections.findIndex(_section => _section.id == section.id);
          if (idx > -1) {
            sections.splice(idx, 1);
            this.util.setKey(KEY.SECTIONS, sections);
          }
        })
      }
    }
  }
}
