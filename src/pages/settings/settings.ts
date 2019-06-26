import { Component, Renderer, ViewChild } from '@angular/core';
import { Events, IonicPage, NavController, NavParams, Platform, Slides } from 'ionic-angular';
import { customers, matingRole, medicineUnits } from '../../common/entity';

import { BreedingTypesRole } from '../../role-input/breeding_type';
import { BreedsRole } from '../../role-input/breeds';
import { CustomerGroupsRole } from '../../role-input/customer_group';
import { CustomerRole } from '../../role-input/customer';
import { CustomerTypesRole } from '../../role-input/customer_type';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { DiseasesRole } from '../../role-input/diseases';
import { EmployeesProvider } from '../../providers/employees/employees';
import { FarmTypesRole } from '../../role-input/farm_type';
import { FoodRole } from '../../role-input/food';
import { FoodTypeRole } from '../../role-input/food_type';
import { FoodUnitsRole } from '../../role-input/food_unit';
import { FootTypeRole } from '../../role-input/footType';
import { GentialTypeRole } from '../../role-input/gentialType';
import { HealthStatusRole } from '../../role-input/healthStatus';
import { IssueRole } from '../../role-input/issue';
import { MatingRoleRole } from '../../role-input/mating_role';
import { MedicineRole } from '../../role-input/medicine';
import { MedicineTypeRole } from '../../role-input/medicine_type';
import { MedicineUnitRole } from '../../role-input/medicine_unit';
import { PartnersRole } from '../../role-input/partner';
import { PregnancyStatusRole } from '../../role-input/pregnancy_status';
import { RegencyRole } from '../../role-input/regency';
import { RolePermissionRole } from '../../role-input/role';
import { SettingRolePage } from '../setting-role/setting-role';
import { SettingUtilComponent } from '../../components/setting-util/setting-util';
import { SettingsProvider } from '../../providers/settings/settings';
import { StatusPigRole } from '../../role-input/statusPig';
import { UserProvider } from '../../providers/user/user';
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
    public deployData: DeployDataProvider,
    public userProvider: UserProvider
  ) {
    let unit_medicine_util = this.deployData.get_object_list_key_of_medicineUnit();
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
        permission: this.userProvider.rolePermission.ROLE_thiet_lap_danh_sach_loai_khach_hang
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
        permission: this.userProvider.rolePermission.ROLE_thiet_lap_danh_sach_nhom_khach_hang
      },
      customers: {
        title: 'Danh sách khách hàng',
        placeholderSearch: 'Tìm kiếm khách hàng',
        filter_default: ["name", "typeName", "groupName", "phone", "email", "address", "companyAddress", "fax", "bank", "description"],
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
        permission: this.userProvider.rolePermission.ROLE_thiet_lap_danh_sach_khach_hang,
        customData(customerRole: Array<customers>) {
          customerRole.forEach((role) => {
            role['typeId'] = role.type ? role.type.id : '';
            role['groupId'] = role.type ? role.group.id : '';
            role['typeName'] = role.type ? role.type.name : '';
            role['groupName'] = role.group ? role.group.name : '';
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
        permission: this.userProvider.rolePermission.ROLE_thiet_lap_danh_sach_doi_tac
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
        permission: this.userProvider.rolePermission.ROLE_thiet_lap_trang_thai_mang_thai
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
        permission: this.userProvider.rolePermission.ROLE_thiet_lap_danh_sach_giong
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
        permission: this.userProvider.rolePermission.ROLE_thiet_lap_loai_len_giong
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
        roleInput: new HealthStatusRole(this.settingProvider, this.deployData),
        permission: this.userProvider.rolePermission.ROLE_thiet_lap_trang_thai_suc_khoe
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
        ],
        permission: this.userProvider.rolePermission.ROLE_thiet_lap_danh_sach_benh
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
        permission: this.userProvider.rolePermission.ROLE_thiet_lap_danh_sach_loai_trang_trai
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
        permission: this.userProvider.rolePermission.ROLE_thiet_lap_danh_sach_loai_kho
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
        permission: this.userProvider.rolePermission.ROLE_thiet_lap_danh_sach_loai_thuc_an
      },
      foodUnits: {
        title: 'Danh sách đơn vị cám',
        placeholderSearch: 'Tìm kiếm đơn vị cám',
        filter_default: ["name", "quantity", "description"],
        attributes: [
          { name: "quantity", label: 'Trọng lượng( kg )' },
          { name: "description", label: 'Mô tả' },
        ],
        mainAttribute: 'name',
        data: this.settingProvider.setting.foodUnits,
        roleInput: new FoodUnitsRole(this.settingProvider),
        permission: this.userProvider.rolePermission.ROLE_thiet_lap_don_vi_cam
      },
      foods: {
        title: 'Danh sách cám cho heo',
        placeholderSearch: 'Tìm kiếm cám',
        filter_default: ["name", "foodCode", "typeName", "useFor", "guide", "description"],
        attributes: [
          { name: "foodCode", label: 'Mã cám' },
          { name: "typeName", label: 'Loại cám' },
          { name: "useFor", label: 'Dùng cho' },
          { name: "guide", label: 'Hướng dẫn' },
          { name: "description", label: 'Mô tả' },
        ],
        mainAttribute: 'name',
        data: this.foods_temp,
        roleInput: new FoodRole(this.settingProvider, this.deployData),
        customData(customerRole: Array<customers>) {
          customerRole.forEach((role) => {
            role['typeId'] = role.type ? role.type.id : '';
          })
        },
        permission: this.userProvider.rolePermission.ROLE_thiet_lap_danh_sach_cam
      },
      medicineType: {
        title: 'Danh sách loại thuốc',
        placeholderSearch: 'Tìm kiếm loại thuốc',
        filter_default: ["name", "description"],
        attributes: [
          { name: "description", label: 'Mô tả' },
        ],
        mainAttribute: 'name',
        data: this.settingProvider.setting.medicineType,
        roleInput: new MedicineTypeRole(this.settingProvider),
        permission: this.userProvider.rolePermission.ROLE_thiet_lap_nhom_thuoc
      },
      medicineUnits: {
        title: 'Danh sách đơn vị thuốc',
        placeholderSearch: 'Tìm kiếm đơn vị thuốc',
        filter_default: ["name", "quantity", "description"],
        attributes: [
          { name: "quantityDisplay", label: 'Trọng lượng' },
          { name: "description", label: 'Mô tả' },
        ],
        mainAttribute: 'name',
        data: this.settingProvider.setting.medicineUnits,
        roleInput: new MedicineUnitRole(this.settingProvider, this.deployData),
        customData(medicineUnitRole: Array<medicineUnits>) {
          medicineUnitRole.forEach((e) => {
            e['quantityDisplay'] = e.quantity + ' ( ' + unit_medicine_util[e.baseUnit].name + ' ) ';
          })
        },
        permission: this.userProvider.rolePermission.ROLE_thiet_lap_danh_sach_don_vi_thuoc
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
        roleInput: new MedicineRole(this.settingProvider, this.deployData),
        permission: this.userProvider.rolePermission.ROLE_thiet_lap_danh_sach_thuoc
      },
      footType: {
        title: 'Danh sách loại chân',
        placeholderSearch: 'Tìm kiếm loại chân',
        filter_default: ["name", "description"],
        attributes: [
          { name: "description", label: 'Mô tả' },
        ],
        mainAttribute: 'name',
        data: this.settingProvider.setting.footType,
        roleInput: new FootTypeRole(this.settingProvider),
        permission: this.userProvider.rolePermission.ROLE_thiet_lap_loai_chan
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
        roleInput: new GentialTypeRole(this.settingProvider),
        permission: this.userProvider.rolePermission.ROLE_thiet_lap_loai_bo_phan_sinh_duc
      },
      issues: {
        title: 'Danh sách triệu chứng lâm sàn',
        placeholderSearch: 'Tìm kiếm lâm sàn',
        filter_default: ["name", "symptom", "lesions", "description"],
        attributes: [
          { name: "level", label: 'Mức độ' },
          { name: "agent", label: 'Tác nhân' },
          { name: "lesions", label: 'Đặc điểm' },
          { name: "description", label: 'Mô tả' },
        ],
        mainAttribute: 'symptom',
        data: this.settingProvider.setting.issues,
        roleInput: new IssueRole(this.settingProvider),
        permission: this.userProvider.rolePermission.ROLE_thiet_lap_danh_sach_trieu_chung_lam_San
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
        permission: this.userProvider.rolePermission.ROLE_thiet_lap_danh_sach_trang_thai_heo
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
        roleInput: new RegencyRole(this.settingProvider),
        permission: this.userProvider.rolePermission.ROLE_thiet_lap_danh_sach_chuc_vu
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
        roleInput: new RolePermissionRole(this.settingProvider),
        permission: this.userProvider.rolePermission.ROLE_thiet_lap_danh_sach_phan_quyen,
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
          { name: "description", label: 'Mô tả' },
        ],
        mainAttribute: 'name',
        data: this.settingProvider.setting.matingRoles,
        roleInput: new MatingRoleRole(this.settingProvider, this.deployData),
        customData(matingRoles: Array<matingRole>) {
          matingRoles.forEach((role) => {
            role.fatherId = role.father.id;
            role.motherId = role.mother.id;
            role.childId = role.child.id;
            role['fatherBreedName'] = role.father.name.concat('-').concat(role.father.symbol);
            role['motherBreedName'] = role.mother.name.concat('-').concat(role.mother.symbol);
            role['childBreedName'] = role.child.name.concat('-').concat(role.child.symbol);
          })
        },
        permission: this.userProvider.rolePermission.ROLE_thiet_lap_luat_phoi
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