import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FarmsProvider } from '../../providers/farms/farms';
import { farm } from '../../common/entity';
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
    { name: 'Chức vụ 1', value: 1 },
    { name: 'Chức vụ 2', value: 2 },
    { name: 'Chức vụ 3', value: 3 },
    { name: 'Chức vụ 4', value: 4 },
    { name: 'Chức vụ 5', value: 5 },
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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public farmProvider: FarmsProvider
  ) {
    this.farmProvider.farms.forEach((e: farm) => {
      this.farms.push({
        name: e.name,
        value: e.id
      })
    });

    this.credentialsForm = this.formBuilder.group({
      regency_id: ['', Validators.compose([Validators.required])],
      farm_id: ['', Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required, Validators.maxLength(1000)])],
      type_id: ['', Validators.compose([Validators.required])],
      gender: ['', Validators.compose([Validators.required])],
      birthday: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required, Validators.maxLength(1000)])],
      level: ['', Validators.compose([Validators.required, Validators.maxLength(1000)])],
      email: ['', Validators.compose([Validators.required, Validators.maxLength(1000), ValidateEmail])],
      cmnd: ['', Validators.compose([Validators.required, Validators.maxLength(1000)])],
      date_join: ['', Validators.compose([Validators.required])],
      date_off: ['', Validators.compose([])],
      status: ['', Validators.compose([Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmployeeInputPage');
  }

  onSubmit() {
    this.submitAttempt = true;
    let form = this.credentialsForm;
    let employee: any = {
      id: '',
      regency_id: form.get('regency_id').value,
      farm_id: form.get('farm_id').value,
      name: form.get('name').value,
      type_id: form.get('type_id').value,
      gender: form.get('gender').value,
      birthday: form.get('birthday').value,
      address: form.get('address').value,
      level: form.get('level').value,
      email: form.get('email').value,
      cmnd: form.get('cmnd').value,
      date_join: form.get('date_join').value,
      date_off: form.get('date_off').value,
      status: form.get('status').value,
    };
    console.log(this.credentialsForm.controls.email);
    console.log(employee);
  }
}
