import { API, CONFIG } from '../../common/const';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { births, breedings, feeds, issuesPigs, mating, matingDetails, schedule, sperms, usedMedicine } from '../../common/entity';

import { Injectable } from '@angular/core';

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
  createMating(objBody: { mating: mating, matingDetail: Array<matingDetails>,breeding:breedings }) {
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
      .put(API.UPDATE_MATING_OBJ, objBody)
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
   * Cập nhật ghi nhận heo đẻ
   * @param objBody 
   */
  updateBirth(objBody:births){
    return this.http
    .put(API.UPDATE_BIRTH,objBody)
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


  /**
   * Xóa ghi nhận vấn đề heo
   * @param objBody 
   */
  deleteIssuePig(objBody: issuesPigs) {
    const options = {
      headers: new HttpHeaders(),
      body: objBody
    };
    return this.http
      .delete(API.DELETE_ISSUES_PIG, options)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Thêm mới ghi nhận cho heo ăn
   * @param objBody 
   */
  createFeeds(objBody: Array<feeds>) {
    return this.http
      .post<Array<feeds>>(API.CREATE_FEEDS, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Lấy danh sách vấn đề heo thuộc khu
   * @param farmId 
   * @param sectionId 
   */
  getIssuePigOfSection(farmId: string, sectionId: string) {
    return this.http
      .get<Array<issuesPigs>>(API.GET_ISSUE_PIG_OF_SECTION + '/' + farmId + '/' + sectionId)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Lấy danh sách vấn đề heo thuộc trang trại
   */
  getIssuePigOfFarms() {
    return this.http
      .get<Array<issuesPigs>>(API.GET_ISSUE_PIG_OF_FARMS)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Cập nhật danh sách vấn đề heo
   * @param objBody 
   */
  updateAllIssuePig(objBody: Array<issuesPigs>) {
    return this.http
      .put<Array<issuesPigs>>(API.UPDATE_LIST_ISSUES_PIG, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Tạo danh sách ghi nhận sử dụng thuốc
   * @param objBody 
   */
  createUsedMedicineList(objBody: Array<usedMedicine>) {
    return this.http
      .post<Array<usedMedicine>>(API.CREATE_USED_MEDICINE_LIST, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Tạo mới một kết hoạch
   * @param objBody 
   */
  createSchedule(objBody: schedule) {
    return this.http
      .post<schedule>(API.CREATE_SCHEDULE, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Cập nhật một kế hoạch
   * @param objBody 
   */
  updateSchedule(objBody: schedule) {
    return this.http  
      .put<schedule>(API.UPDATE_SCHEDULE, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Xóa một kế hoạch
   * @param objBody 
   */
  removeSchedule(objBody: schedule) {
    const options = {
      headers: new HttpHeaders(),
      body: objBody
    };
    return this.http
      .delete(API.DELETE_SCHEDULE, options)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Gửi mail nhắc nhở schedule
   * @param email 
   * @param scheduleId 
   */
  sendMailToEmployee(email: string, scheduleId) {
    return this.http
      .get(API.SEND_EMAIL + email + '/' + scheduleId)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }
}
