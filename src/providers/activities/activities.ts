import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { breedings, sperms, mating, matingDetails, issuesPigs, births } from '../../common/entity';
import { CONFIG, API } from '../../common/const';

@Injectable()
export class ActivitiesProvider {

  constructor(public http: HttpClient) {
  }

  /**
   * Lấy danh sách tinh heo
   */
  getAllSperms() {
    return this.http
      .get(API.GET_ALL_SPERMS)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Lấy danh sách lên giống
   */
  getAllBreedings() {
    return this.http
      .get(API.GET_ALL_BREEDINGS)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Lấy danh sách phối giống
   */
  getAllMatings() {
    return this.http
      .get(API.GET_ALL_MATING)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Lấy danh sách ghi nhận heo đẻ
   */
  getAllBirths() {
    return this.http
      .get(API.GET_ALL_BIRTHS)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Tạo một hành động lên giống heo nái
   * @param objBody 
   */
  createBreeding(objBody: breedings) {
    return this.http
      .post(API.CREATE_BREEDING, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Tạo một hành động lấy tinh heo nọc
   * @param objBody 
   */
  createSperm(objBody: sperms) {
    return this.http
      .post(API.CREATE_SPERM, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Cập nhật hành động lên giống heo
   * @param objBody 
   */
  updateBreeding(objBody: breedings) {
    return this.http
      .put(API.UPDATE_BREEDING, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Cập nhật hành động lấy tinh heo
   * @param objBody 
   */
  updateSperm(objBody: sperms) {
    return this.http
      .put(API.UPDATE_SPERM, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Xóa hành động lên giống
   * @param objBody 
   */
  deleteBreeding(objBody: breedings) {
    const options = {
      headers: new HttpHeaders(),
      body: objBody
    };
    return this.http
      .delete(API.DELETE_BREEDING, options)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise()
  }

  /**
   * Xóa hành động lấy tinh heo
   * @param objBody 
   */
  deleteSperm(objBody: sperms) {
    const options = {
      headers: new HttpHeaders(),
      body: objBody
    };
    return this.http
      .delete(API.DELETE_SPERM, options)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Tạo hành động phối giống cho heo
   * @param objBody 
   */
  createMating(objBody: { mating: mating, matingDetail: Array<matingDetails> }) {
    return this.http
      .post(API.CREATE_MATING, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Cập nhật hành động phối giống cho heo
   * @param objBody 
   */
  updateMating(objBody: { mating: mating, matingDetail: Array<matingDetails> }) {
    return this.http
      .post(API.UPDATE_MATING, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Cập nhật hành động phối giống của heo
   * @param objBody 
   */
  updateMatingObj(objBody: mating) {
    return this.http
      .post(API.UPDATE_MATING_OBJ, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }


  /**
   * Xóa hành động phối giống cho heo
   * @param objBody 
   */
  deleteMating(objBody: mating) {
    const options = {
      headers: new HttpHeaders(),
      body: objBody
    };
    return this.http
      .delete(API.DELETE_MATING, options)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Tạo ghi nhận heo nái đẻ
   * @param objBody 
   */
  createBirth(objBody: births) {
    return this.http
      .post(API.CREATE_BIRTH, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Thêm mới vấn đề của heo
   * @param objBody 
   */
  createIssuePig(objBody: Array<issuesPigs>) {
    return this.http
      .post(API.CREATE_ISSUES_PIG, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }
}
