import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events, ViewController, Platform } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { medicineWarehouse } from '../../common/entity';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { SettingsProvider } from '../../providers/settings/settings';
import { ValidateNumber } from '../../validators/number.validator';

@IonicPage()
@Component({
  selector: 'page-medicine-warehouse-input',
  templateUrl: 'medicine-warehouse-input.html',
})
export class MedicineWarehouseInputPage {

  
  public credentialsForm: FormGroup;
  public submitAttempt: boolean = false;

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
    if (this.navParams.data.invoice) {
      this.medicineWarehouse.invoiceID = this.navParams.data.invoice.id;
      this.medicineWarehouse['farmId'] = this.navParams.data.invoice.destination.id;
    }

    this.credentialsForm = this.formBuilder.group({
      id: this.medicineWarehouse.id,
      warehouse_id: [this.medicineWarehouse.warehouse_id, Validators.compose([Validators.required])],
      medicine_id: [this.medicineWarehouse.medicine_id, Validators.compose([Validators.required])],
      invoiceId: this.medicineWarehouse.invoiceID,
      parentId: this.medicineWarehouse.parentId,
      unit_id: [this.medicineWarehouse.unit_id, Validators.compose([Validators.required])],
      quantity: [this.medicineWarehouse.quantity, Validators.compose([Validators.required, ValidateNumber])],
      total: this.medicineWarehouse.total,
      used: this.medicineWarehouse.used,
      remain: this.medicineWarehouse.remain,
      manufacturer: [this.medicineWarehouse.manufacturer, Validators.compose([Validators.required])],
      mfgDate: [this.medicineWarehouse.mfgDate, Validators.compose([Validators.required])],
      expiryDate: [this.medicineWarehouse.expiryDate, Validators.compose([Validators.required])],
    });
  }

  ionViewDidLoad() {
    this.init();
  }


  onSubmit() {
    this.submitAttempt = true;
    if(this.credentialsForm.valid){
      Object.keys(this.credentialsForm.value).forEach((attr)=>{
        this.medicineWarehouse[attr] = this.credentialsForm.value[attr];
      });

      this.events.publish('createMedicineWarehouse',this.medicineWarehouse);
      this.events.subscribe('OK',()=>{
        this.viewCtrl.dismiss();
        this.events.unsubscribe('OK');
      })
    }
  }

  public warehouses: Array<{ name: string, value: string }> = [];
  public medicines: Array<{ name: string, value: string }> = [];
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
    this.medicines = this.deployData.get_medicine_list_for_select();
  }

}
