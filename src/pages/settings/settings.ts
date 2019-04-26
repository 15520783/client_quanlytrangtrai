import { Component, ViewChild, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Events } from 'ionic-angular';
import { EmployeesProvider } from '../../providers/employees/employees';
import { SettingInputUtilComponent } from '../../components/setting-input-util/setting-input-util';
import { PregnancyStatusRole } from '../../role-input/pregnancy_status';
import { BreedingTypesRole } from '../../role-input/breeding_type';
import { SettingsProvider } from '../../providers/settings/settings';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})

export class SettingsPage {
  @ViewChild('pregnancyStatus') pregnancy_status_ele: any;
  @ViewChild('breedingTypes') breeding_types_ele: any;
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
    public settingProvider: SettingsProvider
  ) {
    console.log(this.settingProvider.setting);
    this.settingProvider.setting.foods.forEach((food,idx)=>{
      this.foods_temp.push(food);
      this.foods_temp[idx].typeName = food.type.name;
    })

    this.settingProvider.setting.medicines.forEach((medicine,idx)=>{
      this.medicines_temp.push(medicine);
      this.medicines_temp[idx].typeName = medicine.type.name;
    })

    this.list_settings = {
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
        create(navCtrl: NavController) {
          let breeding_types_role = new BreedingTypesRole();
          navCtrl.push(SettingInputUtilComponent,
            {
              title: 'Nhập thông tin trạng thái lên giống',
              InputObjects: breeding_types_role.inputRole,
              object: breeding_types_role.breeding_type
            }
          )
        },
        edit(e) {
          if (e) console.log(e);
        },
        remove(e) {
          if (e) console.log(e);
        }
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
        create(navCtrl: NavController) {
          let pregnancy_status_role = new PregnancyStatusRole();
          navCtrl.push(SettingInputUtilComponent,
            {
              title: 'Nhập thông tin trạng thái mang thai',
              InputObjects: pregnancy_status_role.inputRole,
              object: pregnancy_status_role.pregnancy_status,
            }
          )
        },
        edit(e) {
          if (e) console.log(e);
        },
        remove(e) {
          if (e) console.log(e);
        }
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
        create(navCtrl: NavController) {
          let breeding_types_role = new BreedingTypesRole();
          navCtrl.push(SettingInputUtilComponent,
            {
              title: 'Nhập thông tin trạng thái lên giống',
              InputObjects: breeding_types_role.inputRole,
              object: breeding_types_role.breeding_type
            }
          )
        },
        edit(e) {
          if (e) console.log(e);
        },
        remove(e) {
          if (e) console.log(e);
        }
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
        create(navCtrl: NavController) {
          let breeding_types_role = new BreedingTypesRole();
          navCtrl.push(SettingInputUtilComponent,
            {
              title: 'Nhập thông tin trạng thái lên giống',
              InputObjects: breeding_types_role.inputRole,
              object: breeding_types_role.breeding_type
            }
          )
        },
        edit(e) {
          if (e) console.log(e);
        },
        remove(e) {
          if (e) console.log(e);
        }
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
        create(navCtrl: NavController) {
          let breeding_types_role = new BreedingTypesRole();
          navCtrl.push(SettingInputUtilComponent,
            {
              title: 'Nhập thông tin trạng thái lên giống',
              InputObjects: breeding_types_role.inputRole,
              object: breeding_types_role.breeding_type
            }
          )
        },
        edit(e) {
          if (e) console.log(e);
        },
        remove(e) {
          if (e) console.log(e);
        }
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
        create(navCtrl: NavController) {
          let breeding_types_role = new BreedingTypesRole();
          navCtrl.push(SettingInputUtilComponent,
            {
              title: 'Nhập thông tin trạng thái lên giống',
              InputObjects: breeding_types_role.inputRole,
              object: breeding_types_role.breeding_type
            }
          )
        },
        edit(e) {
          if (e) console.log(e);
        },
        remove(e) {
          if (e) console.log(e);
        }
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
        create(navCtrl: NavController) {
          let breeding_types_role = new BreedingTypesRole();
          navCtrl.push(SettingInputUtilComponent,
            {
              title: 'Nhập thông tin trạng thái lên giống',
              InputObjects: breeding_types_role.inputRole,
              object: breeding_types_role.breeding_type
            }
          )
        },
        edit(e) {
          if (e) console.log(e);
        },
        remove(e) {
          if (e) console.log(e);
        }
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
        create(navCtrl: NavController) {
          let breeding_types_role = new BreedingTypesRole();
          navCtrl.push(SettingInputUtilComponent,
            {
              title: 'Nhập thông tin trạng thái lên giống',
              InputObjects: breeding_types_role.inputRole,
              object: breeding_types_role.breeding_type
            }
          )
        },
        edit(e) {
          if (e) console.log(e);
        },
        remove(e) {
          if (e) console.log(e);
        }
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
        create(navCtrl: NavController) {
          let breeding_types_role = new BreedingTypesRole();
          navCtrl.push(SettingInputUtilComponent,
            {
              title: 'Nhập thông tin trạng thái lên giống',
              InputObjects: breeding_types_role.inputRole,
              object: breeding_types_role.breeding_type
            }
          )
        },
        edit(e) {
          if (e) console.log(e);
        },
        remove(e) {
          if (e) console.log(e);
        }
      },
      medicineUnits: {
        title: 'Danh sách bệnh',
        placeholderSearch: 'Tìm kiếm bệnh',
        filter_default: ["name","quantity","description"],
        attributes: [
          { name: "quantity", label: 'Số lượng' },
          { name: "description", label: 'Mô tả' },
        ],
        mainAttribute: 'name',
        data: this.settingProvider.setting.medicineUnits,
        create(navCtrl: NavController) {
          let breeding_types_role = new BreedingTypesRole();
          navCtrl.push(SettingInputUtilComponent,
            {
              title: 'Nhập thông tin trạng thái lên giống',
              InputObjects: breeding_types_role.inputRole,
              object: breeding_types_role.breeding_type
            }
          )
        },
        edit(e) {
          if (e) console.log(e);
        },
        remove(e) {
          if (e) console.log(e);
        }
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
        create(navCtrl: NavController) {
          let breeding_types_role = new BreedingTypesRole();
          navCtrl.push(SettingInputUtilComponent,
            {
              title: 'Nhập thông tin trạng thái lên giống',
              InputObjects: breeding_types_role.inputRole,
              object: breeding_types_role.breeding_type
            }
          )
        },
        edit(e) {
          if (e) console.log(e);
        },
        remove(e) {
          if (e) console.log(e);
        }
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
        create(navCtrl: NavController) {
          let breeding_types_role = new BreedingTypesRole();
          navCtrl.push(SettingInputUtilComponent,
            {
              title: 'Nhập thông tin trạng thái lên giống',
              InputObjects: breeding_types_role.inputRole,
              object: breeding_types_role.breeding_type
            }
          )
        },
        edit(e) {
          if (e) console.log(e);
        },
        remove(e) {
          if (e) console.log(e);
        }
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
        create(navCtrl: NavController) {
          let breeding_types_role = new BreedingTypesRole();
          navCtrl.push(SettingInputUtilComponent,
            {
              title: 'Nhập thông tin trạng thái lên giống',
              InputObjects: breeding_types_role.inputRole,
              object: breeding_types_role.breeding_type
            }
          )
        },
        edit(e) {
          if (e) console.log(e);
        },
        remove(e) {
          if (e) console.log(e);
        }
      },
      gentialType: {
        title: 'Danh sách loại bộ phận sinh dục',
        placeholderSearch: 'Tìm kiếm loại bộ phận sinh dục',
        filter_default: ["name", "description"],
        attributes: [
          { name: "description", label: 'Mô tả' },
        ],
        mainAttribute: 'name',
        data: this.settingProvider.setting.gentialTypes,
        create(navCtrl: NavController) {
          let breeding_types_role = new BreedingTypesRole();
          navCtrl.push(SettingInputUtilComponent,
            {
              title: 'Nhập thông tin trạng thái lên giống',
              InputObjects: breeding_types_role.inputRole,
              object: breeding_types_role.breeding_type
            }
          )
        },
        edit(e) {
          if (e) console.log(e);
        },
        remove(e) {
          if (e) console.log(e);
        }
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
        create(navCtrl: NavController) {
          let breeding_types_role = new BreedingTypesRole();
          navCtrl.push(SettingInputUtilComponent,
            {
              title: 'Nhập thông tin trạng thái lên giống',
              InputObjects: breeding_types_role.inputRole,
              object: breeding_types_role.breeding_type
            }
          )
        },
        edit(e) {
          if (e) console.log(e);
        },
        remove(e) {
          if (e) console.log(e);
        }
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
        create(navCtrl: NavController) {
          let breeding_types_role = new BreedingTypesRole();
          navCtrl.push(SettingInputUtilComponent,
            {
              title: 'Nhập thông tin trạng thái lên giống',
              InputObjects: breeding_types_role.inputRole,
              object: breeding_types_role.breeding_type
            }
          )
        },
        edit(e) {
          if (e) console.log(e);
        },
        remove(e) {
          if (e) console.log(e);
        }
      },
      // { title: 'Danh sách phương pháp phối giống', compt: '' },
      // { title: 'Danh sách lâm sàn', compt: '' },
      // { title: 'Danh sách quyền', compt: '' },
      // { title: 'Danh sách chức vụ', compt: '' },
    }

    this.list_keys = Object.keys(this.list_settings);
  }

  ngAfterViewInit() {
    if (this.slider)
      this.slider.autoHeight = true;
    console.log('ngAfterViewInit FarmInfomationPage');
    // this.events.publish('viewEmployee:open');

    let element: any = document.getElementsByClassName('setting-util-component');
    for (let i = 0; i < element.length; i++) {
      this.renderer.setElementStyle(element[i], 'height', 90 + 'vH');
    }
  }

  ionViewDidLoad() {
    // this.slider.lockSwipes(true);
    console.log('ionViewDidLoad SettingsPage');



  }

  scrollToView(idx: number) {
    this.slider.slideTo(idx);
    // element.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }


  create(item) {
    item.create(this.navCtrl);
  }
}
