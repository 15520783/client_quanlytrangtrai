import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HousesProvider } from '../houses/houses';
import { PigsProvider } from '../pigs/pigs';
import { FarmsProvider } from '../farms/farms';
import { PartnerProvider } from '../partner/partner';
import { EmployeesProvider } from '../employees/employees';
import { SectionsProvider } from '../sections/sections';
import { SettingsProvider } from '../settings/settings';


@Injectable()
export class DeployDataProvider {

  constructor(
    public http: HttpClient,
    public houseProvider: HousesProvider,
    public pigsProvider: PigsProvider,
    public farmProvider: FarmsProvider,
    public partnerProvider: PartnerProvider,
    public employeeProvider: EmployeesProvider,
    public sectionProvider: SectionsProvider,
    public settingProvider:SettingsProvider
  ) {
  }

  /**
   * Lấy danh sách heo nọc trong trang trại
   * @param farmId 
   */
  get_male_pig_of_farm(farmId) {
    let housesId: any = [];
    this.houseProvider.houses.filter((house) => {
      return (house.section.farm.id == farmId && house.section.typeId !== "6" && house.section.typeId !== "7") ? true : false;
    }).forEach((house) => {
      housesId.push(house.id);
    })
    return this.pigsProvider.pigs.filter((pig) => {
      return (housesId.includes(pig.houseId) && pig.gender == 1) ? true : false;
    })
  }

  /**
   * Lấy danh sách heo nái trong trang trại
   * @param farmId 
   */
  get_female_pig_of_farm(farmId) {
    let housesId: any = [];
    this.houseProvider.houses.filter((house) => {
      return (house.section.farm.id == farmId && house.section.typeId !== "6" && house.section.typeId !== "7") ? true : false;
    }).forEach((house) => {
      housesId.push(house.id);
    })
    return this.pigsProvider.pigs.filter((pig) => {
      return (housesId.includes(pig.houseId) && pig.gender == 2) ? true : false;
    })
  }

  /**
   *  Lấy danh sách trang trại cho ion-select
   */
  get_farm_list_for_select() {
    let options_select = [];
    this.farmProvider.farms.forEach(farm => {
      options_select.push({
        name: farm.name,
        value: farm.id
      })
    })
    return options_select;
  }


  /**
   *  Lấy danh sách khu cho ion-select
   */
  get_section_list_for_select() {
    let options_select = [];
    this.sectionProvider.sections.forEach(section => {
      options_select.push({
        name: section.name,
        value: section.id
      })
    })
    return options_select;
  }

  /**
   *  Lấy danh sach đối tác cho ion-select
   */
  get_partner_list_for_select() {
    let options_select = [];
    this.partnerProvider.partners.forEach(partner => {
      options_select.push({
        name: partner.name,
        value: partner.id
      })
    })
    return options_select;
  }

  /**
   * Lấy trạng trại bằng Id
   * @param farmId 
   */
  get_farm_by_id(farmId: string) {
    return this.farmProvider.farms.filter((farm) => {
      return farm.id == farmId ? true : false;
    })[0];
  }

  /**
   * Lấy danh sách khu của 1 trang trại
   * @param farmId 
   */
  get_sections_of_farm(farmId: string) {
    return this.sectionProvider.sections.filter((section) => {
      return section.farm.id == farmId ? true : false;
    })
  }

  /**
   * Láy danh sách nhà của 1 khu
   * @param sectionId 
   */
  get_houses_of_section(sectionId: string) {
    return this.houseProvider.houses.filter((house) => {
      return house.section.id == sectionId ? true : false;
    })
  }

  /**
   * Lấy đối tác bằng Id
   * @param partnerId 
   */
  get_partner_by_id(partnerId: string) {
    return this.partnerProvider.partners.filter((partner) => {
      return partner.id == partnerId ? true : false;
    })[0];
  }

  /**
   * Lấy nhân viên bằng Id
   * @param empId 
   */
  get_employee_by_id(empId: string) {
    return this.employeeProvider.employees.filter((emp) => {
      return emp.id == empId ? true : false;
    })[0];
  }

  /**
   * Lấy các đối tượng đối tác với Object key  là id
   */
  get_object_list_key_of_partner() {
    let partners = {};
    this.partnerProvider.partners.forEach((partner) => {
      partners[partner.id] = partner;
    })
    return partners;
  }

  /**
   * Lấy các đối tượng trang trại với Object key  là id
   */
  get_object_list_key_of_farm() {
    let farms = {};
    this.farmProvider.farms.forEach((farm) => {
      farms[farm.id] = farm;
    })
    return farms;
  }

  /**
   * Lấy thông tin nhà thông qua id
   * @param houseId 
   */
  get_house_by_id(houseId) {
    return this.houseProvider.houses.filter((house) => {
      return house.id == houseId ? true : false;
    })[0];
  }

  /**
   * Lấy thông tin giống thông qua id
   * @param breedId 
   */
  get_breed_by_id(breedId){
    return this.settingProvider.setting.breeds.filter((breed)=>{
      return breed.id == breedId ? true:false;
    })[0];
  }

  /**
   * Lấy thông tin loại chân thông qua id
   * @param footId 
   */
  get_foot_by_id(footId){
    return this.settingProvider.setting.footType.filter((foot)=>{
      return foot.id == footId ? true:false;
    })[0];
  }

  /**
   * Lấy thông tin trạng thái sức khỏe thông qua id
   * @param healStatusId 
   */
  get_healthstatus_by_id(healStatusId){
    return this.settingProvider.setting.healthStatus.filter((healthStatus)=>{
      return healthStatus.id == healStatusId ? true:false;
    })[0];
  }

  /**
   * Lấy thông tin trạng thái mang thai thông qua id
   * @param pregnancyStatusId 
   */
  get_pregnancystatus_by_id(pregnancyStatusId){
    return this.settingProvider.setting.pregnancyStatus.filter((pregnancyStatus)=>{
      return pregnancyStatus.id == pregnancyStatusId ? true:false;
    })[0];
  }

  /**
   * Lấy thông tin sản phẩm thông qua id
   * @param pregnancyStatusId 
   */
  get_pricecode_by_id(priceCodeId){
    return this.settingProvider.setting.priceCodes.filter((priceCode)=>{
      return priceCode.id == priceCodeId ? true:false;
    })[0];
  }
}
