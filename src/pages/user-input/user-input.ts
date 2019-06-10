import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Component } from '@angular/core';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { Utils } from '../../common/utils';
import { user } from '../../common/entity';

@IonicPage()
@Component({
  selector: 'page-user-input',
  templateUrl: 'user-input.html',
})
export class UserInputPage {

  public credentialsForm: FormGroup;
  public submitAttempt: boolean = false;
  public updateMode: boolean = false;

  public user = new user();
  public roles: Array<any> = [];


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public deployData: DeployDataProvider,
    public util: Utils
  ) {
    this.roles = this.deployData.get_role_list_for_select();
    if (this.navParams.data.user) {
      this.user = this.navParams.data.user;
      this.user['roleId'] = this.user.role.id;
    }
    if (this.navParams.data.employeeId) {
      console.log(this.navParams.data.employeeId);
      this.user.employee.id = this.navParams.data.employeeId;
      console.log(this.user);
    }
    this.credentialsForm = this.formBuilder.group({
      id: this.user.id,
      username: [this.user.username, Validators.compose([Validators.required, Validators.maxLength(1000)])],
      password: [this.user.password, Validators.compose([Validators.required, Validators.maxLength(1000)])],
      roleId: [this.user.role.id, Validators.compose([Validators.required])]
    });

    if (this.navParams.data.updateMode) {
      this.updateMode = true;
      this.user = this.navParams.data.user;
      Object.keys(this.credentialsForm.value).forEach((attr) => {
        this.credentialsForm.controls[attr].setValue(this.user[attr]);
      })
    }
  }

  ionViewDidLoad() {}

  onSubmit() {
    this.submitAttempt = true;
    console.log(this.credentialsForm.value);
    if (this.credentialsForm.valid) {
      Object.keys(this.credentialsForm.value).forEach((attr) => {
        this.user[attr] = this.credentialsForm.value[attr];
      });
      this.user.role = this.deployData.get_role_by_id(this.credentialsForm.value.roleId);
      this.navParams.get('callback')(this.user);
    }
  }
}
