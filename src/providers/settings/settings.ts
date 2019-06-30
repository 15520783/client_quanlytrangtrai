import { API, CONFIG, KEY } from '../../common/const';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { breedingType, breeds, customerGroups, customerType, customers, diseases, farmTypes, foodType, foodUnits, foods, footType, gentialType, healthStatus, issues, matingRole, medicineType, medicineUnits, medicines, partners, permission, pregnancyStatus, regencies, rolepermission, roles, status, warehouse_type } from '../../common/entity';

import { Events } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Utils } from '../../common/utils';

export class setting {
  pregnancyStatus: Array<pregnancyStatus> = [];
  breeds: Array<breeds> = [];
  breedingType: Array<breedingType> = [];
  healthStatus: Array<healthStatus> = [];
  diseases: Array<diseases> = [];
  farmTypes: Array<farmTypes> = [];
  foodType: Array<foodType> = [];
  foodUnits: Array<foodUnits> = [];
  foods: Array<foods> = [];
  medicineType: Array<medicineType> = [];
  medicineUnits: Array<medicineUnits> = [];
  medicines: Array<medicines> = [];
  footType: Array<footType> = [];
  gentialType: Array<gentialType> = [];
  issues: Array<issues> = [];
  regencies: Array<regencies> = [];
  roles: Array<roles> = [];
  status: Array<status> = [];
  matingRoles: Array<matingRole> = [];
  warehouseTypes: Array<warehouse_type> = [];
  customers: Array<customers> = [];
  partners: Array<partners> = [];
  customerTypes: Array<customerType> = [];
  customerGroups: Array<customerGroups> = [];
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
      .then((data) => {
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
            })
        }
      })
      .catch((err) => {
        this.util.showToast('Danh sách thiết lập chưa được cập nhật. Vui lòng kiểm tra kết nối.');
        console.log('err_setting_provider', err);
        this.util.getKey(KEY.SETTINGS)
          .then((data: setting) => {
            this.setting = data;
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


  createNewPregnancyStatus(objBody: pregnancyStatus) {
    return this.http.post(API.CREATE_PREGNANCY_STATUS, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  deletePregnancyStatus(objBody: pregnancyStatus) {
    const options = {
      headers: new HttpHeaders(),
      body: objBody
    };
    return this.http.delete(API.DELETE_PREGNANCY_STATUS, options)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  updatePregnancyStatus(objBody: pregnancyStatus) {
    return this.http.put(API.UPDATE_PREGNANCY_STATUS, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }


  createNewBreed(objBody: breeds) {
    return this.http
      .post(API.CREATE_BREED, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  deleteBreed(objBody: breeds) {
    const options = {
      headers: new HttpHeaders(),
      body: objBody
    };
    return this.http.delete(API.DELETE_BREED, options)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  updateBreed(objBody: breeds) {
    return this.http.put(API.UPDATE_BREED, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  createMatingRole(objBody){
    return this.http.post(API.CREATE_MATING_ROLE,objBody)
    .timeout(CONFIG.DEFAULT_TIMEOUT)
    .toPromise();
  }

  updateMatingRole(objBody){
    return this.http.put(API.UPDATE_MATING_ROLE,objBody)
    .timeout(CONFIG.DEFAULT_TIMEOUT)
    .toPromise();
  }

  deleteMatingRole(objBody){
    const options = {
      headers: new HttpHeaders(),
      body: objBody
    };
    return this.http.delete(API.DELETE_MATING_ROLE, options)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  createNewBreedingType(objBody: breedingType) {
    return this.http
      .post(API.CREATE_BREEDING_TYPE, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  deleteBreedingType(objBody: breedingType) {
    const options = {
      headers: new HttpHeaders(),
      body: objBody
    };
    return this.http.delete(API.CREATE_BREEDING_TYPE, options)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  updateBreedingType(objBody: breedingType) {
    return this.http.put(API.CREATE_BREEDING_TYPE, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  createNewPigStatus(objBody: status) {
    return this.http.post(API.CREATE_PIG_STATUS, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  deletePigStatus(objBody: status) {
    const options = {
      headers: new HttpHeaders(),
      body: objBody
    };
    return this.http.delete(API.DELETE_PIG_STATUS, options)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  updatePigStatus(objBody: status) {
    return this.http.put(API.UPDATE_PIG_STATUS, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Tạo mới một triệu chứng lâm sàn
   * @param objBody 
   */
  createNewIssue(objBody) {
    return this.http.post(API.CREATE_ISSUE, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Cập nhật triệu chứng lâm sàn
   * @param objBody 
   */
  updateIssue(objBody) {
    return this.http.put(API.UPDATE_ISSUE, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Xóa triệu chứng lâm sàn
   * @param objBody 
   */
  delelteIssue(objBody){
    const options = {
      headers: new HttpHeaders(),
      body: objBody
    };
    return this.http.delete(API.DELETE_ISSUE, options)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Tạo mới bệnh
   * @param objBody 
   */
  createNewDisease(objBody: diseases) {
    return this.http
      .post(API.CREATE_DISEASE, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Cập nhật bệnh
   * @param objBody 
   */
  updateDisease(objBody) {
    return this.http
      .put(API.UPDATE_DISEASE, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Xóa bệnh
   * @param objBody 
   */
  deleteDisease(objBody) {
    const options = {
      headers: new HttpHeaders(),
      body: objBody
    };
    return this.http.delete(API.DELETE_DISEASE, options)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Thêm mới loại khách hàng
   * @param objBody 
   */
  createNewCustomerType(objBody) {
    return this.http.post(API.CREATE_CUSTOMER_TYPE, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Cập nhật loại khách hàng
   * @param objBody 
   */
  updateCustomerType(objBody) {
    return this.http.put(API.UPDATE_CUSTOMER_TYPE, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Xóa loại khách hàng
   * @param objBody 
   */
  deleteCustomerType(objBody) {
    const options = {
      headers: new HttpHeaders(),
      body: objBody
    };
    return this.http.delete(API.DELETE_CUSTOMER_TYPE, options)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Tạo mới nhóm khách hàng
   * @param objBody 
   */
  createCustomerGroup(objBody) {
    return this.http.post(API.CREATE_CUSTOMER_GROUP, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Cập nhật nhóm khách hàng
   * @param objBody 
   */
  updateCustomerGroup(objBody) {
    return this.http.put(API.UPDATE_CUSTOMER_GROUP, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Xóa nhóm khách hàng
   * @param objBody 
   */
  deleteCustomerGroup(objBody) {
    const options = {
      headers: new HttpHeaders(),
      body: objBody
    };
    return this.http.delete(API.DELETE_CUSTOMER_GROUP, options)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Thêm mới khách hàng
   * @param objBody 
   */
  createNewCustomer(objBody) {
    return this.http.post(API.CREATE_CUSTOMER, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Cập nhật khách hàng
   * @param objBody 
   */
  updateCustomer(objBody) {
    return this.http.put(API.UPDATE_CUSTOMER, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Xóa khách hàng
   */
  deleteCustomer(objBody) {
    const options = {
      headers: new HttpHeaders(),
      body: objBody
    };
    return this.http.delete(API.DELETE_CUSTOMER, options)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Tạo mới đối tác
   * @param objBody 
   */
  createNewPartner(objBody) {
    return this.http.post(API.CREATE_PARTNER, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Cập nhật đối tác
   * @param objBody 
   */
  updatePartner(objBody) {
    return this.http.put(API.UPDATE_PARTNER, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Xóa đối tác
   * @param objBody 
   */
  deletePartner(objBody) {
    const options = {
      headers: new HttpHeaders(),
      body: objBody
    };
    return this.http.delete(API.DELETE_PARTNER, options)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Tạo mới trạng thái sức khỏe heo
   * @param objBody 
   */
  createNewHealthStatus(objBody) {
    return this.http.post(API.CREATE_HEALTH_STATUS, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Cập nhật trạng thái sức khỏe của heo
   * @param objBody 
   */
  updateHeathStatus(objBody) {
    return this.http.put(API.UPDATE_HEALTH_STATUS, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Xóa trạng thái sức khỏe của heo
   * @param objBody 
   */
  deleteHealthStatus(objBody) {
    const options = {
      headers: new HttpHeaders(),
      body: objBody
    };
    return this.http.delete(API.DELETE_HEALTH_STATUS, options)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Tạo mới loại trang trại
   * @param objBody 
   */
  createNewFarmType(objBody) {
    return this.http.post(API.CREATE_FARM_TYPE, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Cập nhật loại trang trại
   * @param objBody 
   */
  updateFarmType(objBody) {
    return this.http.put(API.UPDATE_FARM_TYPE, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Xóa loại trang trại
   * @param objBody 
   */
  deleteFarmType(objBody) {
    const options = {
      headers: new HttpHeaders(),
      body: objBody
    };
    return this.http.delete(API.DELELE_FARM_TYPE, options)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Tạo mới loại cám
   * @param objBody 
   */
  createNewFoodType(objBody) {
    return this.http.post(API.CREATE_FOOD_TYPE, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Cập nhật loại cám
   * @param objBody 
   */
  updateFoodType(objBody) {
    return this.http.put(API.CREATE_FOOD_TYPE, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Xóa loại cám
   * @param objBody 
   */
  deleteFoodType(objBody) {
    const options = {
      headers: new HttpHeaders(),
      body: objBody
    };
    return this.http.delete(API.DELETE_FOOD_TYPE, options)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Tạo mới đơn vị cám
   * @param objBody 
   */
  createNewFoodUnit(objBody) {
    return this.http.post(API.CREATE_FOOD_UNIT, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Cập nhật đơn vị cám
   * @param objBody 
   */
  updateFoodUnit(objBody) {
    return this.http.put(API.UPDATE_FOOD_UNIT, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Xóa đơn vị cám
   * @param objBody 
   */
  deleteFoodUnit(objBody) {
    const options = {
      headers: new HttpHeaders(),
      body: objBody
    };
    return this.http.delete(API.DELETE_FOOD_UNIT, options)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Tạo mới cám
   * @param objBody 
   */
  createNewFood(objBody) {
    return this.http.post(API.CREATE_FOOD, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Cập nhật cám
   * @param objBody 
   */
  updateFood(objBody) {
    return this.http.put(API.UPDATE_FOOD, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Xóa cám
   * @param objBody 
   */
  deleteFood(objBody) {
    const options = {
      headers: new HttpHeaders(),
      body: objBody
    };
    return this.http.delete(API.DELETE_FOOD, options)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Tạo mới loại thuốc
   * @param objBody 
   */
  createNewMedicineType(objBody) {
    return this.http.post(API.CREATE_MEDICINE_TYPE, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Cập nhật loại thuốc
   * @param objBody 
   */
  updateMedicineType(objBody) {
    return this.http.put(API.UPDATE_MEDICINE_TYPE, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Xóa loại thuốc
   * @param objBody 
   */
  deleteMedicineType(objBody) {
    const options = {
      headers: new HttpHeaders(),
      body: objBody
    };
    return this.http.delete(API.DELETE_MEDICINE_TYPE, options)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Tạo mới đơn vị thuốc
   * @param objBody 
   */
  createNewMedicineUnit(objBody) {
    return this.http.post(API.CREATE_MEDICINE_UNIT, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Cập nhật đơn vị thuốc
   * @param objBody 
   */
  updateMedicineUnit(objBody) {
    return this.http.put(API.UPDATE_MEDICINE_UNIT, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Xóa đơn vị thuốc
   * @param objBody 
   */
  deleteMedicineUnit(objBody) {
    const options = {
      headers: new HttpHeaders(),
      body: objBody
    };
    return this.http.delete(API.DELETE_MEDICINE_UNIT, options)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Tạo mới thuốc
   * @param objBody 
   */
  createNewMedicine(objBody) {
    return this.http.post(API.CREATE_MEDICINE, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Cập nhật thuốc
   * @param objBody 
   */
  updateMedicne(objBody) {
    return this.http.put(API.UPDATE_MEDICINE, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Xóa thuốc
   * @param objBody 
   */
  deleteMedicine(objBody) {
    const options = {
      headers: new HttpHeaders(),
      body: objBody
    };
    return this.http.delete(API.DELETE_MEDICINE, options)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  createNewGentialType(objBody) {
    return this.http.post(API.CREATE_GENTIAL_TYPE, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  updateGentialType(objBody) {
    return this.http.put(API.UPDATE_GENTIAL_TYPE, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  deleteGentialType(objBody) {
    const options = {
      headers: new HttpHeaders(),
      body: objBody
    };
    return this.http.delete(API.DELETE_GENTIAL_TYPE, options)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Tạo mới loại chân
   * @param objBody 
   */
  createNewFootType(objBody) {
    return this.http.post(API.CREATE_FOOT_TYPE, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Cập nhật loại chân
   * @param objBody 
   */
  updateFootType(objBody) {
    return this.http.put(API.UPDATE_FOOT_TYPE, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Xóa loại chân
   * @param objBody 
   */
  deleteFootType(objBody) {
    const options = {
      headers: new HttpHeaders(),
      body: objBody
    };
    return this.http.delete(API.DELETE_FOOT_TYPE, options)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  createNewWarehouseType(objBody) {
    return this.http.post(API.CREATE_WAREHOUSE_TYPE, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  updateWarehouseType(objBody) {
    return this.http.put(API.UPDATE_WAREHOUSE_TYPE, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  deleteWarehouseType(objBody) {
    const options = {
      headers: new HttpHeaders(),
      body: objBody
    };
    return this.http.delete(API.DELETE_WAREHOUSE_TYPE, options)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Lấy danh sách gợi ý bệnh
   * @param farmId 
   * @param sectionId 
   */
  getForecastedDiseases(farmId: string, sectionId: string) {
    return this.http
      .get<Array<{ disease: diseases, tiLe: number }>>(API.GET_FORECASTED_DISEASES + '/' + farmId + '/' + sectionId)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Lấy danh sách thuốc gợi ý của bệnh
   * @param diseaseId 
   */
  getMedicineOfDiseases(diseaseId) {
    return this.http
      .get<Array<medicines>>(API.GET_MEDICINES_OF_DISEASE + '/' + diseaseId)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Tạo mới chức vụ
   * @param objBody 
   */
  createNewRegency(objBody){
    return this.http.post(API.CREATE_REGENCY,objBody)
    .timeout(CONFIG.DEFAULT_TIMEOUT)
    .toPromise();
  }

  /**
   * Cập nhật chức vụ
   * @param objBody 
   */
  updateRegency(objBody){
    return this.http.put(API.UPDATE_REGENCY,objBody)
    .timeout(CONFIG.DEFAULT_TIMEOUT)
    .toPromise();
  }

  /**
   * Xóa chức vụ
   * @param objBody 
   */
  deleteRegency(objBody){
    const options = {
      headers: new HttpHeaders(),
      body: objBody
    };
    return this.http.delete(API.DELETE_REGENCY, options)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Tạo mới phân quyền
   * @param objBody 
   */
  createNewRole(objBody){
    return this.http.post(API.CREATE_ROLE,objBody)
    .timeout(CONFIG.DEFAULT_TIMEOUT)
    .toPromise();
  }

  /**
   * Cập nhật phân quyền
   * @param objBody 
   */
  updateRole(objBody){
    return this.http.put(API.UPDATE_ROLE,objBody)
    .timeout(CONFIG.DEFAULT_TIMEOUT)
    .toPromise();
  }

  /**
   * Xóa phân quyền
   * @param objBody 
   */
  deleteRole(objBody){
    const options = {
      headers: new HttpHeaders(),
      body: objBody
    };
    return this.http.delete(API.DELETE_ROLE, options)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Lấy danh sách quyền của role
   * @param roleId 
   */
  getPermissionOfRole(roleId: string) {
    return this.http
      .get<Array<permission>>(API.GET_PERMISSION_OF_ROLE + roleId)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Cập nhật phân quyền
   * @param objBody 
   */
  updateRolePermission(objBody: Array<rolepermission>) {
    return this.http
      .put<Array<rolepermission>>(API.UPDATE_ROLE_PERMISSION, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }
}