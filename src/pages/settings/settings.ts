import { Component, Renderer, ViewChild } from '@angular/core';
import { Events, IonicPage, NavController, NavParams, Platform, Slides } from 'ionic-angular';
import { customers, matingRole } from '../../common/entity';

import { BreedingTypesRole } from '../../role-input/breeding_type';
import { BreedsRole } from '../../role-input/breeds';
import { CustomerGroupsRole } from '../../role-input/customer_group';
import { CustomerRole } from '../../role-input/customer';
import { CustomerTypesRole } from '../../role-input/customer_type';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { DiseasesRole } from '../../role-input/diseases';
import { EmployeesProvider } from '../../providers/employees/employees';
import { FarmTypesRole } from '../../role-input/farm_type';
import { FoodTypeRole } from '../../role-input/food_type';
import { HealthStatusRole } from '../../role-input/healthStatus';
import { PartnersRole } from '../../role-input/partner';
import { PregnancyStatusRole } from '../../role-input/pregnancy_status';
import { SettingRolePage } from '../setting-role/setting-role';
import { SettingUtilComponent } from '../../components/setting-util/setting-util';
import { SettingsProvider } from '../../providers/settings/settings';
import { StatusPigRole } from '../../role-input/statusPig';
import { WarehouseTyperole } from '../../role-input/warehouse_type';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})

export class SettingsPage {
  @ViewChild('slider') slider: Slides;


