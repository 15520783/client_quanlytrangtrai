import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, NavParams, Events } from 'ionic-angular';
import { Utils } from '../../common/utils';
import { ValidateEmail } from '../../validators/email.validator';
import { ValidateNumber } from '../../validators/number.validator';

@Component({
  selector: 'invoice-input-util',
  templateUrl: 'invoice-input-util.html'
})
export class InvoiceInputUtilComponent {

  public title: string = 'Nhập thông tin';
  public roleInput: { inputRole: any, object: any, headerTitle: any, keySettingStorage: string, insert(),update() };
  public groupFormBuild: any = {};
  public submitAttempt: boolean = false;
  credentialsForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public util: Utils,
    public events: Events
  ) {
    if (this.navParams.data) {
      this.roleInput = this.navParams.data.roleInput;
      if (this.navParams.data.insertMode) {
        this.title = this.navParams.data.roleInput.headerTitle.insertMode;
      }
      if (this.navParams.data.editMode) {
        this.title = this.navParams.data.roleInput.headerTitle.updateMode;
      }

    }

    this.navParams.data.roleInput.inputRole.forEach(e => {
      this.groupFormBuild[e.name] = [
        this.navParams.data.roleInput.object[e.name],
        Validators.compose([
          e.isRequire ? Validators.required : null,
          e.isMaxlength ? Validators.maxLength(e.maxlength) : null,
          e.isMailFormat ? ValidateEmail : null,
          e.isNumber ? ValidateNumber : null
        ])
      ]
    })

    this.credentialsForm = this.formBuilder.group(this.groupFormBuild);
  }

  ngAfterContentInit(): void {

    this.navParams.data.roleInput.inputRole.forEach(e => {
      this.credentialsForm.controls[e.name].setValue(this.roleInput.object[e.name]);
    })
  }

  onSubmit() {
    this.submitAttempt = true;
    if (this.credentialsForm.valid) {
      this.roleInput.inputRole.forEach(e => {
        this.roleInput.object[e.name] = this.credentialsForm.controls[e.name].value;
      });
      

      if (this.navParams.data.insertMode) {
        this.roleInput.insert()
          .then((data: any) => {
            if (data) {
              this.events.publish('callback', data);
              this.navCtrl.pop();
            }
          })
          .catch((err: Error) => {})
      }

      if(this.navParams.data.editMode){
        this.roleInput.update()
          .then((data: any) => {
            if (data) {
              this.events.publish('callback',data);
              this.navCtrl.pop();
            }
          })
          .catch((err: Error) => {
          })
      }
    }

  }
}
