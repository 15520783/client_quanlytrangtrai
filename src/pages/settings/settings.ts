import { Component, ViewChild, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Events, Platform } from 'ionic-angular';
import { EmployeesProvider } from '../../providers/employees/employees';
import { PregnancyStatusRole } from '../../role-input/pregnancy_status';
import { SettingsProvider } from '../../providers/settings/settings';
import { BreedsRole } from '../../role-input/breeds';
import { BreedingTypesRole } from '../../role-input/breeding_type';
import { SettingUtilComponent } from '../../components/setting-util/setting-util';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})

export class SettingsPage {
  @ViewChild('slider') slider: Slides;


  public list_settings: any;
  public list_keys: any = [];
  public foods_temp:any = [];
  public medicines_temp:any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public employeeProvider: EmployeesProvider,
    public events: Events,
    public renderer: Renderer,
    public settingProvider: SettingsProvider,
    public platform: Platform
  ) {
    this.settingProvider.setting.foods.forEach((food,idx)=>{
      this.foods_temp.push(food);
      this.foods_temp[idx].typeName = food.type.name;
    })

    this.settingProvider.setting.medicines.forEach((medicine,idx)=>{
      this.medicines_temp.push(medicine);
      this.medicines_temp[idx].typeName = medicine.type.name;
    })

    this.list_settings = {
      pregnancyStatus: {
        title: 'Trạng thái mang thai',
        placeholderSearch: 'Tìm kiếm trạng thái mang thai',
        filter_default: ["name", "description"],
        attributes: [
          { name: "description", label: 'Mô tả' },
        ],
        mainAttribute: 'name',
        data: this.settingProvider.setting.pregnancyStatus,
        roleInput:new PregnancyStatusRole(this.settingProvider),        
      },
      breeds: {
        title: 'Danh sách giống',
        placeholderSearch: 'Tìm kiếm giống',
        filter_default: ["name","lineCode","symbol","code","level","line", "description"],
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
        roleInput:new BreedsRole(),
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
        roleInput:new BreedingTypesRole(),
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
      },
      diseases: {
        title: 'Danh sách bệnh',
        placeholderSearch: 'Tìm kiếm bệnh',
        filter_default: ["name","agent","symptom","diagnose","treatment","note", "description"],
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
      },
      foods: {
        title: 'Danh sách thức ăn cho heo',
        placeholderSearch: 'Tìm kiếm thức ăn',
        filter_default: ["name","foodCode","typeName","useFor","guide", "description"],
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
        filter_default: ["name","quantity","description"],
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
        filter_default: ["name","medicineCode","typeName","useFor","guide","description"],
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
      priceCodes: {
        title: 'Danh sách mã sản phẩm',
        placeholderSearch: 'Tìm kiếm mã sản phẩm',
        filter_default: ["name", "description"],
        attributes: [
          { name: "description", label: 'Mô tả' },
        ],
        mainAttribute: 'name',
        data: this.settingProvider.setting.priceCodes,
      },
      footType: {
        title: 'Danh sách loại chân',
        placeholderSearch: 'Tìm kiếm loại chân',
        filter_default: ["name", "description"],
        attributes: [
          { name: "description", label: 'Mô tả' },
        ],
        mainAttribute: 'name',
        data: this.settingProvider.setting.foodType,
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
        filter_default: ["name","symptom","lesions","description"],
        attributes: [
          { name: "agent", label: 'Tác nhân' },
          { name: "symptom", label: 'Triệu chứng' },
          { name: "lesions", label: 'Đặc điểm' },
          { name: "description", label: 'Mô tả' },
        ],
        mainAttribute: 'name',
        data: this.settingProvider.setting.issues,
      },
      markTypes: {
        title: 'Danh sách loại đánh dấu',
        placeholderSearch: 'Tìm kiếm loại đánh dấu',
        filter_default: ["name", "description"],
        attributes: [
          { name: "description", label: 'Mô tả' },
        ],
        mainAttribute: 'name',
        data: this.settingProvider.setting.markTypes,
      },
      roles: {
        title: 'Danh sách chức vụ',
        placeholderSearch: 'Tìm kiếm chức vụ',
        filter_default: ["name", "description"],
        attributes: [
          { name: "description", label: 'Mô tả' },
        ],
        mainAttribute: 'name',
        data: this.settingProvider.setting.roles,
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

  edit(item,data){
    item.edit(this.navCtrl,data);
  }

  openPage(item){
    this.navCtrl.push(SettingUtilComponent,{options:item});
  }
}
