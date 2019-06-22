import { CONFIG, KEY, MESSAGE } from '../../common/const';
import { Component, ViewChild } from '@angular/core';
import { Content, Events, IonicPage, Menu, MenuController, ModalController, NavController, NavParams, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { diseases, employee, issues, medicineUnits, medicineWarehouse, medicines, usedMedicine } from '../../common/entity';

import { ActivitiesProvider } from '../../providers/activities/activities';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { DiseaseListPage } from '../disease-list/disease-list';
import { SettingsProvider } from '../../providers/settings/settings';
import { Utils } from '../../common/utils';
import { ValidateNumber } from '../../validators/number.validator';
import { WarehousesProvider } from '../../providers/warehouses/warehouses';

@IonicPage()
@Component({
  selector: 'page-used-medicine-input',
  templateUrl: 'used-medicine-input.html',
})
export class UsedMedicineInputPage {
  @ViewChild('menuFilter') menuFilter: Menu;
  @ViewChild('content') content: Content;

  public sectionId: string;
  public farmId: string;

  public credentialsForm1: FormGroup;
  public credentialsForm2: FormGroup;
  public submitAttempt: boolean = false;
  public updateMode: boolean = false;

  public diseases: Array<diseases> = [];
  public forecastDiseases: Array<diseases> = [];
  public forecastMedicines: Array<medicines> = [];
  public medicineWarehouses: Array<medicineWarehouse> = [];
  public unit: Array<any> = [];

  public medicines: Array<medicines> = [];
  public issues: Array<issues> = [];
  public groupByIssues: any;

  // public issuePig = new issuesPigs();
  public usedMedicineList: Array<usedMedicine> = [
    new usedMedicine()
  ];

  public date = '';
  public employee = new employee();
  public disease: diseases;
  public description: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public platform: Platform,
    public util: Utils,
    public modalCtrl: ModalController,
    public settingProvider: SettingsProvider,
    public warehouseProvider: WarehousesProvider,
    public activitiesProvider: ActivitiesProvider,
    public deployData: DeployDataProvider,
    public event: Events,
    public menuCtrl: MenuController
  ) {

    this.util.getKey(KEY.EMPID).then((employeeId) => {
      this.employee.setID(employeeId);
    })

    this.medicines = this.util.deepClone(this.settingProvider.setting.medicines);
    this.medicines.forEach((e: medicines) => {
      e['advised'] = false;
    })

    this.diseases = this.util.deepClone(this.settingProvider.setting.diseases);
    this.diseases.forEach((e: diseases) => {
      e['tiLe'] = 0;
    });

    this.unit = this.deployData.get_medicineUnit_list_for_select();

    if (this.navParams.data.farmId && this.navParams.data.sectionId) {
      this.sectionId = this.navParams.data.sectionId;
      this.farmId = this.navParams.data.farmId;
    }

    if (this.navParams.data.issues && this.navParams.data.groupByIssues) {
      this.issues = this.navParams.data.issues;
      this.groupByIssues = this.navParams.data.groupByIssues;
    }

    this.credentialsForm1 = this.formBuilder.group({
      disease: [this.disease, Validators.compose([Validators.required])],
      date: [this.date, Validators.compose([Validators.required])],
      description: [this.description, Validators.compose([Validators.maxLength(1000)])],
      employee: this.employee,
    });

    this.credentialsForm2 = this.formBuilder.group({});

    this.usedMedicineList.forEach((e, idx) => {
      e['medicineWarehouseList'] = [];
      e['unitsData'] = [];
      this.credentialsForm2.addControl('medicine' + idx, this.formBuilder.control(e.medicine, Validators.compose([Validators.required])));
      this.credentialsForm2.addControl('medicineWarehouse' + idx, this.formBuilder.control(e.medicineWarehouse, Validators.compose([Validators.required])));
      this.credentialsForm2.addControl('unit' + idx, this.formBuilder.control(e.unit, Validators.compose([Validators.required])));
      this.credentialsForm2.addControl('quantity' + idx, this.formBuilder.control(e.quantity, Validators.compose([Validators.required, ValidateNumber])));
    });

    this.getDiseaseList(this.navParams.data.farmId, this.navParams.data.sectionId);
  }

  openReport() {
    this.menuFilter.enable(true);
    this.menuFilter.open();
  }

  closeReport() {
    this.menuCtrl.close();
  }

  /**
   * Lấy danh sách bệnh được chuẩn đoán
   */
  getDiseaseList(farmId, sectionId) {
    if (farmId && sectionId) {
      this.util.openBackDrop();
      return this.settingProvider.getForecastedDiseases(farmId, sectionId)
        .then((diseases) => {
          if (diseases) {
            diseases.forEach(disease => {
              disease.disease['tiLe'] = disease.tiLe;
              this.forecastDiseases.push(disease.disease);
              let idx = this.diseases.findIndex(_disease => _disease.id == disease.disease.id);
              if (idx > -1) {
                this.diseases[idx]['tiLe'] = disease.tiLe;
              }
            })
          }
          this.util.closeBackDrop();
          return diseases;
        })
        .catch((err: Error) => {
          this.util.closeBackDrop();
          this.util.showToast(MESSAGE[CONFIG.LANGUAGE_DEFAULT].ERROR_OCCUR)
          console.log(err);
          return err;
        })
    }

  }

  /**
   * Hiển thị danh sách gợi ý
   */
  showForecast() {
    this.forecastDiseases = [];
    this.getDiseaseList(this.navParams.data.farmId, this.navParams.data.sectionId)
      .then((diseases) => {
        let modal = this.modalCtrl.create(DiseaseListPage,
          {
            diseases: this.forecastDiseases,
            titleHeader: 'Danh sách gợi ý chuẩn đoán bệnh'
          });
        return modal.present();
      });
  }


  diseaseChange(disease: diseases) {
    if (disease) {
      this.util.openBackDrop();
      this.settingProvider.getMedicineOfDiseases(disease.id)
        .then((medicines) => {
          if (medicines.length) {
            this.forecastMedicines = medicines;
            this.medicines.forEach((e: medicines) => {
              e['advised'] = false;
            })
            this.forecastMedicines.forEach((e) => {
              let idx = this.medicines.findIndex(_medicine => _medicine.id == e.id);
              if (idx > -1) {
                this.medicines[idx]['advised'] = true;
              }
            })
          }
          this.util.closeBackDrop();
        })
        .catch(err => {
          this.util.closeBackDrop();
          this.util.showToast(MESSAGE[CONFIG.LANGUAGE_DEFAULT].ERROR_OCCUR);
        })
    }
  }

  medicineChange(farmId: string, medicine: medicines, item, idx) {
    if (medicine) {
      this.util.openBackDrop();
      this.warehouseProvider.getMedicineWarehouseOfMedicine(farmId, medicine.id)
        .then((medicineWarehouses: Array<medicineWarehouse>) => {
          if (medicineWarehouses) {
            item['unitsData'] = [];
            item['medicineWarehouseList'] = medicineWarehouses;
            this.credentialsForm2.controls['medicineWarehouse' + idx].setValue(null);
            this.credentialsForm2.controls['unit' + idx].setValue(null);
            this.credentialsForm2.controls['quantity' + idx].setValue(null);
            this.event.publish('input-select-target:medicineWarehouses', medicineWarehouses);
          }
          this.util.closeBackDrop();
        })
        .catch(err => {
          console.log(err);
          this.util.closeBackDrop();
        })
    }
  }

  changeMedicineWarehouse(medicineWarehouse: medicineWarehouse, item) {
    item.unitsData = this.deployData.get_medicineUnit_list_for_select().filter((unit: medicineUnits) => {
      return unit.baseUnit == medicineWarehouse.unit.baseUnit ? true : false;
    })
  }

  add_usedMedicine() {
    let new_usedMedicine = new usedMedicine();
    this.usedMedicineList.push(new_usedMedicine);
    let idx = this.usedMedicineList.length - 1;
    new_usedMedicine['medicineWarehouseList'] = [];
    this.credentialsForm2.addControl('medicine' + idx, this.formBuilder.control(new_usedMedicine.medicine, Validators.compose([Validators.required])));
    this.credentialsForm2.addControl('medicineWarehouse' + idx, this.formBuilder.control(new_usedMedicine.medicineWarehouse, Validators.compose([Validators.required])));
    this.credentialsForm2.addControl('unit' + idx, this.formBuilder.control(new_usedMedicine.unit, Validators.compose([Validators.required])));
    this.credentialsForm2.addControl('quantity' + idx, this.formBuilder.control(new_usedMedicine.quantity, Validators.compose([Validators.required, ValidateNumber])));
  }

  remove_usedMedicine(idx) {
    // this.issuesList.splice(idx, 1);
    // this.credentialsForm2.value['issueId' + idx].setValue('');

    this.credentialsForm2.removeControl('medicine' + idx);
    this.credentialsForm2.removeControl('medicineWarehouse' + idx);
    this.credentialsForm2.removeControl('unit' + idx);
    this.credentialsForm2.removeControl('quantity' + idx);
  }

  onSubmit() {
    this.submitAttempt = true;
    if (this.credentialsForm1.valid && this.credentialsForm2.valid) {

      this.disease = this.credentialsForm1.value.disease;
      this.date = this.credentialsForm1.value.date;
      this.description = this.credentialsForm1.value.description;

      this.usedMedicineList.forEach((e, idx) => {
        e.medicine = this.credentialsForm2.value['medicine' + idx];
        e.medicineWarehouse = this.credentialsForm2.value['medicineWarehouse' + idx];
        e.unit = this.credentialsForm2.value['unit' + idx];
        e.quantity = this.credentialsForm2.value['quantity' + idx];
        e.diseases = this.disease;
        e.date = this.date;
        e.description = this.description;
        e.employee = this.employee;
      })


      this.usedMedicineList = this.usedMedicineList.filter((used_medicine) => {
        return (used_medicine.medicine &&
          used_medicine.medicineWarehouse &&
          used_medicine.unit &&
          used_medicine.quantity) ? true : false;
      })

      /**
       * Check quantity remain in medicineWarehouse
       */
      let MedicineWarehouse: Array<medicineWarehouse> = [];
      this.usedMedicineList.forEach((usedMedicine: usedMedicine) => {
        if (MedicineWarehouse.findIndex((_e: medicineWarehouse) => _e.id == usedMedicine.medicineWarehouse.id) < 0) {
          MedicineWarehouse.push(usedMedicine.medicineWarehouse);
        }
      })

      let unit_util = this.deployData.get_object_list_key_of_medicineUnit();
      let error: boolean = false;

      MedicineWarehouse.forEach((e) => {
        let usedMedicine = this.usedMedicineList.filter((usedMedicine: usedMedicine) => {
          return usedMedicine.medicineWarehouse.id == e.id;
        })
        let used_quantity = 0;
        let remain_quantity = parseInt(e.remain) * parseInt(e.unit.quantity);
        usedMedicine.forEach((e: usedMedicine) => {
          used_quantity += e.quantity * unit_util[e.unit].quantity;
        })
        if (used_quantity > remain_quantity) {
          this.util.showToast('Khối lượng tồn kho không đủ. Kiểm tra lại số lượng thuốc ' + e.medicine.name);
          error = true;
        }
      })
      /** */
      if (!error) {
        let param = {
          disease: this.disease,
          date: this.date,
          employee: this.employee,
          description: this.description
        }

        let pigs = this.deployData.get_pigs_by_sectionId(this.sectionId);
        let usedMedicineParams: Array<usedMedicine> = [];

        pigs.forEach(pig => {
          this.usedMedicineList.forEach(item => {
            let temp: usedMedicine = this.util.deepClone(item);
            temp.forPigId = pig;
            usedMedicineParams.push(temp);
          })
        });


        this.activitiesProvider.createUsedMedicineList(usedMedicineParams)
          .then((newUsedMedicineList) => {
            if (newUsedMedicineList) {
              this.navParams.get('callback')(newUsedMedicineList);
              this.navCtrl.pop();
            }
          })
          .catch((err) => {
            console.log(err);
          })
      }



    }
  }
}
