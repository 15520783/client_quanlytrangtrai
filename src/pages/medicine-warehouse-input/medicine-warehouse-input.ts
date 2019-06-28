import { Events, IonicPage, ModalController, NavController, NavParams, Platform, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Component } from '@angular/core';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { SettingsProvider } from '../../providers/settings/settings';
import { ValidateNumber } from '../../validators/number.validator';
import { medicineWarehouse } from '../../common/entity';

@IonicPage()
@Component({
  selector: 'page-medicine-warehouse-input',
  templateUrl: 'medicine-warehouse-input.html',
})
export class MedicineWarehouseInputPage {


  public credentialsForm: FormGroup;
  public submitAttempt: boolean = false;
  public medicines: Array<any> = [];

  public medicineWarehouse = new medicineWarehouse();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public modalCtrl: ModalController,
    public platform: Platform,
    public deployData: DeployDataProvider,
    public settingProvider: SettingsProvider,
    public events: Events,
    public viewCtrl: ViewController
  ) {
    this.medicines = this.settingProvider.setting.medicines;
    if (this.navParams.data.invoice) {
      this.medicineWarehouse.invoice = this.navParams.data.invoice;
      this.medicineWarehouse['farmId'] = this.navParams.data.invoice.destination.id;
    }

    this.credentialsForm = this.formBuilder.group({
      id: this.medicineWarehouse.id,
      warehouse_id: [this.medicineWarehouse.warehouse_id, Validators.compose([Validators.required])],
      medicine: [this.medicineWarehouse.medicine, Validators.compose([Validators.required])],
      invoice: this.medicineWarehouse.invoice,
      parentId: this.medicineWarehouse.parentId,
      unit_id: [this.medicineWarehouse.unit_id, Validators.compose([Validators.required])],
      quantity: this.medicineWarehouse.quantity,
      unitPrice: [this.medicineWarehouse.unitPrice, Validators.compose([Validators.required, ValidateNumber])],
      totalPrice:this.medicineWarehouse.totalPrice,
      total: [this.medicineWarehouse.total, Validators.compose([Validators.required, ValidateNumber])],
      used: this.medicineWarehouse.used,
      remain: this.medicineWarehouse.remain,
      manufacturer: [this.medicineWarehouse.manufacturer, Validators.compose([Validators.required])],
      mfgDate: [this.medicineWarehouse.mfgDate, Validators.compose([Validators.required])],
      expiryDate: [this.medicineWarehouse.expiryDate, Validators.compose([Validators.required])],
    });

    if (this.navParams.data.medicineWarehouse) {
      this.medicineWarehouse = this.navParams.data.medicineWarehouse;
      this.medicineWarehouse['farmId'] = this.medicineWarehouse.warehouse.manager.farm.id;
      this.medicineWarehouse.warehouse_id = this.medicineWarehouse.warehouse.id;
      // this.medicineWarehouse.medicine_id = this.medicineWarehouse.medicine.id;
      this.medicineWarehouse.medicine = this.medicineWarehouse.medicine;
      this.medicineWarehouse.unit_id = this.medicineWarehouse.unit.id;
      this.medicineWarehouse.mfgDate = new Date(this.medicineWarehouse.mfgDate).toISOString();
      this.medicineWarehouse.expiryDate = new Date(this.medicineWarehouse.expiryDate).toISOString();

      Object.keys(this.credentialsForm.value).forEach((attr) => {
        this.credentialsForm.controls[attr].setValue(this.medicineWarehouse[attr]);
      });
    }
  }

  ionViewDidLoad() {
    this.init();
  }


  onSubmit() {
    this.submitAttempt = true;
    if (this.credentialsForm.valid) {
      Object.keys(this.credentialsForm.value).forEach((attr) => {
        this.medicineWarehouse[attr] = this.credentialsForm.value[attr];
      });
      this.navParams.get('callback')(this.medicineWarehouse);
    }
  }

  public warehouses: Array<{ name: string, value: string }> = [];
  // public medicines: Array<{ name: string, value: string }> = [];
  public unit: Array<{ name: string, value: string }> = [];
  public selectOptions: any;

  init() {
    this.selectOptions = {
      cssClass: 'ion-popover'
    }

    this.deployData.get_medicine_warehouse_of_farm(this.medicineWarehouse['farmId']).forEach((warehouse) => {
      this.warehouses.push({
        name: warehouse.name,
        value: warehouse.id
      })
    });

    this.unit = this.deployData.get_medicineUnit_list_for_select();
    // this.medicines = this.deployData.get_medicine_list_for_select();
  }

}