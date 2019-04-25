import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FarmsProvider } from '../../providers/farms/farms';
import { farm, employee } from '../../common/entity';
import { ValidateEmail } from '../../validators/email.validator';

@IonicPage()
@Component({
  selector: 'page-employee-input',
  templateUrl: 'employee-input.html',
})
export class EmployeeInputPage {

  public credentialsForm: FormGroup;
  public submitAttempt: boolean = false;

  public RegencyTypes: any = [
    { name: 'Chức vụ 1', value: '1' },
    { name: 'Chức vụ 2', value: '2' },
    { name: 'Chức vụ 3', value: '3' },
    { name: 'Chức vụ 4', value: '4' },
    { name: 'Chức vụ 5', value: '5' },
  ]

  public genders: any = [
    { name: 'Nam', value: 1 },
    { name: 'Nữ', value: 2 }
  ]

  public status: any = [
    { name: 'Trạng thái 1', value: 1 },
    { name: 'Trạng thái 2', value: 2 },
    { name: 'Trạng thái 3', value: 3 },
  ]

  public farms: any = [];

  public employee = new employee();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public farmProvider: FarmsProvider
  ) {

    if(this.navParams.data.employee){
      this.employee = this.navParams.data.employee;
    }

    this.farmProvider.farms.forEach((e: farm) => {
      this.farms.push({
        name: e.name,
        value: e.id
      })
    });

    this.credentialsForm = this.formBuilder.group({
      regency_id: [this.employee.regency.id, Validators.compose([Validators.required])],
      farm_id: [this.employee.farm.id, Validators.compose([Validators.required])],
      name: [this.employee.name, Validators.compose([Validators.required, Validators.maxLength(1000)])],
      gender: [this.employee.gender, Validators.compose([Validators.required])],
      birthday: [this.employee.birthday, Validators.compose([Validators.required])],
      address: [this.employee.address, Validators.compose([Validators.required, Validators.maxLength(1000)])],
      email: [this.employee.email, Validators.compose([Validators.required, Validators.maxLength(1000), ValidateEmail])],
      cmnd: [this.employee.cmnd, Validators.compose([Validators.required, Validators.maxLength(1000)])],
      date_join: [this.employee.dateJoin, Validators.compose([Validators.required])],
      date_off: [this.employee.dateOff, Validators.compose([])],
      status: [this.employee.status, Validators.compose([Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmployeeInputPage');
  }

  onSubmit() {
    this.submitAttempt = true;
    this.employee = this.credentialsForm.value;
  }
}
