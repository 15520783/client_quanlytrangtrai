import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HousesProvider } from '../houses/houses';
import { PigsProvider } from '../pigs/pigs';
import { FarmsProvider } from '../farms/farms';
import { PartnerProvider } from '../partner/partner';
import { EmployeesProvider } from '../employees/employees';


@Injectable()
export class DeployDataProvider {

  constructor(
    public http: HttpClient,
    public houseProvider: HousesProvider,
    public pigsProvider: PigsProvider,
    public farmProvider: FarmsProvider,
    public partnerProvider: PartnerProvider,
    public employeeProvider:EmployeesProvider
  ) {
  }

  /**
   * Lấy danh sách heo nọc trong trang trại
   * @param farmId 
   */
  get_male_pig_of_farm(farmId) {
    let housesId:any = [];
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
    let housesId:any = [];
    this.houseProvider.houses.filter((house) => {
      return (house.section.farm.id == farmId && house.section.typeId !== "6" && house.section.typeId !== "7") ? true : false;
    }).forEach((house) => {
      housesId.push(house.id);
    })
    return this.pigsProvider.pigs.filter((pig) => {
      return (housesId.includes(pig.houseId)  && pig.gender == 2) ? true : false;
    })
  }

  get_child_pig_of_farm(farmId){
    
  }

  /**
   *  Lấy danh sách trang trại cho ion-select
   */
  get_farm_list_for_select(){
    let options_select = [];
    this.farmProvider.farms.forEach(farm =>{
      options_select.push({
        name:farm.name,
        value:farm.id
      })
    })
    return options_select;
  }

  /**
   *  Lấy danh sach đối tác cho ion-select
   */
  get_partner_list_for_select(){
    let options_select = [];
    this.partnerProvider.partners.forEach(partner =>{
      options_select.push({
        name:partner.name,
        value:partner.id
      })
    })
    return options_select;
  }

  /**
   * Lấy trạng trại bằng Id
   * @param farmId 
   */
  get_farm_by_id(farmId:string){
    return this.farmProvider.farms.filter((farm)=>{
      return farm.id == farmId ? true:false;
    })[0];
  }

  /**
   * Lấy đối tác bằng Id
   * @param partnerId 
   */
  get_partner_by_id(partnerId:string){
    return this.partnerProvider.partners.filter((partner)=>{
      return partner.id == partnerId ? true:false;
    })[0];
  }

  /**
   * Lấy nhân viên bằng Id
   * @param empId 
   */
  get_employee_by_id(empId:string){
    return this.employeeProvider.employees.filter((emp)=>{
      return emp.id == empId ? true:false;
    })[0];
  }

}
