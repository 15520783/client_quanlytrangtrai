import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { employee, farm } from '../../common/entity';

import { Component } from '@angular/core';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { EmployeesProvider } from '../../providers/employees/employees';

@IonicPage()
@Component({
  selector: 'page-farm-input',
  templateUrl: 'farm-input.html',
})
export class FarmInputPage {

  public credentialsForm: FormGroup;
  public submitAttempt: boolean = false;
  public FarmTypes: any = [];

  public farm = new farm();
  public employees:Array<employee> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public modalCtrl: ModalController,
    public deployData:DeployDataProvider,
    public employeeProvider:EmployeesProvider
  ) {
    this.FarmTypes = this.deployData.get_farm_types_list_for_select();
    this.employees = this.employeeProvider.employees;
    
    if (this.navParams.data.farm) {
      this.farm = this.navParams.data.farm;
      this.farm.founding = new Date(this.navParams.data.farm.founding).toISOString();
      console.log(new Date(this.navParams.data.farm.founding).toISOString());
    }

    this.credentialsForm = this.formBuilder.group({
      id: this.farm.id,
      name: [this.farm.name, Validators.compose([Validators.required, Validators.maxLength(1000)])],
      type_id: [this.farm.type.id, Validators.compose([Validators.required])],
      address: [this.farm.address, Validators.compose([Validators.required, Validators.maxLength(1000)])],
      area: [this.farm.area, Validators.compose([Validators.required])],
      founding: [this.farm.founding, Validators.compose([Validators.required])],
      manager: [this.farm.manager, Validators.compose([Validators.required])],
      description: [this.farm.description, Validators.compose([Validators.required, Validators.maxLength(1000)])],
    });
  }

  onSubmit() {
    this.submitAttempt = true;
    console.log(this.credentialsForm.value);
    if (this.credentialsForm.valid) {
      Object.keys(this.credentialsForm.value).forEach((attr)=>{
        this.farm[attr] = this.credentialsForm.value[attr];
      })
      this.farm.type.id = this.credentialsForm.value.type_id;
      this.navParams.get('callback')(this.farm);
    }
  }
}
