import { Events, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Component } from '@angular/core';
import { KEY } from '../../common/const';
import { SettingsProvider } from '../../providers/settings/settings';
import { Utils } from '../../common/utils';
import { ValidateEmail } from '../../validators/email.validator';
import { ValidateNumber } from '../../validators/number.validator';

@Component({
  selector: 'setting-input-util',
  templateUrl: 'setting-input-util.html'
})


export class SettingInputUtilComponent {



  public title: string = 'Nhập thông tin';

  public roleInput: { inputRole: any, object: any, headerTitle: any, keySettingStorage: string, insert(), update() };
  public groupFormBuild: any = {};
  public submitAttempt: boolean = false;
  credentialsForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public util: Utils,
    public settingProvider: SettingsProvider,
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
              this.util.getKey(KEY.SETTINGS).then((setting) => {
                if (setting) {
                  if (this.roleInput.keySettingStorage) {
                    setting[this.roleInput.keySettingStorage].push(data);
                    this.util.setKey(KEY.SETTINGS, setting).then(() => {
                      this.settingProvider.setting = setting;
                      this.navParams.get('callback')(setting[this.roleInput.keySettingStorage]);
                    })
                  } else {
                    this.navParams.get('callback')(data);
                  }
                }
              })
            }
          })
          .catch((err: Error) => { })
      }

      if (this.navParams.data.editMode) {
        this.roleInput.update()
          .then((data: any) => {
            if (data) {
              this.util.getKey(KEY.SETTINGS).then((setting) => {
                if (setting) {
                  if (this.roleInput.keySettingStorage) {
                    let idx = setting[this.roleInput.keySettingStorage].findIndex(obj => obj.id == data.id);
                    setting[this.roleInput.keySettingStorage][idx] = data;
                    this.util.setKey(KEY.SETTINGS, setting).then(() => {
                      this.settingProvider.setting = setting;
                      this.navParams.get('callback')(setting[this.roleInput.keySettingStorage]);
                    })
                  } else {
                    this.navParams.get('callback')(data);
                  }
                }
              })
            }
          })
          .catch((err: Error) => { })
      }
    }
  }

  ngAfterContentInit(): void {

    this.navParams.data.roleInput.inputRole.forEach(e => {
      this.credentialsForm.controls[e.name].setValue(this.roleInput.object[e.name]);
    })
  }

}
