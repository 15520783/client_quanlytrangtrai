import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HousesProvider } from '../houses/houses';
import { PigsProvider } from '../pigs/pigs';
import { FarmsProvider } from '../farms/farms';
import { PartnerProvider } from '../partner/partner';
import { EmployeesProvider } from '../employees/employees';
import { SectionsProvider } from '../sections/sections';
import { SettingsProvider } from '../settings/settings';
import { pig, house, foodWareHouse, medicineWarehouse, section, status } from '../../common/entity';
import { WarehousesProvider } from '../warehouses/warehouses';


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
    public settingProvider: SettingsProvider,
    public warehouseProvider: WarehousesProvider
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
   *  Lấy danh sách nhà cho ion-select
   */
  get_house_list_for_select() {
    let options_select = [];
    this.houseProvider.houses.forEach(house => {
      options_select.push({
        name: house.name,
        value: house.id
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
   *  Lấy danh sách cám cho ion-select
   */
  get_food_list_for_select() {
    let food_select = [];
    this.settingProvider.setting.foods.forEach(food => {
      food_select.push({
        name: food.name,
        value: food.id
      })
    })
    return food_select;
  }

  /**
   * Lấy danh sách thuốc cho ion-select
   */
  get_medicine_list_for_select() {
    let medicine_select = [];
    this.settingProvider.setting.medicines.forEach(medicine => {
      medicine_select.push({
        name: medicine.name,
        value: medicine.id
      })
    })
    return medicine_select;
  }

  /**
   * Lấy danh sách đơn vị thuốc cho ion-select
   */
  get_medicineUnit_list_for_select() {
    let medicineUnit_select = [];
    this.settingProvider.setting.medicineUnits.forEach(unit => {
      medicineUnit_select.push({
        name: unit.name,
        value: unit.id
      })
    })
    return medicineUnit_select;
  }

  /**
   * Lấy danh sách đơn vị cám cho ion-select
   */
  get_foodUnit_list_for_select() {
    let foodUnit_select = [];
    this.settingProvider.setting.foodUnits.forEach(unit => {
      foodUnit_select.push({
        name: unit.name,
        value: unit.id
      })
    })
    return foodUnit_select;
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
   * Lấy các đối tượng heo với Object key  là id
   */
  get_object_list_key_of_pig() {
    let pigs = {};
    this.pigsProvider.pigs.forEach((pig) => {
      pigs[pig.id] = pig;
    })
    return pigs;
  }

  /**
   * Lấy các đối tượng nhà với Object key  là id
   */
  get_object_list_key_of_house() {
    let houses = {};
    this.houseProvider.houses.forEach((house) => {
      houses[house.id] = house;
    })
    return houses;
  }

  /**
   * Lấy các đối tượng BPSD với Object key  là id
   */
  get_object_list_key_of_gential() {
    let gentials = {};
    this.settingProvider.setting.gentialType.forEach((gential) => {
      gentials[gential.id] = gential;
    })
    return gentials;
  }

  /**
   * Lấy các đối tượng loại chân với Object key  là id
   */
  get_object_list_key_of_foot() {
    let foots = {};
    this.settingProvider.setting.footType.forEach((foot) => {
      foots[foot.id] = foot;
    })
    return foots;
  }

  /**
   * Lấy các đối tượng tình trạng sức khỏe với Object key  là id
   */
  get_object_list_key_of_healthStatus() {
    let healthStatus = {};
    this.settingProvider.setting.healthStatus.forEach((health) => {
      healthStatus[health.id] = health;
    })
    return healthStatus;
  }

  /**
   * Lấy các đối tượng giống với Object key  là id
   */
  get_object_list_key_of_breeds() {
    let breeds = {};
    this.settingProvider.setting.breeds.forEach((breed) => {
      breeds[breed.id] = breed;
    })
    return breeds;
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
  get_breed_by_id(breedId) {
    return this.settingProvider.setting.breeds.filter((breed) => {
      return breed.id == breedId ? true : false;
    })[0];
  }

  /**
   * Lấy thông tin loại chân thông qua id
   * @param footId 
   */
  get_foot_by_id(footId) {
    return this.settingProvider.setting.footType.filter((foot) => {
      return foot.id == footId ? true : false;
    })[0];
  }

  /**
   * Lấy thông tin trạng thái sức khỏe thông qua id
   * @param healStatusId 
   */
  get_healthstatus_by_id(healStatusId) {
    return this.settingProvider.setting.healthStatus.filter((healthStatus) => {
      return healthStatus.id == healStatusId ? true : false;
    })[0];
  }

  /**
   * Lấy thông tin trạng thái mang thai thông qua id
   * @param pregnancyStatusId 
   */
  get_pregnancystatus_by_id(pregnancyStatusId) {
    return this.settingProvider.setting.pregnancyStatus.filter((pregnancyStatus) => {
      return pregnancyStatus.id == pregnancyStatusId ? true : false;
    })[0];
  }

  /**
   * Lấy thông tin sản phẩm thông qua id
   * @param pregnancyStatusId 
   */
  get_pricecode_by_id(priceCodeId) {
    return this.settingProvider.setting.priceCodes.filter((priceCode) => {
      return priceCode.id == priceCodeId ? true : false;
    })[0];
  }

  /**
   * Lấy thông tin loại BPSD thông qua id
   * @param gentialTypeId 
   */
  get_gentialtype_by_id(gentialTypeId) {
    return this.settingProvider.setting.gentialType.filter((gential) => {
      return gential.id == gentialTypeId ? true : false;
    })[0];
  }

  /**
   * Lấy thông tin trạng thái của heo
   * @param statusId 
   */
  get_status_by_id(statusId) {
    return this.settingProvider.setting.status.filter((status) => {
      return status.id == statusId ? true : false;
    })[0];
  }

  /**
   * Lấy thông tin nhà kho thông qua id
   * @param warehouseId 
   */
  get_warehouse_by_id(warehouseId: string) {
    let idx = this.warehouseProvider.warehouses.findIndex(warehouse => warehouse.id == warehouseId);
    if (idx > -1)
      return this.warehouseProvider.warehouses[idx];
    else return null;
  }

  /**
   * Lấy thông tin cám thông qua id
   * @param foodId 
   */
  get_food_by_id(foodId: string) {
    let idx = this.settingProvider.setting.foods.findIndex(food => food.id == foodId);
    if (idx > -1)
      return this.settingProvider.setting.foods[idx];
    else return null;
  }

  /**
   * Lấy thông tin thuốc thông qua id
   * @param medicineId 
   */
  get_medicine_by_id(medicineId: string) {
    let idx = this.settingProvider.setting.medicines.findIndex(medicine => medicine.id == medicineId);
    if (idx > -1)
      return this.settingProvider.setting.medicines[idx];
    else return null;
  }

  /**
   * Lấy thông tin đơn vị thuốc thông qua id
   * @param unitId 
   */
  get_medicineUnit_by_id(unitId: string) {
    let idx = this.settingProvider.setting.medicineUnits.findIndex(unit => unit.id == unitId);
    if (idx > -1)
      return this.settingProvider.setting.medicineUnits[idx];
    else return null;
  }

  /**
   * Lấy thông tin đơn vị cám thông qua id
   * @param unitId 
   */
  get_foodUnit_by_id(unitId: string) {
    let idx = this.settingProvider.setting.foodUnits.findIndex(unit => unit.id == unitId);
    if (idx > -1)
      return this.settingProvider.setting.foodUnits[idx];
    else return null;
  }

  get_parent_of_pig(target: pig) {
    let result: any = {};
    result['father'] = this.pigsProvider.pigs.filter((pig) => {
      return target.originFather == pig.pigCode ? true : false;
    })[0];
    result['mother'] = this.pigsProvider.pigs.filter((pig) => {
      return target.originMother == pig.pigCode ? true : false;
    })[0];
    console.log(result);
    return result;
  }

  /**
   * Lấy thông tin heo thông qua id
   * @param pigId 
   */
  get_pig_by_id(pigId: string) {
    let pig = this.pigsProvider.pigs.filter((pig) => {
      return pig.id == pigId ? true : false;
    })[0];

    return pig;
  }

  /**
   * Lấy Object chuẩn của heo  để thực hiện gửi request
   * @param pig 
   */
  get_pig_object_to_send_request(pig: pig) {
    pig['house'] = this.get_house_by_id(pig.houseId);
    pig['round'] = { id: 0 };
    pig['breed'] = this.get_breed_by_id(pig.breedId);
    pig['foot'] = this.get_foot_by_id(pig.footTypeId);
    pig['healthStatus'] = this.get_healthstatus_by_id(pig.healthStatusId);
    pig['pregnancyStatus'] = this.get_pregnancystatus_by_id(pig.pregnancyStatusId);
    pig['priceCode'] = this.get_pricecode_by_id(pig.priceCodeId);
    pig['gentialType'] = this.get_gentialtype_by_id(pig.gentialTypeId);
    pig['status'] = this.get_status_by_id(pig.statusId);
    let father = this.get_pig_by_id(pig.originFatherId);
    let mother = this.get_pig_by_id(pig.originMotherId);
    pig.originFather = father ? father.pigCode : '';
    pig.originMother = mother ? mother.pigCode : '';
    return pig;
  }

  /**
   * Lấy Object chuẩn của foodWarehouse  để thực hiện gửi request
   * @param pifoodWarehouseg 
   */
  get_foodWarehouse_object_to_send_request(foodWarehouse: foodWareHouse) {
    foodWarehouse.warehouse = this.get_warehouse_by_id(foodWarehouse.warehouse_id);
    foodWarehouse.food = this.get_food_by_id(foodWarehouse.food_id);
    foodWarehouse.unit = this.get_foodUnit_by_id(foodWarehouse.unit_id);
    return foodWarehouse;
  }

  /**
   * Lấy Object chuẩn của medicineWarehouse  để thực hiện gửi request
   * @param medicineWarehouse 
   */
  get_medicine_object_to_send_request(medicineWarehouse: medicineWarehouse) {
    medicineWarehouse.warehouse = this.get_warehouse_by_id(medicineWarehouse.warehouse_id);
    medicineWarehouse.medicine = this.get_medicine_by_id(medicineWarehouse.medicine_id);
    medicineWarehouse.unit = this.get_medicineUnit_by_id(medicineWarehouse.unit_id);
    return medicineWarehouse;
  }

  /**
   * Lấy danh sach kho cám của 1 trang trại
   * @param farmId 
   */
  get_food_warehouse_of_farm(farmId: string) {
    return this.warehouseProvider.warehouses.filter((warehouse) => {
      return (warehouse.manager.farm.id == farmId && warehouse.type.id == "1") ? true : false;
    })
  }

  /**
   * Lấy danh sách kho thuốc của 1 trang trại
   * @param farmId 
   */
  get_medicine_warehouse_of_farm(farmId: string) {
    return this.warehouseProvider.warehouses.filter((warehouse) => {
      return (warehouse.manager.farm.id == farmId && warehouse.type.id == "2") ? true : false;
    })
  }



  /**
   * Lấy danh dách heo thuộc chuồng heo
   * @param houseId 
   */
  get_pigs_of_house(houseId: string) {
    return this.pigsProvider.pigs.filter((pig) => {
      return pig.houseId == houseId ? true : false;
    })
  }


  /**
   * Lấy danh sách heo thuộc khu
   * @param sectionTypeId 
   */
  get_pigs_of_section(sectionTypeId: string) {
    let housesId: any = [];
    this.houseProvider.houses.filter((house) => {
      return (house.section.typeId == sectionTypeId) ? true : false;
    }).forEach((house) => {
      housesId.push(house.id);
    })

    return this.pigsProvider.pigs.filter((pig) => {
      return housesId.includes(pig.houseId) ? true : false;
    })
  }

  /**
   * Lấy thông tin heo dựa vào mã heo
   */
  get_pig_by_pig_code(pigCode: string) {
    return this.pigsProvider.pigs.filter((pig) => {
      return pig.pigCode == pigCode ? true : false;
    })[0];
  }

  /**
   * Lấy trạng thái heo chờ bán dựa vào trạng thái hiện tại
   * @param statusId 
   */
  get_status_saleWaiting_of_pig(statusId): status {
    return this.settingProvider.setting.status.filter((status) => {
      return status.previousStatus == statusId ? true : false;
    })[0];
  }
}
