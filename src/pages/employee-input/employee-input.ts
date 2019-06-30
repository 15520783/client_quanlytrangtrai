import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Component } from '@angular/core';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { FarmsProvider } from '../../providers/farms/farms';
import { SettingsProvider } from '../../providers/settings/settings';
import { UserProvider } from '../../providers/user/user';
import { VARIABLE } from '../../common/const';
import { ValidateEmail } from '../../validators/email.validator';
import { ValidateNumber } from '../../validators/number.validator';
import { employee } from '../../common/entity';

@IonicPage()
@Component({
  selector: 'page-employee-input',
  templateUrl: 'employee-input.html',
})
export class EmployeeInputPage {

  public credentialsForm: FormGroup;
  public submitAttempt: boolean = false;
  public personalMode: boolean = false;
  public title: string = 'Nhập thông tin nhân viên';

  public RegencyTypes: any = [];

  public genders: any;

  // public status: any = [
  //   { name: 'Trạng thái 1', value: 1 },
  //   { name: 'Trạng thái 2', value: 2 },
  //   { name: 'Trạng thái 3', value: 3 },
  // ];

  public farms: any = [];

  public employee = new employee();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public farmProvider: FarmsProvider,
    public settingProvider: SettingsProvider,
    public deployData: DeployDataProvider,
    public userProvider: UserProvider
  ) {
    this.RegencyTypes = this.settingProvider.setting.regencies;
    this.RegencyTypes.forEach(element => {
      element['value'] = element.id;
    });

    this.genders = VARIABLE.GENDER_EMPLOYEE;

    if (this.navParams.data.employee) {
      this.employee = this.navParams.data.employee;
      this.employee.birthday = new Date(this.employee.birthday).toISOString();
      this.employee.dateJoin = new Date(this.employee.dateJoin).toISOString();
    }

    if (this.navParams.data.personalMode) {
      this.personalMode = true;
    }

    if (this.navParams.data.title) {
      this.title = this.navParams.data.title;
    }

    this.farms = this.deployData.get_farm_list_for_select();

    this.credentialsForm = this.formBuilder.group({
      regency_id: [this.employee.regency.id, Validators.compose([Validators.required])],
      farm_id: [this.employee.farm.id, Validators.compose([Validators.required])],
      name: [this.employee.name, Validators.compose([Validators.required, Validators.maxLength(1000)])],
      gender: [this.employee.gender, Validators.compose([Validators.required])],
      birthday: [this.employee.birthday, Validators.compose([Validators.required])],
      address: [this.employee.address, Validators.compose([Validators.required, Validators.maxLength(1000)])],
      email: [this.employee.email, Validators.compose([Validators.required, Validators.maxLength(1000), ValidateEmail])],
      cmnd: [this.employee.cmnd, Validators.compose([Validators.required, Validators.maxLength(13),ValidateNumber])],
      dateJoin: [this.employee.dateJoin, Validators.compose([Validators.required])],
    });
  }

  ionViewDidLoad() {
  }

  onSubmit() {
    this.submitAttempt = true;
    if (this.credentialsForm.valid) {
      Object.keys(this.credentialsForm.value).forEach((attr) => {
        this.employee[attr] = this.credentialsForm.value[attr];
      })

      this.employee.regency.id = this.employee['regency_id'];
      this.employee.farm.id = this.employee['farm_id'];

      this.navParams.get('callback')(this.employee);
    }
  }
}
