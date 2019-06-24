import { KEY, VARIABLE } from '../../common/const';
import { births, breedings, foodUnits, foodWareHouse, foods, mating, matingRole, medicineUnits, medicineWarehouse, pig, round, sperms, status } from '../../common/entity';

import { EmployeesProvider } from '../employees/employees';
import { FarmsProvider } from '../farms/farms';
import { HousesProvider } from '../houses/houses';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PartnerProvider } from '../partner/partner';
import { PigsProvider } from '../pigs/pigs';
import { SectionsProvider } from '../sections/sections';
import { SettingsProvider } from '../settings/settings';
import { UserProvider } from '../user/user';
import { Utils } from '../../common/utils';
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
    public warehouseProvider: WarehousesProvider,
    public userProvider: UserProvider,
    public util: Utils
  ) {
  }

  /**
   * Lấy danh sách heo nọc trong trang trại
   * @param farmId 
   */
  get_male_pig_of_farm(farmId) {
    let housesId: any = [];
    let maleSection: any = [VARIABLE.SECTION_TYPE[1].value, VARIABLE.SECTION_TYPE[2].value, VARIABLE.SECTION_TYPE[3].value, VARIABLE.SECTION_TYPE[7].value];
    if (this.houseProvider.houses.length) {
      this.houseProvider.houses.filter((house) => {
        return (house.section.farm.id == farmId &&
          maleSection.includes((house.section.typeId).toString())) ? true : false;
      }).forEach((house) => {
        housesId.push(house.id);
      })
    }
    if (housesId.length && this.pigsProvider.pigs && this.pigsProvider.pigs.length) {
      return this.pigsProvider.pigs.filter((pig) => {
        return (housesId.includes(pig.houseId) && (pig.gender == 1 || pig.gender == 3)) ? true : false;
      })
    } else return [];

  }

  /**
   * Lấy danh sách heo nái trong trang trại
   * @param farmId 
   */
  get_female_pig_of_farm(farmId) {
    let houses = this.get_object_list_key_of_house();
    let formalSection: any = [VARIABLE.SECTION_TYPE[1].value, VARIABLE.SECTION_TYPE[3].value, VARIABLE.SECTION_TYPE[4].value, VARIABLE.SECTION_TYPE[7].value];
    let female_pig = [];
    let female_pig_in_formal_section = [];
    let female_pig_in_khu_de = [];
    if (this.pigsProvider.pigs && this.pigsProvider.pigs.length) {
      female_pig_in_formal_section = this.pigsProvider.pigs.filter((pig) => {
        return (houses[pig.houseId] && houses[pig.houseId].section.farm.id == farmId &&
          formalSection.includes((houses[pig.houseId].section.typeId).toString())
          && pig.gender == 2) ? true : false;
      })

      female_pig_in_khu_de = this.pigsProvider.pigs.filter((pig) => {
        return (houses[pig.houseId] && houses[pig.houseId].section.farm.id == farmId &&
          (houses[pig.houseId].section.typeId).toString() == VARIABLE.SECTION_TYPE[5].value
          && pig.statusId != VARIABLE.STATUS_PIG.NEWBORN
          && pig.statusId != VARIABLE.STATUS_PIG.GROWING
          && pig.gender == 2) ? true : false;
      })
    }
    if (female_pig_in_formal_section.length) {
      female_pig.push.apply(female_pig, female_pig_in_formal_section);
    }

    if (female_pig_in_khu_de.length) {
      female_pig.push.apply(female_pig, female_pig_in_khu_de);
    }
    return female_pig;
  }

  /**
   * Lấy danh sách heo con của trang trại
   * @param farmId 
   */
  get_child_pig_in_farm(farmId: string) {
    let houses = this.get_object_list_key_of_house();
    let formalSection: any = [VARIABLE.SECTION_TYPE[6].value];
    let child_pig = [];

    let child_pig_in_formal_section = [];
    if (this.pigsProvider.pigs) {
      child_pig_in_formal_section = this.pigsProvider.pigs.filter((pig) => {
        return (houses[pig.houseId] && houses[pig.houseId].section.farm.id == farmId &&
          formalSection.includes((houses[pig.houseId].section.typeId).toString())) ? true : false;
      })

      if (child_pig_in_formal_section.length) {
        child_pig.push.apply(child_pig, child_pig_in_formal_section);
      }

      let child_pig_in_khu_de = this.pigsProvider.pigs.filter((pig) => {
        return (houses[pig.houseId] && houses[pig.houseId].section.farm.id == farmId &&
          (houses[pig.houseId].section.typeId).toString() == VARIABLE.SECTION_TYPE[5].value
          && (pig.statusId == VARIABLE.STATUS_PIG.NEWBORN
            || pig.statusId == VARIABLE.STATUS_PIG.GROWING)) ? true : false;
      })

      if (child_pig_in_khu_de.length) {
        child_pig.push.apply(child_pig, child_pig_in_khu_de);
      }
    }
    return child_pig;
  }

  /**
   * Lấy danh sách heo của 1 trang trại
   * @param farmId 
   */
  get_all_pig_of_farm(farmId: string) {
    let houses = this.get_object_list_key_of_house();
    if (this.pigsProvider.pigs) {
      return this.pigsProvider.pigs.filter((pig) => {
        return (houses[pig.houseId] && houses[pig.houseId].section.farm.id == farmId) ? true : false;
      })
    } else {
      return [];
    }
  }

  get_pig_of_section_type(sectionTypeId: string) {
    let houses = this.get_object_list_key_of_house();
    if (this.pigsProvider.pigs) {
      return this.pigsProvider.pigs.filter((pig) => {
        return houses[pig.houseId].section.typeId == sectionTypeId ? true : false;
      })
    } else {
      return [];
    }
  }


  get_all_farm_for_select() {
    let options_select = [];
    if (this.farmProvider.farms) {
      this.farmProvider.farms.forEach(farm => {
        options_select.push({
          name: farm.name,
          value: farm.id
        })
      })
    }
    return options_select;
  }


  /**
   *  Lấy danh sách trang trại cho ion-select
   */
  get_farm_list_for_select() {
    let options_select = [];
    let farms = [];
    if (this.userProvider.user) {
      if (this.userProvider.user.farm.id == '0') {
        farms = this.farmProvider.farms;
      } else {
        if (this.farmProvider.farms) {
          farms = this.farmProvider.farms.filter((farm) => {
            return farm.id == this.userProvider.user.farm.id ? true : false;
          })
        } else return [];
      }
      farms.forEach(farm => {
        options_select.push({
          name: farm.name,
          value: farm.id
        })
      })
    }
    return options_select;
  }

  /**
   *  Lấy danh sách loại trang trại cho ion-select
   */
  get_farm_types_list_for_select() {
    let farm_types = [];
    if (this.settingProvider.setting) {
      this.settingProvider.setting.farmTypes.forEach(farmType => {
        farm_types.push({
          name: farmType.name,
          value: farmType.id
        })
      })
    }
    return farm_types;
  }


  get_summary_pig_of_section(sectionId: string, sectionTypeId: string) {
    let formal_section: any = [
      VARIABLE.SECTION_TYPE[1].value,
      VARIABLE.SECTION_TYPE[2].value,
      VARIABLE.SECTION_TYPE[3].value,
      VARIABLE.SECTION_TYPE[4].value,
      VARIABLE.SECTION_TYPE[7].value
    ]

    let houses_util = this.get_object_list_key_of_house();
    let total_pig = [];
    let female_pig = [];
    let male_pig = [];
    let child_pig = [];
    if (this.pigsProvider.pigs.length) {
      total_pig = this.pigsProvider.pigs.filter((pig) => {
        return houses_util[pig.houseId].section.id == sectionId ? true : false;
      });
      if (total_pig.length) {
        if (formal_section.includes(sectionTypeId.toString())) {
          female_pig = total_pig.filter(pig => {
            return pig.gender == 1 ? true : false;
          });

          male_pig = total_pig.filter(pig => {
            return pig.gender == 2 ? true : false;
          })
        } else if (sectionTypeId == VARIABLE.SECTION_TYPE[5].value) {
          male_pig = total_pig.filter((pig: pig) => {
            return pig.gender == 2
              && pig.statusId != VARIABLE.STATUS_PIG.NEWBORN
              && pig.statusId != VARIABLE.STATUS_PIG.GROWING ? true : false;
          });

          child_pig = total_pig.filter((pig: pig) => {
            return pig.statusId == VARIABLE.STATUS_PIG.NEWBORN
              && pig.statusId == VARIABLE.STATUS_PIG.GROWING ? true : false;
          });
        } else if (sectionTypeId == VARIABLE.SECTION_TYPE[6].value) {
          child_pig = total_pig;
        }
      }
    }

    return { total_pig: total_pig, female_pig: female_pig, male_pig: male_pig, child_pig: child_pig };
  }


  /**
   *  Lấy danh sách khu cho ion-select
   */
  get_section_list_for_select() {
    let options_select = [];
    if (this.sectionProvider.sections) {
      this.sectionProvider.sections.forEach(section => {
        options_select.push({
          name: section.name,
          value: section.id
        })
      })
    }
    return options_select;
  }

  /**
   *  Lấy danh sách nhà cho ion-select
   */
  get_house_list_for_select() {
    let options_select = [];
    if (this.houseProvider.houses) {
      this.houseProvider.houses.forEach(house => {
        options_select.push({
          name: house.name,
          value: house.id
        })
      })
    }
    return options_select;
  }

  /**
   *  Lấy danh sach đối tác cho ion-select
   */
  get_partner_list_for_select() {
    let options_select = [];
    if (this.settingProvider.setting.partners) {
      this.settingProvider.setting.partners.forEach(partner => {
        options_select.push({
          name: partner.name,
          value: partner.id
        })
      })
    }
    return options_select;
  }

  /**
   *  Lấy danh sách khách hàng cho ion-select
   */
  get_customer_list_for_select() {
    let options_select = [];
    if (this.settingProvider.setting) {
      this.settingProvider.setting.customers.forEach(customer => {
        options_select.push({
          name: customer.name,
          value: customer.id
        })
      })
    }
    return options_select;
  }

  /**
  *  Lấy danh sách khách hàng cho ion-select
  */
  get_customer_group_list_for_select() {
    let options_select = [];
    if (this.settingProvider.setting) {
      this.settingProvider.setting.customerGroups.forEach(group => {
        options_select.push({
          name: group.name,
          value: group.id
        })
      })
    }
    return options_select;
  }

  /**
   *  Lấy danh sách loại khách hàng cho ion-select
   */
  get_customer_type_list_for_select() {
    let options_select = [];
    if (this.settingProvider.setting) {
      this.settingProvider.setting.customerTypes.forEach(type => {
        options_select.push({
          name: type.name,
          value: type.id
        })
      })
    }
    return options_select;
  }


  /**
   *  Lấy danh sách cám cho ion-select
   */
  get_food_list_for_select() {
    let food_select = [];
    if (this.settingProvider.setting) {
      this.settingProvider.setting.foods.forEach(food => {
        food_select.push({
          name: food.name,
          value: food.id
        })
      })
    }
    return food_select;
  }

  /**
   *  Lấy danh sách loại cám cho ion-select
   */
  get_food_type_list_for_select() {
    let food_select = [];
    if (this.settingProvider.setting) {
      this.settingProvider.setting.foodType.forEach(type => {
        food_select.push({
          name: type.name,
          value: type.id
        })
      })
    }
    return food_select;
  }

  /**
   * Lấy danh sách thuốc cho ion-select
   */
  get_medicine_list_for_select() {
    let medicine_select = [];
    if (this.settingProvider.setting) {
      this.settingProvider.setting.medicines.forEach(medicine => {
        medicine_select.push({
          name: medicine.name,
          value: medicine.id
        })
      })
    }
    return medicine_select;
  }

  /**
  * Lấy danh sách thuốc cho ion-select
  */
  get_medicine_type_list_for_select() {
    let medicine_type_select = [];
    if (this.settingProvider.setting) {
      this.settingProvider.setting.medicineType.forEach(type => {
        medicine_type_select.push({
          name: type.name,
          value: type.id
        })
      })
    }
    return medicine_type_select;
  }

  /**
   * Lấy danh sách đơn vị thuốc cho ion-select
   */
  get_medicineUnit_list_for_select() {
    let medicineUnit_select = [];
    let unit_util = this.get_object_list_key_of_medicineUnit();
    if (this.settingProvider.setting) {
      let temp = this.util.deepClone(this.settingProvider.setting.medicineUnits);
      temp.forEach((unit: medicineUnits) => {
        medicineUnit_select.push({
          name: unit.id != unit.baseUnit ? unit.name + ' (' + unit.quantity + ' ' + unit_util[unit.baseUnit].name + ')' : unit.name,
          baseUnit: unit.baseUnit,
          quantity: unit.quantity,
          value: unit.id
        })
      })
    }
    return medicineUnit_select;
  }

  /**
   * Lấy danh sách đơn vị cám cho ion-select
   */
  get_foodUnit_list_for_select() {
    let foodUnit_select = [];
    let unit_util = this.get_object_list_key_of_foodUnit();
    if (this.settingProvider.setting) {
      let temp = this.util.deepClone(this.settingProvider.setting.foodUnits);
      temp.forEach((unit: foodUnits) => {
        foodUnit_select.push({
          name: unit.id != unit.baseUnit ? unit.name + ' (' + unit.quantity + ' ' + unit_util[unit.baseUnit].name + ')' : unit.name,
          baseUnit: unit.baseUnit,
          quantity: unit.quantity,
          value: unit.id
        })
      })
      // this.settingProvider.setting.foodUnits.forEach(unit => {
      //   foodUnit_select.push({
      //     name: unit.id == '1' ? unit.name : unit.name + ' ' + unit.quantity + ' kg',
      //     value: unit.id
      //   })
      // })
    }
    return foodUnit_select.sort((a, b) => {
      return a.id > b.id ? 1 : -1
    });
  }


  /**
   * Lấy danh sách loại lên giống cho ion-select
   */
  get_breedingType_list_for_select() {
    let breedingTypes_select = [];
    if (this.settingProvider.setting) {
      this.settingProvider.setting.breedingType.forEach((breedingType) => {
        breedingTypes_select.push({
          name: breedingType.name,
          value: breedingType.id
        })
      })
    }
    return breedingTypes_select;
  }

  /**
   * Lấy danh sách loại kho cho ion-select
   */
  get_warehouse_types_list_for_select() {
    let warehouseTypes_select = [];
    if (this.settingProvider.setting) {
      this.settingProvider.setting.warehouseTypes.forEach((type) => {
        warehouseTypes_select.push({
          name: type.name,
          value: type.id
        })
      })
    }
    return warehouseTypes_select;
  }

  /**
   * Lấy danh sách giống cho ion-select
   */
  get_breed_list_for_select() {
    let breed_select = [];
    if (this.settingProvider.setting) {
      this.settingProvider.setting.breeds.forEach((breed) => {
        breed_select.push({
          name: breed.name + ' ' + breed.symbol,
          value: breed.id
        })
      })
    }
    return breed_select;
  }

  /**
   * Lấy danh sách vấn đề heo cho ion-select
   */
  get_issues_list_for_select() {
    let issues = [];
    if (this.settingProvider.setting) {
      this.settingProvider.setting.issues.forEach((issue) => {
        issues.push({
          name: issue.symptom,
          value: issue.id
        })
      })
    }
    return issues;
  }

  get_statusCode_list_for_select() {
    let statusCode_select = [];
    Object.keys(VARIABLE.STATUS_PIG).forEach((statusKey) => {
      statusCode_select.push({
        name: statusKey,
        value: VARIABLE.STATUS_PIG[statusKey]
      })
    })
    return statusCode_select;
  }

  get_role_list_for_select() {
    let roles_select = [];
    if (this.settingProvider.setting) {
      this.settingProvider.setting.roles.forEach((role) => {
        roles_select.push({
          name: role.name,
          value: role.id
        })
      });
    }
    return roles_select;
  }


  get_regency_list_for_select() {
    let regency_select = [];
    if (this.settingProvider.setting) {
      this.settingProvider.setting.regencies.forEach((regency) => {
        regency_select.push({
          name: regency.name,
          value: regency.id
        })
      });
    }
    return regency_select;
  }

  /**
   * Lấy phân quyền thông qua id
   * @param roleId 
   */
  get_role_by_id(roleId: string) {
    if (this.settingProvider.setting) {
      return this.settingProvider.setting.roles.filter((role) => {
        return role.id == roleId ? true : false;
      })[0];
    } else {
      return null;
    }

  }


  /**
   * Lấy trạng trại bằng Id
   * @param farmId 
   */
  get_farm_by_id(farmId: string) {
    if (this.farmProvider.farms) {
      return this.farmProvider.farms.filter((farm) => {
        return farm.id == farmId ? true : false;
      })[0];
    } else {
      return null;
    }
  }

  /**
   * Lấy danh sách khu của 1 trang trại
   * @param farmId 
   */
  get_sections_of_farm(farmId: string) {
    if (this.sectionProvider.sections) {
      return this.sectionProvider.sections.filter((section) => {
        return section.farm.id == farmId ? true : false;
      })
    } else {
      return [];
    }

  }

  /**
   * Lấy danh sách khu thuộc 1 loại khu của 1 trang trại
   * @param farmId 
   */
  get_sections_by_sectionType_of_farm(farmId: string, sectionTypeId: string) {
    if (this.sectionProvider.sections) {
      return this.sectionProvider.sections.filter((section) => {
        return (section.farm.id == farmId && section.typeId == sectionTypeId) ? true : false;
      })
    }
    else {
      return [];
    }
  }

  /**
   * Láy danh sách nhà của 1 khu
   * @param sectionId 
   */
  get_houses_of_section(sectionId: string) {
    if (this.houseProvider.houses) {
      return this.houseProvider.houses.filter((house) => {
        return house.section.id == sectionId ? true : false;
      })
    } else return [];
  }

  /**
   * Lấy đối tác bằng Id
   * @param partnerId 
   */
  get_partner_by_id(partnerId: string) {
    if (this.settingProvider.setting.partners) {
      return this.settingProvider.setting.partners.filter((partner) => {
        return partner.id == partnerId ? true : false;
      })[0];
    } else {
      return null;
    }
  }

  /**
   * Lấy khách hàng bằng Id
   * @param partnerId 
   */
  get_customer_by_id(customerId: string) {
    if (this.settingProvider.setting.customers) {
      return this.settingProvider.setting.customers.filter((customer) => {
        return customer.id == customerId ? true : false;
      })[0];
    } else {
      return null;
    }
  }

  /**
   * Lấy loại khách hàng bằng Id
   * @param typeId 
   */
  get_customerType_by_id(typeId: string) {
    if (this.settingProvider.setting.customerTypes) {
      return this.settingProvider.setting.customerTypes.filter((type) => {
        return type.id == typeId ? true : false;
      })[0];
    } else {
      return null;
    }
  }

  /**
   * Lấy nhóm khách hàng bằng Id
   * @param typeId 
   */
  get_customerGroup_by_id(groupId: string) {
    if (this.settingProvider.setting.customerGroups) {
      return this.settingProvider.setting.customerGroups.filter((group) => {
        return group.id == groupId ? true : false;
      })[0];
    } else {
      return null;
    }
  }

  /**
   * Lấy loại trang trại bằng Id
   * @param typeId 
   */
  get_farm_type_by_id(typeId: string) {
    if (this.settingProvider.setting) {
      return this.settingProvider.setting.farmTypes.filter((type) => {
        return type.id == type.id ? true : false;
      })[0];
    } else {
      return null;
    }

  }


  /**
   * Lấy nhân viên bằng Id
   * @param empId 
   */
  get_employee_by_id(empId: string) {
    if (this.employeeProvider.employees && this.employeeProvider.employees.length) {
      return this.employeeProvider.employees.filter((emp) => {
        return emp.id == empId ? true : false;
      })[0];
    } else return null;
  }

  /**
   * Lấy danh sách  nhân viên thuộc trang trại
   * @param farmId 
   */
  get_employees_of_farm(farmId: string) {
    if (this.employeeProvider.employees) {
      return this.employeeProvider.employees.filter((emp) => {
        return emp.farm.id == farmId ? true : false;
      });
    } else return null;
  }

  /**
   * Lấy các đối tượng đối tác với Object key  là id
   */
  get_object_list_key_of_partner() {
    let partners = {};
    if (this.settingProvider.setting) {
      this.settingProvider.setting.partners.forEach((partner) => {
        partners[partner.id] = partner;
      })
    }
    return partners;
  }

  /**
   * Lấy các đối tượng khách hàng với Object key  là id
   */
  get_object_list_key_of_customer() {
    let customers = {};
    if (this.settingProvider.setting) {
      this.settingProvider.setting.customers.forEach((customer) => {
        customers[customer.id] = customer;
      })
    }
    return customers;
  }

  /**
   * Lấy các đối tượng trang trại với Object key  là id
   */
  get_object_list_key_of_farm() {
    let farms = {};
    if (this.farmProvider.farms) {
      this.farmProvider.farms.forEach((farm) => {
        farms[farm.id] = farm;
      })
    }
    return farms;
  }

  /**
   * Lấy các đối tượng heo với Object key  là id
   */
  get_object_list_key_of_pig() {
    let pigs = {};
    if (this.pigsProvider.pigs) {
      this.pigsProvider.pigs.forEach((pig) => {
        pigs[pig.id] = pig;
      })
    }
    return pigs;
  }

  /**
   * Lấy các đối tượng nhà với Object key  là id
   */
  get_object_list_key_of_house() {
    let houses = {};
    if (this.houseProvider.houses) {
      this.houseProvider.houses.forEach((house) => {
        houses[house.id] = house;
      })
    }
    return houses;
  }

  /**
   * Lấy các đối tượng BPSD với Object key  là id
   */
  get_object_list_key_of_gential() {
    let gentials = {};
    if (this.settingProvider.setting) {
      this.settingProvider.setting.gentialType.forEach((gential) => {
        gentials[gential.id] = gential;
      })
    }
    return gentials;
  }

  /**
   * Lấy các đối tượng loại chân với Object key  là id
   */
  get_object_list_key_of_foot() {
    let foots = {};
    if (this.settingProvider.setting) {
      this.settingProvider.setting.footType.forEach((foot) => {
        foots[foot.id] = foot;
      })
    }
    return foots;
  }

  /**
   * Lấy các đối tượng tình trạng sức khỏe với Object key  là id
   */
  get_object_list_key_of_healthStatus() {
    let healthStatus = {};
    if (this.settingProvider.setting) {
      this.settingProvider.setting.healthStatus.forEach((health) => {
        healthStatus[health.id] = health;
      })
    }
    return healthStatus;
  }

  /**
   * Lấy các đối tượng vấn đề heo dưới dạng key-value
   */
  get_object_list_key_of_issues() {
    let issues = {};
    if (this.settingProvider.setting) {
      this.settingProvider.setting.issues.forEach((issue) => {
        issues[issue.id] = issue;
      })
    }
    return issues;
  }

  /**
   * Lấy các đối tượng trạng thái heo với Object key  là id
   */
  get_object_list_key_of_status() {
    let Status = {};
    if (this.settingProvider.setting) {
      this.settingProvider.setting.status.forEach((status) => {
        Status[status.id] = status;
      })
    }
    return Status;
  }

  /**
   * Lấy các đối tượng trạng thái sức khỏe với Object key là id
   */
  get_object_list_key_of_health_status() {
    let healthStatus = {};
    if (this.settingProvider.setting) {
      this.settingProvider.setting.healthStatus.forEach((status) => {
        healthStatus[status.id] = status;
      })
    }
    return healthStatus;
  }

  /**
   * Lấy các đối tượng giống với Object key  là id
   */
  get_object_list_key_of_breeds() {
    let breeds = {};
    if (this.settingProvider.setting) {
      this.settingProvider.setting.breeds.forEach((breed) => {
        breeds[breed.id] = breed;
      })
    }
    return breeds;
  }

  /**
   * Lấy các đối tượng loại lên giống với Object key là id
   */
  get_object_list_key_of_breedingTypes() {
    let breedingType = {}
    if (this.settingProvider.setting) {
      this.settingProvider.setting.breedingType.forEach((value) => {
        breedingType[value.id] = value;
      })
    }
    return breedingType;
  }

  /**
   * Lấy các đối tượng nhân viên với Object key là id
   */
  get_object_list_key_of_employees() {
    let employees = {};
    if (this.employeeProvider.employees) {
      this.employeeProvider.employees.forEach((emp) => {
        employees[emp.id] = emp;
      })
    }
    return employees;
  }

  /**
     * Lấy các đối tượng đơn vị cám với Object key là id
     */
  get_object_list_key_of_foodUnit() {
    let units = {};
    if (this.settingProvider.setting) {
      this.settingProvider.setting.foodUnits.forEach((unit) => {
        units[unit.id] = unit;
      })
    }
    return units;
  }

  /**
       * Lấy các đối tượng đơn vị thuốc với Object key là id
       */
  get_object_list_key_of_medicineUnit() {
    let units = {};
    if (this.settingProvider.setting) {
      this.settingProvider.setting.medicineUnits.forEach((unit) => {
        units[unit.id] = unit;
      })
    }
    return units;
  }

  /**
   * Lấy thông tin nhà thông qua id
   * @param houseId 
   */
  get_house_by_id(houseId) {
    if (this.houseProvider.houses) {
      return this.houseProvider.houses.filter((house) => {
        return house.id == houseId ? true : false;
      })[0];
    } else {
      return null;
    }
  }

  /**
   * Lấy thông tin giống thông qua id
   * @param breedId 
   */
  get_breed_by_id(breedId) {
    if (this.settingProvider.setting) {
      return this.settingProvider.setting.breeds.filter((breed) => {
        return breed.id == breedId ? true : false;
      })[0];
    } else return null;
  }

  /**
   * Lấy thông tin loại chân thông qua id
   * @param footId 
   */
  get_foot_by_id(footId) {
    if (this.settingProvider.setting) {
      return this.settingProvider.setting.footType.filter((foot) => {
        return foot.id == footId ? true : false;
      })[0];
    } else {
      return null;
    }

  }

  /**
   * Lấy thông tin trạng thái sức khỏe thông qua id
   * @param healStatusId 
   */
  get_healthstatus_by_id(healStatusId) {
    if (this.settingProvider.setting) {
      return this.settingProvider.setting.healthStatus.filter((healthStatus) => {
        return healthStatus.id == healStatusId ? true : false;
      })[0];
    } else {
      return null;
    }

  }

  /**
   * Lấy thông tin trạng thái mang thai thông qua id
   * @param pregnancyStatusId 
   */
  get_pregnancystatus_by_id(pregnancyStatusId) {
    if (this.settingProvider.setting) {
      return this.settingProvider.setting.pregnancyStatus.filter((pregnancyStatus) => {
        return pregnancyStatus.id == pregnancyStatusId ? true : false;
      })[0];
    } else {
      return null;
    }

  }

  // /**
  //  * Lấy thông tin sản phẩm thông qua id
  //  * @param pregnancyStatusId 
  //  */
  // get_pricecode_by_id(priceCodeId) {
  //   if (this.settingProvider.setting) {
  //     return this.settingProvider.setting.priceCodes.filter((priceCode) => {
  //       return priceCode.id == priceCodeId ? true : false;
  //     })[0];
  //   } else {
  //     return null;
  //   }
  // }

  /**
   * Lấy thông tin loại BPSD thông qua id
   * @param gentialTypeId 
   */
  get_gentialtype_by_id(gentialTypeId) {
    if (this.settingProvider.setting) {
      return this.settingProvider.setting.gentialType.filter((gential) => {
        return gential.id == gentialTypeId ? true : false;
      })[0];
    } else {
      return null;
    }

  }

  /**
   * Lấy thông tin trạng thái của heo
   * @param statusId 
   */
  get_status_by_id(statusId) {
    if (this.settingProvider.setting) {
      return this.settingProvider.setting.status.filter((status) => {
        return status.id == statusId ? true : false;
      })[0];
    } else return null;
  }

  /**
   * Lấy thông tin nhà kho thông qua id
   * @param warehouseId 
   */
  get_warehouse_by_id(warehouseId: string) {
    if (this.warehouseProvider.warehouses) {
      let idx = this.warehouseProvider.warehouses.findIndex(warehouse => warehouse.id == warehouseId);
      if (idx > -1)
        return this.warehouseProvider.warehouses[idx];
      else return null;
    } else return null;

  }

  /**
   * Lấy thông tin cám thông qua id
   * @param foodId 
   */
  get_food_by_id(foodId: string) {
    if (this.settingProvider.setting) {
      let idx = this.settingProvider.setting.foods.findIndex(food => food.id == foodId);
      if (idx > -1)
        return this.settingProvider.setting.foods[idx];
      else return null;
    } else return null;
  }

  /**
 * Lấy thông tin loại cám thông qua id
 * @param foodId 
 */
  get_food_type_by_id(foodTypeId: string) {
    if (this.settingProvider.setting) {
      let idx = this.settingProvider.setting.foodType.findIndex(type => type.id == foodTypeId);
      if (idx > -1)
        return this.settingProvider.setting.foodType[idx];
      else return null;
    } else return null;
  }

  /**
   * Lấy thông tin thuốc thông qua id
   * @param medicineId 
   */
  get_medicine_by_id(medicineId: string) {
    if (this.settingProvider.setting) {
      let idx = this.settingProvider.setting.medicines.findIndex(medicine => medicine.id == medicineId);
      if (idx > -1)
        return this.settingProvider.setting.medicines[idx];
      else return null;
    } else return null;
  }

  /**
   * Lấy thông tin loại thuốc thông qua id
   * @param medicineId 
   */
  get_medicineType_by_id(medicineTypeId: string) {
    if (this.settingProvider.setting) {
      let idx = this.settingProvider.setting.medicineType.findIndex(type => type.id == medicineTypeId);
      if (idx > -1)
        return this.settingProvider.setting.medicineType[idx];
      else return null;
    } else return null;
  }

  /**
   * Lấy thông tin đơn vị thuốc thông qua id
   * @param unitId 
   */
  get_medicineUnit_by_id(unitId: string) {
    if (this.settingProvider.setting) {
      let idx = this.settingProvider.setting.medicineUnits.findIndex(unit => unit.id == unitId);
      if (idx > -1)
        return this.settingProvider.setting.medicineUnits[idx];
      else return null;
    } else return null;
  }

  /**
   * Lấy thông tin đơn vị cám thông qua id
   * @param unitId 
   */
  get_foodUnit_by_id(unitId: string) {
    if (this.settingProvider.setting) {
      let idx = this.settingProvider.setting.foodUnits.findIndex(unit => unit.id == unitId);
      if (idx > -1)
        return this.settingProvider.setting.foodUnits[idx];
      else return null;
    } else return null;
  }

  get_parent_of_pig(target: pig) {
    let result: any = {};
    if (this.pigsProvider.pigs) {
      result['father'] = this.pigsProvider.pigs.filter((pig) => {
        return target.originFather == pig.pigCode ? true : false;
      })[0];
      result['mother'] = this.pigsProvider.pigs.filter((pig) => {
        return target.originMother == pig.pigCode ? true : false;
      })[0];
    }
    return result;
  }

  /**
   * Lấy thông tin heo thông qua id
   * @param pigId 
   */
  get_pig_by_id(pigId: string) {
    if (this.pigsProvider.pigs) {
      return this.pigsProvider.pigs.filter((pig) => {
        return pig.id == pigId ? true : false;
      })[0];
    }
    return null;
  }

  /**
   * Lấy Object chuẩn của heo  để thực hiện gửi request
   * @param pig 
   */
  get_pig_object_to_send_request(pig: pig) {
    pig['house'] = this.get_house_by_id(pig.houseId);
    pig['breed'] = this.get_breed_by_id(pig.breedId);
    pig['foot'] = this.get_foot_by_id(pig.footTypeId);
    pig['healthStatus'] = this.get_healthstatus_by_id(pig.healthStatusId);
    pig['pregnancyStatus'] = this.get_pregnancystatus_by_id(pig.pregnancyStatusId);
    // pig['priceCode'] = this.get_pricecode_by_id(pig.priceCodeId);
    pig['gentialType'] = this.get_gentialtype_by_id(pig.gentialTypeId);
    pig['status'] = this.get_status_by_id(pig.statusId);
    pig['pigType'] = pig['pigType'] ? pig['pigType'] : VARIABLE.TYPE_PIG[0].name;
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
    medicineWarehouse.unit = this.get_medicineUnit_by_id(medicineWarehouse.unit_id);
    return medicineWarehouse;
  }

  /**
   * Lấy danh sach kho cám của 1 trang trại
   * @param farmId 
   */
  get_food_warehouse_of_farm(farmId: string) {
    if (this.warehouseProvider.warehouses) {
      return this.warehouseProvider.warehouses.filter((warehouse) => {
        return (warehouse.manager.farm.id == farmId && warehouse.type.id == "1") ? true : false;
      })
    } else return [];
  }

  /**
   * Lấy danh sách kho thuốc của 1 trang trại
   * @param farmId 
   */
  get_medicine_warehouse_of_farm(farmId: string) {
    if (this.warehouseProvider.warehouses) {
      return this.warehouseProvider.warehouses.filter((warehouse) => {
        return (warehouse.manager.farm.id == farmId && warehouse.type.id == "2") ? true : false;
      })
    } else return [];
  }



  /**
   * Lấy danh dách heo thuộc chuồng heo
   * @param houseId 
   */
  get_pigs_of_house(houseId: string) {
    if (this.pigsProvider.pigs) {
      return this.pigsProvider.pigs.filter((pig) => {
        return pig.houseId == houseId ? true : false;
      })
    } else return [];
  }

  /**
   * Lấy danh sách heo theo section Id
   * @param sectionId 
   */
  get_pigs_by_sectionId(sectionId: string) {
    let houses = this.get_object_list_key_of_house();
    if (this.pigsProvider.pigs) {
      return this.pigsProvider.pigs.filter((pig) => {
        return houses[pig.houseId].section.id == sectionId ? true : false;
      })
    } else return [];
  }


  /**
   * Lấy danh sách heo thuộc khu
   * @param sectionTypeId 
   */
  get_pigs_of_sectionType(sectionTypeId: string) {
    let housesId: any = [];
    if (this.houseProvider.houses) {
      this.houseProvider.houses.filter((house) => {
        return (house.section.typeId == sectionTypeId) ? true : false;
      }).forEach((house) => {
        housesId.push(house.id);
      })
    } else return [];

    if (this.pigsProvider.pigs) {
      return this.pigsProvider.pigs.filter((pig) => {
        return housesId.includes(pig.houseId) ? true : false;
      })
    } else return [];
  }


  /**
   * Lấy danh sách heo bán ở từng khu 
   * @param sectionTypeId 
   */
  get_pigs_sale_waiting_of_section(sectionTypeId: string) {
    let housesId: any = [];
    if (this.houseProvider.houses) {
      this.houseProvider.houses.filter((house) => {
        return (house.section.typeId == sectionTypeId) ? true : false;
      }).forEach((house) => {
        housesId.push(house.id);
      })
    } else return [];

    let statusObjectKeyList = this.get_object_list_key_of_status();
    if (this.pigsProvider.pigs && statusObjectKeyList) {
      return this.pigsProvider.pigs.filter((pig) => {
        return housesId.includes(pig.houseId) && statusObjectKeyList[pig.statusId].code == VARIABLE.STATUS_PIG.WAIT_FOR_SALE ? true : false;
      })
    } else return [];
  }

  /**
  * Lấy danh sách heo chờ chuyển trại ở từng khu 
  * @param sectionTypeId 
  */
  get_pigs_transfer_waiting_of_section(sectionTypeId: string) {
    let housesId: any = [];
    if (this.houseProvider.houses) {
      this.houseProvider.houses.filter((house) => {
        return (house.section.typeId == sectionTypeId) ? true : false;
      }).forEach((house) => {
        housesId.push(house.id);
      })
    } else return [];

    let statusObjectKeyList = this.get_object_list_key_of_status();
    if (this.pigsProvider.pigs && statusObjectKeyList) {
      return this.pigsProvider.pigs.filter((pig) => {
        return housesId.includes(pig.houseId) && statusObjectKeyList[pig.statusId].code == VARIABLE.STATUS_PIG.WAIT_FOR_TRANSFER ? true : false;
      })
    } else return [];
  }

  /**
   * Lấy danh sách heo nái đã phối ở khu
   * @param sectionTypeId 
   */
  get_mated_pig_of_section(sectionTypeId: string) {
    let housesId: any = [];
    this.houseProvider.houses.filter((house) => {
      return (house.section.typeId == sectionTypeId) ? true : false;
    }).forEach((house) => {
      housesId.push(house.id);
    })
    let statusObjectKeyList = this.get_object_list_key_of_status();
    if (this.pigsProvider.pigs && statusObjectKeyList) {
      return this.pigsProvider.pigs.filter((pig) => {
        return housesId.includes(pig.houseId) &&
          (statusObjectKeyList[pig.statusId].code == VARIABLE.STATUS_PIG.MATED
            || statusObjectKeyList[pig.statusId].code == VARIABLE.STATUS_PIG.MATING) ? true : false;
      })
    } else return [];
  }

  /**
  * Lấy danh sách heo nái mang thai ở khu
  * @param sectionTypeId 
  */
  get_farrowing_pig_of_section(sectionTypeId: string) {
    let housesId: any = [];
    if (this.houseProvider.houses) {
      this.houseProvider.houses.filter((house) => {
        return (house.section.typeId == sectionTypeId) ? true : false;
      }).forEach((house) => {
        housesId.push(house.id);
      })
    } else return [];

    let statusObjectKeyList = this.get_object_list_key_of_status();
    if (this.pigsProvider.pigs && statusObjectKeyList) {
      return this.pigsProvider.pigs.filter((pig) => {
        return housesId.includes(pig.houseId) && statusObjectKeyList[pig.statusId].code == VARIABLE.STATUS_PIG.FARROWING ? true : false;
      })
    } else return [];
  }

  /**
   * Lấy danh sách heo cai sữa tại khu
   * @param sectionTypeId 
   */
  get_weaning_pig_of_section(sectionTypeId: string) {
    let housesId: any = [];
    if (this.houseProvider.houses) {
      this.houseProvider.houses.filter((house) => {
        return (house.section.typeId == sectionTypeId) ? true : false;
      }).forEach((house) => {
        housesId.push(house.id);
      })
    } else return [];

    let statusObjectKeyList = this.get_object_list_key_of_status();
    if (statusObjectKeyList && this.pigsProvider.pigs) {
      return this.pigsProvider.pigs.filter((pig) => {
        return housesId.includes(pig.houseId) && statusObjectKeyList[pig.statusId].code == VARIABLE.STATUS_PIG.WEANING ? true : false;
      })
    } else return [];

  }

  /**
   * Lấy danh sách heo con cai sữa tại khu
   * @param sectionTypeId 
   */
  get_growing_child_pig_of_section(sectionTypeId: string) {
    let housesId: any = [];
    if (this.houseProvider.houses) {
      this.houseProvider.houses.filter((house) => {
        return (house.section.typeId == sectionTypeId) ? true : false;
      }).forEach((house) => {
        housesId.push(house.id);
      })
    } else return [];

    let statusObjectKeyList = this.get_object_list_key_of_status();
    if (statusObjectKeyList && this.pigsProvider.pigs) {
      return this.pigsProvider.pigs.filter((pig) => {
        return housesId.includes(pig.houseId) && statusObjectKeyList[pig.statusId].code == VARIABLE.STATUS_PIG.GROWING ? true : false;
      })
    } else return [];
  }

  /**
   * Lấy danh sách heo nái sẩy thai ở khu
   * @param sectionTypeId 
   */
  get_abortion_pig_of_section(sectionTypeId: string) {
    let housesId: any = [];
    if (this.houseProvider.houses) {
      this.houseProvider.houses.filter((house) => {
        return (house.section.typeId == sectionTypeId) ? true : false;
      }).forEach((house) => {
        housesId.push(house.id);
      })
    } else return [];

    let statusObjectKeyList = this.get_object_list_key_of_status();
    if (statusObjectKeyList && this.pigsProvider.pigs) {
      return this.pigsProvider.pigs.filter((pig) => {
        return housesId.includes(pig.houseId) && statusObjectKeyList[pig.statusId].code == VARIABLE.STATUS_PIG.ABORTION ? true : false;
      })
    } else return [];
  }

  /**
   * Lấy toàn bộ heo đang chờ bán ( ở khu 8)
   */
  get_all_sale_pig() {
    let status = this.get_object_list_key_of_status();
    if (this.pigsProvider.pigs && status) {
      return this.pigsProvider.pigs.filter((pig) => {
        return status[pig.statusId].code == VARIABLE.STATUS_PIG.WAIT_FOR_SALE ? true : false;
      })
    } else return [];
  }

  /**
   * Lấy toàn bộ heo đang chờ chuyển trại
   */
  get_all_transfer_waiting_pig() {
    let status = this.get_object_list_key_of_status();
    if (this.pigsProvider.pigs && status) {
      return this.pigsProvider.pigs.filter((pig) => {
        return status[pig.statusId].code == VARIABLE.STATUS_PIG.WAIT_FOR_TRANSFER ? true : false;
      })
    } else return [];
  }

  /**
   * Lấy thông tin heo dựa vào mã heo
   */
  get_pig_by_pig_code(pigCode: string) {
    if (this.pigsProvider.pigs) {
      return this.pigsProvider.pigs.filter((pig) => {
        return pig.pigCode == pigCode ? true : false;
      })[0];
    } else return null;
  }

  /**
   * Lấy trạng thái heo chờ bán dựa vào trạng thái hiện tại
   * @param statusId 
   */
  get_status_saleWaiting_of_pig(statusId): status {
    let currentStatus = this.get_status_by_id(statusId);
    if (this.settingProvider.setting && currentStatus) {
      return this.settingProvider.setting.status.filter((status) => {
        return status.previousStatus == currentStatus.code && VARIABLE.STATUS_PIG.WAIT_FOR_SALE == status.code ? true : false;
      })[0];
    } else return null;
  }

  get_status_farm_transferWaiting_of_pig(statusId): status {
    let currentStatus = this.get_status_by_id(statusId);
    if (this.settingProvider.setting && currentStatus) {
      return this.settingProvider.setting.status.filter((status) => {
        return status.previousStatus == currentStatus.code && VARIABLE.STATUS_PIG.WAIT_FOR_TRANSFER == status.code ? true : false;
      })[0];
    } else return null;
  }


  /**
   * Lấy trạng thái heo chờ phối dựa vào trạng thái hiện tại
   * @param statusId 
   */
  get_status_matingWait_of_pig(status: status): status {
    if (this.settingProvider.setting && status) {
      return this.settingProvider.setting.status.filter((_status) => {
        return _status.previousStatus == status.code && VARIABLE.STATUS_PIG.WAIT_FOR_MATING == _status.code ? true : false;
      })[0];
    } else return null;
  }

  /**
 * Lấy trạng thái đã phối dựa vào trạng thái hiện tại
 * @param statusId 
 */
  get_status_mated_of_pig(status: status): status {
    if (this.settingProvider.setting && status) {
      return this.settingProvider.setting.status.filter((_status) => {
        return status.code == _status.previousStatus && VARIABLE.STATUS_PIG.MATED == _status.code ? true : false;
      })[0];
    } else return null;
  }

  /**
   * Lấy trạng thái heo dựa vào statusCode
   * @param statusCode 
   */
  get_status_pig_by_status_code(statusCode: string) {
    if (this.settingProvider.setting && statusCode) {
      return this.settingProvider.setting.status.filter((_status) => {
        return _status.code == statusCode ? true : false;
      })[0];
    } else return null;
  }


  /**
   * Lấy danh sách heo lên giống trong khu
   * @param sectionId 
   * @param breedings 
   */
  get_breeding_pig_in_section(sectionTypeId: string, breedings: Array<breedings>) {
    let pigs = this.get_pigs_of_sectionType(sectionTypeId);
    if (pigs && pigs.length) {
      return this.get_pigs_of_sectionType(sectionTypeId).forEach(pig => {
        pig['breedings'] = this.get_breeding_of_pig(pig.id, breedings);
      });
    } else return [];
  }

  /**
   * Lấy lịch sử lên giống của heo
   * @param pigId 
   * @param breedings 
   */
  get_breeding_of_pig(pigId, breedings: Array<breedings>) {
    if (breedings && breedings.length) {
      return breedings.filter((breeding) => {
        return breeding.pig.id == pigId ? true : false;
      }).sort((a: breedings, b: breedings) =>
        (new Date(a.date) > new Date(b.date)) ? -1 : 1);
    } else return [];
  }

  /**
   * Lấy danh sách lên giống của 1 khu
   */
  get_breedings_of_section(sectionTypeId: string, breedings: Array<breedings>) {
    if (breedings && breedings.length && sectionTypeId) {
      return breedings.filter((breeding) => {
        return breeding.pig.house.section.typeId == sectionTypeId ? true : false;
      })
    } else return [];
  }

  /**
   * Lấy danh sách phối của 1 khu
   * @param sectionTypeId 
   * @param matings 
   */
  get_matings_of_section(sectionTypeId: string, matings: Array<mating>) {
    if (matings && matings.length && sectionTypeId) {
      return matings.filter((mating) => {
        return mating.mother.house.section.typeId == sectionTypeId ? true : false;
      })
    } else return [];
  }

  /**
   * Lấy danh sách lấy tinh heo của 1 khu
   * @param sectionTypeId 
   * @param sperms 
   */
  get_sperms_of_section(sectionTypeId: string, sperms: Array<sperms>) {
    if (sperms && sperms.length && sectionTypeId) {
      return sperms.filter((sperm) => {
        return sperm.pig.house.section.typeId == sectionTypeId ? true : false;
      })
    } else return [];
  }

  /**
   * Lấy danh sách heo thuộc khu theo giới tính
   * @param sectionTypeId 
   * @param gender 
   */
  get_pigs_of_sections_with_gender(sectionTypeId: string, gender: number) {
    let housesId: any = [];
    if (this.houseProvider.houses) {
      this.houseProvider.houses.filter((house) => {
        return (house.section.typeId == sectionTypeId) ? true : false;
      }).forEach((house) => {
        housesId.push(house.id);
      })
    } else return [];

    if (this.pigsProvider.pigs) {
      return this.pigsProvider.pigs.filter((pig) => {
        return housesId.includes(pig.houseId) && pig.gender == gender ? true : false;
      })
    } else return [];
  }

  /**
   * Lấy danh sách heo nộc có thể phối với heo nái đã chọn
   * @param pig 
   */
  get_male_mating_pig_for_female_pig(pig: pig) {
    let houses = this.get_object_list_key_of_house();
    if (pig && pig.house) {
      return this.pigsProvider.pigs.filter((pig_element) => {
        return houses[pig_element.houseId].section.id == houses[pig.house.id].section.id && pig_element.gender == VARIABLE.GENDER[1].id ? true : false;
      })
    } else {
      return this.pigsProvider.pigs.filter((pig_element) => {
        return houses[pig_element.houseId].section.id == houses[pig.houseId].section.id && pig_element.gender == VARIABLE.GENDER[1].id ? true : false;
      })
    }
  }

  /**
   * Lấy danh sách công thức phối giống
   */
  get_mating_role_of_mating() {
    let roles: any = {};
    if (this.settingProvider.setting) {
      this.settingProvider.setting.matingRoles.forEach((role: matingRole) => {
        roles[(role.father.id) + '-' + (role.mother.id)] = role;
      })
    }
    return roles;
  }

  get_child_breed_of_mating_role(motherId, fatherId) {
    if (this.settingProvider.setting) {
      return this.settingProvider.setting.matingRoles.filter((role: matingRole) => {
        return role.father.id == fatherId && role.mother.id == motherId ? true : false;
      })[0];
    } else return null;
  }


  /**
   * Lấy danh sách heo con của 1 đợt sinh
   * @param birth 
   */
  get_child_pig_of_birth(birth: births) {
    if (this.pigsProvider.pigs) {
      return this.pigsProvider.pigs.filter((pig) => {
        return pig.birthId == birth.id ? true : false;
      })
    } else return [];
  }


  get_farm_to_transfer_internal(employeeId) {
    if (this.farmProvider.farms) {
      return this.farmProvider.farms.filter((farm) => {
        return farm.manager != employeeId ? true : false;
      })
    } else return [];
  }

  get_employee_id(temp) {
    this.util.getKey(KEY.EMPID)
      .then((empId: string) => {
        temp = empId;
      })
  }

  show_quantity_medicine(quantity: number, unit: medicineUnits) {
    if (unit.id == unit.baseUnit) {
      return quantity + ' ' + unit.name;
    } else {
      let unit_util = this.get_object_list_key_of_medicineUnit();
      let quantity_div = parseInt(quantity + '');
      let quantity_mode = (quantity * 10 - parseInt(quantity + '') * 10) / 10;
      if (quantity_mode) {
        if (quantity_div) {
          return quantity_div + ' ' + unit.name + ' + ' + (quantity_mode * parseInt(unit.quantity)) + ' ' + unit_util[unit.baseUnit].name;
        } else {
          return (quantity_mode * parseInt(unit.quantity)) + ' ' + unit_util[unit.baseUnit].name;
        }
      } else {
        if (quantity_div) {
          return quantity_div + ' ' + unit.name;
        } else {
          return 0;
        }
      }
    }
  }

  show_quantity_food(quantity: number, unit: foodUnits) {
    if (unit.id == unit.baseUnit) {
      return quantity + ' ' + unit.name;
    } else {
      let unit_util = this.get_object_list_key_of_foodUnit();
      let quantity_div = parseInt(quantity + '');
      let quantity_mode = (quantity * 10 - parseInt(quantity + '') * 10) / 10;
      if (quantity_mode) {
        if (quantity_div) {
          return quantity_div + ' ' + unit.name + ' + ' + (quantity_mode * unit.quantity) + ' ' + unit_util[unit.baseUnit].name;
        } else {
          return (quantity_mode * unit.quantity) + ' ' + unit_util[unit.baseUnit].name;
        }
      } else {
        if (quantity_div) {
          return quantity_div + ' ' + unit.name;
        }
        else {
          return 0;
        }
      }
    }
  }
}