  public list_settings: any;
  public list_keys: any = [];
  public foods_temp: any = [];
  public medicines_temp: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public employeeProvider: EmployeesProvider,
    public events: Events,
    public renderer: Renderer,
    public settingProvider: SettingsProvider,
    public platform: Platform,
    public deployData: DeployDataProvider
  ) {
    this.settingProvider.setting.foods.forEach((food, idx) => {
      this.foods_temp.push(food);
      this.foods_temp[idx].typeName = food.type.name;
    })

    this.settingProvider.setting.medicines.forEach((medicine, idx) => {
      this.medicines_temp.push(medicine);
      this.medicines_temp[idx].typeName = medicine.type.name;
    })

    this.list_settings = {
      customerTypes: {
        title: 'Danh sách loại khách hàng',
        placeholderSearch: 'Tìm kiếm loại khách hàng',
        filter_default: ["name", "description"],
        attributes: [
          { name: "description", label: 'Mô tả' },
        ],
        mainAttribute: 'name',
        data: this.settingProvider.setting.customerTypes,
        roleInput: new CustomerTypesRole(this.settingProvider),
      },
      customerGroups: {
        title: 'Danh sách nhóm khách hàng',
        placeholderSearch: 'Tìm kiếm nhóm khách hàng',
        filter_default: ["name", "description"],
        attributes: [
          { name: "description", label: 'Mô tả' },
        ],
        mainAttribute: 'name',
        data: this.settingProvider.setting.customerGroups,
        roleInput: new CustomerGroupsRole(this.settingProvider),
      },
      customers: {
        title: 'Danh sách khách hàng',
        placeholderSearch: 'Tìm kiếm khách hàng',
        filter_default: ["name","typeName","groupName", "phone", "email", "address", "companyAddress", "fax", "bank", "description"],
        attributes: [
          { name: "typeName", label: 'Loại khách hàng' },
          { name: "groupName", label: 'Nhóm khách hàng' },
          { name: "phone", label: 'Số điện thoại' },
          { name: "email", label: 'Email' },
          { name: "address", label: 'Địa chỉ' },
          { name: "companyAddress", label: 'Địa chỉ công ty' },
          { name: "fax", label: 'Fax' },
          { name: "bank", label: 'Tài khoản ngân hàng' },
          { name: "description", label: 'Mô tả' },
        ],
        mainAttribute: 'name',
        data: this.settingProvider.setting.customers,
        roleInput: new CustomerRole(this.settingProvider, this.deployData),
        customData(customerRole: Array<customers>) {
          customerRole.forEach((role) => {
            role['typeId'] = role.type?role.type.id:'';
            role['groupId'] = role.type?role.group.id:'';
            role['typeName'] = role.type?role.type.name:'';
            role['groupName'] = role.group?role.group.name:'';
          })
        }
      },
      partners: {
        title: 'Danh sách đối tác',
        placeholderSearch: 'Tìm kiếm đối tác',
        filter_default: ["name", "code", "manager", "address", "agencyName", "agencyAddress", "distributionName", "distributionAddress", "distributionPhone", "description"],
        attributes: [
          { name: "description", label: 'Mô tả' },
          // { name: "code", label: 'Mã đối tác' },
          { name: "manager", label: 'Tên người quản lý' },
          { name: "address", label: 'Địa chỉ' },
          { name: "agencyName", label: 'Tên chi nhánh' },
          { name: "agencyAddress", label: 'Địa chỉ chi nhánh' },
          { name: "agencyPhone", label: 'Số điện thoại chi nhánh' },
          { name: "distributionName", label: 'Tên nhà cung cấp' },
          { name: "distributionAddress", label: 'Địa chỉ nhà cung cấp' },
          { name: "distributionPhone", label: 'Số điện thoại nhà cung cấp' },
        ],
        mainAttribute: 'name',
        data: this.settingProvider.setting.partners,
        roleInput: new PartnersRole(this.settingProvider, this.deployData),
      },
      pregnancyStatus: {
        title: 'Trạng thái mang thai',
        placeholderSearch: 'Tìm kiếm trạng thái mang thai',
        filter_default: ["name", "description"],
        attributes: [
          { name: "description", label: 'Mô tả' },
        ],
        mainAttribute: 'name',
        data: this.settingProvider.setting.pregnancyStatus,
        roleInput: new PregnancyStatusRole(this.settingProvider),
      },
      breeds: {
        title: 'Danh sách giống',
        placeholderSearch: 'Tìm kiếm giống',
        filter_default: ["name", "lineCode", "symbol", "code", "level", "line", "description"],
        attributes: [
          { name: "lineCode", label: 'Mã dòng' },
          { name: "symbol", label: 'Ký hiệu' },
          { name: "code", label: 'Mã code' },
          { name: "level", label: 'Cấp giống' },
          { name: "line", label: 'Dòng' },
          { name: "description", label: 'Mô tả' },
        ],
        mainAttribute: 'name',
        data: this.settingProvider.setting.breeds,
        roleInput: new BreedsRole(this.settingProvider),
      },
      breedingType: {
        title: 'Loại lên giống',
        placeholderSearch: 'Tìm kiếm loại lên giống',
        filter_default: ["name", "description"],
        attributes: [
          { name: "description", label: 'Mô tả' },
        ],
        mainAttribute: 'name',
        data: this.settingProvider.setting.breedingType,
        roleInput: new BreedingTypesRole(this.settingProvider),
      },
      healthStatus: {
        title: 'Trạng thái sức khỏe',
        placeholderSearch: 'Tìm kiếm trạng thái sức khỏe',
        filter_default: ["name", "description"],
        attributes: [
          { name: "description", label: 'Mô tả' },
        ],
        mainAttribute: 'name',
        data: this.settingProvider.setting.healthStatus,
        roleInput: new HealthStatusRole(this.settingProvider,this.deployData),
      },
      diseases: {
        title: 'Danh sách bệnh',
        placeholderSearch: 'Tìm kiếm bệnh',
        filter_default: ["name", "agent", "symptom", "diagnose", "treatment", "note", "description"],
        attributes: [
          { name: "agent", label: 'Tác nhân' },
          { name: "symptom", label: 'Triệu chứng' },
          { name: "diagnose", label: 'Chuẩn đoán' },
          { name: "treatment", label: 'Điều trị' },
          { name: "note", label: 'Ghi chú' },
          { name: "description", label: 'Mô tả' },
        ],
        mainAttribute: 'name',
        data: this.settingProvider.setting.diseases,
        roleInput: new DiseasesRole(this.settingProvider),
        extraButtons: [
          { title: 'Thiết lập lâm sàng', color: 'main', component: null }
        ]
      },
      farmTypes: {
        title: 'Danh sách loại trang trại',
        placeholderSearch: 'Tìm kiếm loại trang trại',
        filter_default: ["name", "description"],
        attributes: [
          { name: "description", label: 'Mô tả' },
        ],
        mainAttribute: 'name',
        data: this.settingProvider.setting.farmTypes,
        roleInput: new FarmTypesRole(this.settingProvider),
      },
      warehouseTypes: {
        title: 'Danh sách loại kho',
        placeholderSearch: 'Tìm kiếm loại kho',
        filter_default: ["name", "description"],
        attributes: [
          { name: "description", label: 'Mô tả' },
        ],
        mainAttribute: 'name',
        data: this.settingProvider.setting.warehouseTypes,
        roleInput: new WarehouseTyperole(this.settingProvider),
      },
      foodType: {
        title: 'Danh sách loại thức ăn',
        placeholderSearch: 'Tìm kiếm loại thức ăn',
        filter_default: ["name", "description"],
        attributes: [
          { name: "description", label: 'Mô tả' },
        ],
        mainAttribute: 'name',
        data: this.settingProvider.setting.foodType,
        roleInput: new FoodTypeRole(this.settingProvider),
      },
      foodUnits: {
        title: 'Danh sách đơn vị cám',
        placeholderSearch: 'Tìm kiếm đơn vị cám',
        filter_default: ["name", "description"],
        attributes: [
          { name: "description", label: 'Mô tả' },
        ],
        mainAttribute: 'name',
        data: this.settingProvider.setting.foodUnits,
      },
      foods: {
        title: 'Danh sách thức ăn cho heo',
        placeholderSearch: 'Tìm kiếm thức ăn',
        filter_default: ["name", "foodCode", "typeName", "useFor", "guide", "description"],
        attributes: [
          { name: "foodCode", label: 'Mã thức ăn' },
          { name: "typeName", label: 'Loại thức ăn' },
          { name: "useFor", label: 'Dùng cho' },
          { name: "guide", label: 'Hướng dẫn' },
          { name: "description", label: 'Mô tả' },
        ],
        mainAttribute: 'name',
        data: this.foods_temp,
      },
      medicineType: {
        title: 'Danh sách nhóm thuốc',
        placeholderSearch: 'Tìm kiếm nhóm thuốc',
        filter_default: ["name", "description"],
        attributes: [
          { name: "description", label: 'Mô tả' },
        ],
        mainAttribute: 'name',
        data: this.settingProvider.setting.medicineType,
      },
      medicineUnits: {
        title: 'Danh sách đơn vị thuốc',
        placeholderSearch: 'Tìm kiếm đơn vị thuốc',
        filter_default: ["name", "quantity", "description"],
        attributes: [
          { name: "quantity", label: 'Số lượng' },
          { name: "description", label: 'Mô tả' },
        ],
        mainAttribute: 'name',
        data: this.settingProvider.setting.medicineUnits,
      },
      medicines: {
        title: 'Danh sách thuốc',
        placeholderSearch: 'Tìm kiếm thuốc',
        filter_default: ["name", "medicineCode", "typeName", "useFor", "guide", "description"],
        attributes: [
          { name: "medicineCode", label: 'Mã thuốc' },
          { name: "typeName", label: 'Loại thuốc' },
          { name: "useFor", label: 'Chức năng' },
          { name: "guide", label: 'Hướng dẫn' },
          { name: "description", label: 'Mô tả' },
        ],
        mainAttribute: 'name',
        data: this.medicines_temp,

      },
      // priceCodes: {
      //   title: 'Danh sách mã sản phẩm',
      //   placeholderSearch: 'Tìm kiếm mã sản phẩm',
      //   filter_default: ["name", "description"],
      //   attributes: [
      //     { name: "description", label: 'Mô tả' },
      //   ],
      //   mainAttribute: 'name',
      //   data: this.settingProvider.setting.priceCodes,
      // },
      footType: {
        title: 'Danh sách loại chân',
        placeholderSearch: 'Tìm kiếm loại chân',
        filter_default: ["name", "description"],
        attributes: [
          { name: "description", label: 'Mô tả' },
        ],
        mainAttribute: 'name',
        data: this.settingProvider.setting.footType,
      },
      gentialType: {
        title: 'Danh sách loại bộ phận sinh dục',
        placeholderSearch: 'Tìm kiếm loại bộ phận sinh dục',
        filter_default: ["name", "description"],
        attributes: [
          { name: "description", label: 'Mô tả' },
        ],
        mainAttribute: 'name',
        data: this.settingProvider.setting.gentialType,
      },
      issues: {
        title: 'Danh sách lâm sàn',
        placeholderSearch: 'Tìm kiếm lâm sàn',
        filter_default: ["name", "symptom", "lesions", "description"],
        attributes: [
          { name: "agent", label: 'Tác nhân' },
          { name: "symptom", label: 'Triệu chứng' },
          { name: "lesions", label: 'Đặc điểm' },
          { name: "description", label: 'Mô tả' },
        ],
        mainAttribute: 'name',
        data: this.settingProvider.setting.issues,
      },
      status: {
        title: 'Danh sách trạng thái heo',
        placeholderSearch: 'Tìm kiếm trạng thái heo',
        filter_default: ["name", "description", "previousStatus"],
        attributes: [
          { name: "description", label: 'Mô tả' },
          { name: "previousStatus", label: 'Trạng thái trước' },
          { name: "code", label: 'Status code' },
        ],
        mainAttribute: 'name',
        data: this.settingProvider.setting.status,
        roleInput: new StatusPigRole(this.settingProvider, this.deployData),
      },
      // rounds: {
      //   title: 'Danh sách lứa',
      //   placeholderSearch: 'Tìm kiếm lứa heo',
      //   filter_default: ["name", "from", "to"],
      //   attributes: [
      //     { name: "from", label: 'Từ ngày' },
      //     { name: "from", label: 'Đến ngày' }
      //   ],
      //   data: this.settingProvider.setting.rounds,
      // },
      regencies: {
        title: 'Danh sách chức vụ',
        placeholderSearch: 'Tìm kiếm chức vụ',
        filter_default: ["name", "description"],
        attributes: [
          { name: "description", label: 'Mô tả' },
        ],
        mainAttribute: 'name',
        data: this.settingProvider.setting.regencies,
      },
      roles: {
        title: 'Danh sách phân quyền',
        placeholderSearch: 'Tìm kiếm phân quyền',
        filter_default: ["name", "description"],
        attributes: [
          { name: "description", label: 'Mô tả' },
        ],
        mainAttribute: 'name',
        data: this.settingProvider.setting.roles,
        extraButtons: [
          {
            title: 'Thiết lập phân quyền',
            color: 'main',
            handler(nav: NavController, data) {
              nav.push(SettingRolePage, data);
            }
          }
        ]
      },
      matingRole: {
        title: 'Danh sách luật phối',
        placeholderSearch: 'Tìm kiếm luật phối',
        filter_default: ["fatherBreedName", "motherBreedName", "childBreedName", "birthStatusEstimate"],
        attributes: [
          { name: "fatherBreedName", label: 'Giống đực' },
          { name: "motherBreedName", label: 'Giống cái' },
          { name: "childBreedName", label: 'Kết quả phối' },
          { name: "birthStatusEstimate", label: 'Trạng thái sinh dự kiến' },
        ],
        mainAttribute: 'name',
        data: this.settingProvider.setting.matingRoles,
        customData(matingRoles: Array<matingRole>) {
          matingRoles.forEach((role) => {
            role['fatherBreedName'] = role.father.name.concat('-').concat(role.father.symbol);
            role['motherBreedName'] = role.mother.name.concat('-').concat(role.mother.symbol);
            role['childBreedName'] = role.child.name.concat('-').concat(role.child.symbol);
          })
        }
      },
    }

    this.list_keys = Object.keys(this.list_settings);
  }

  ngAfterViewInit() {
    if (this.slider)
      this.slider.autoHeight = true;

    let element: any = document.getElementsByClassName('setting-util-component');
    for (let i = 0; i < element.length; i++) {
      this.renderer.setElementStyle(element[i], 'height', 90 + 'vH');
    }
  }

  scrollToView(idx: number) {
    this.slider.slideTo(idx);
  }


  create(item) {
    item.create(this.navCtrl);
  }

  edit(item, data) {
    item.edit(this.navCtrl, data);
  }

  openPage(item) {
    this.navCtrl.push(SettingUtilComponent, { options: item });
  }
}