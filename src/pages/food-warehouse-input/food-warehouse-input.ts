import { Events, IonicPage, ModalController, NavController, NavParams, Platform, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Component } from '@angular/core';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { SettingsProvider } from '../../providers/settings/settings';
import { ValidateNumber } from '../../validators/number.validator';
import { foodWareHouse } from '../../common/entity';

@IonicPage()
@Component({
  selector: 'page-food-warehouse-input',
  templateUrl: 'food-warehouse-input.html',
})
export class FoodWarehouseInputPage {

  public credentialsForm: FormGroup;
  public submitAttempt: boolean = false;

  public foodWarehouse = new foodWareHouse();

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
      this.foodWarehouse.invoice = this.navParams.data.invoice;
      this.foodWarehouse['farmId'] = this.navParams.data.invoice.destination.id;
    }

    this.credentialsForm = this.formBuilder.group({
      id: this.foodWarehouse.id,
      warehouse_id: [this.foodWarehouse.warehouse_id, Validators.compose([Validators.required])],
      food_id: [this.foodWarehouse.food_id, Validators.compose([Validators.required])],
      invoice: this.foodWarehouse.invoice,
      parentId: this.foodWarehouse.parentId,
      unit_id: [this.foodWarehouse.unit_id, Validators.compose([Validators.required])],
      quantity: this.foodWarehouse.quantity,
      unitPrice:[this.foodWarehouse.unitPrice,Validators.compose([Validators.required,ValidateNumber])],
      totalPrice:this.foodWarehouse.totalPrice,
      total: [this.foodWarehouse.total, Validators.compose([Validators.required, ValidateNumber])],
      used: this.foodWarehouse.used,
      remain: this.foodWarehouse.remain,
      manufacturer: [this.foodWarehouse.manufacturer, Validators.compose([Validators.required])],
      mfgDate: [this.foodWarehouse.mfgDate, Validators.compose([Validators.required])],
      expiryDate: [this.foodWarehouse.expiryDate, Validators.compose([Validators.required])],
    });

    if(this.navParams.data.foodWarehouse){
      this.foodWarehouse = this.navParams.data.foodWarehouse;
      this.foodWarehouse['farmId'] = this.navParams.data.foodWarehouse.warehouse.manager.farm.id;
      this.foodWarehouse.warehouse_id = this.foodWarehouse.warehouse.id;
      this.foodWarehouse.food_id = this.foodWarehouse.food.id;
      this.foodWarehouse.unit_id = this.foodWarehouse.unit.id;
      this.foodWarehouse.mfgDate = new Date (this.foodWarehouse.mfgDate).toISOString();
      this.foodWarehouse.expiryDate = new Date (this.foodWarehouse.expiryDate).toISOString();

      Object.keys(this.credentialsForm.value).forEach((attr) => {
        this.credentialsForm.controls[attr].setValue(this.foodWarehouse[attr]);
      });
    }
  }

  ionViewDidLoad() {
    this.init();
  }


  onSubmit() {
    this.submitAttempt = true;
    if(this.credentialsForm.valid){
      Object.keys(this.credentialsForm.value).forEach((attr)=>{
        this.foodWarehouse[attr] = this.credentialsForm.value[attr];
      });
      this.navParams.get('callback')(this.foodWarehouse);
    }
  }

  public warehouses: Array<{ name: string, value: string }> = [];
  public foods: Array<{ name: string, value: string }> = [];
  public unit: Array<{ name: string, value: string }> = [];
  public selectOptions: any;

  init() {
    this.selectOptions = {
      cssClass: 'ion-popover'
    }

    this.deployData.get_food_warehouse_of_farm(this.foodWarehouse['farmId']).forEach((warehouse) => {
      this.warehouses.push({
        name: warehouse.name,
        value: warehouse.id
      })
    });

    this.foods = this.deployData.get_food_list_for_select();
    this.unit = this.deployData.get_foodUnit_list_for_select();
  }


}
