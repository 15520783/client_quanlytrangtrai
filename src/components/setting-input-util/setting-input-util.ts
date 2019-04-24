import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavParams } from 'ionic-angular';
import { ValidateEmail } from '../../validators/email.validator';
import { ValidateNumber } from '../../validators/number.validator';

@Component({
  selector: 'setting-input-util',
  templateUrl: 'setting-input-util.html'
})


export class SettingInputUtilComponent {

  // @Input() title: string = 'Nhập thông tin';
  // @Input() InputObjects: any = [];
  // @Input() groupFormBuild: any;

  public title: string = 'Nhập thông tin';
  public InputObjects: any = [];
  public groupFormBuild: any = {};
  public object: any = {};

  public submitAttempt: boolean = false;
  credentialsForm: FormGroup;

  constructor(
    public navParams: NavParams,
    public formBuilder: FormBuilder
  ) {
    if (this.navParams.data) {
      this.title = this.navParams.data.title;
      this.InputObjects = this.navParams.data.InputObjects;
      this.object = this.navParams.data.object;
      console.log(this.navParams.data.object);
    }
    this.navParams.data.InputObjects.forEach(e => {
      this.groupFormBuild[e.name] = [
        this.navParams.data.object[e.name],
        Validators.compose([
          e.isRequire ? Validators.required : null,
          e.isMaxlength ? Validators.maxLength(e.maxlength) : null,
          e.isMailFormat ? ValidateEmail : null,
          e.isNumber ? ValidateNumber : null
        ])
      ]
    })

    this.credentialsForm = this.formBuilder.group(this.groupFormBuild);
    console.log('Hello SettingInputUtilComponent Component');
  }

  onSubmit() {
    this.submitAttempt = true;
    console.log(this.credentialsForm.value);
    console.log(this.InputObjects);
  }
}
