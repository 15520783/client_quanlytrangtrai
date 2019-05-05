import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavParams, NavController, Events } from 'ionic-angular';
import { ValidateEmail } from '../../validators/email.validator';
import { ValidateNumber } from '../../validators/number.validator';
import { Utils } from '../../common/utils';
import { KEY } from '../../common/const';
import { SettingsProvider } from '../../providers/settings/settings';

@Component({
  selector: 'setting-input-util',
  templateUrl: 'setting-input-util.html'
})


export class SettingInputUtilComponent {



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
      console.log(this.roleInput.object);

      if (this.navParams.data.insertMode) {
        this.roleInput.insert()
          .then((data: any) => {
            if (data) {
              this.util.getKey(KEY.SETTINGS).then((setting) => {
                if (setting) {
                  setting[this.roleInput.keySettingStorage].push(data);
                  this.util.setKey(KEY.SETTINGS, setting).then(() => {
                    this.settingProvider.setting = setting;
                    this.events.publish('callback', setting[this.roleInput.keySettingStorage]);
                  })
                }
              })
              this.navCtrl.pop();
            }
          })
          .catch((err: Error) => {})
      }

      if(this.navParams.data.editMode){
        this.roleInput.update()
          .then((data: any) => {
            if (data) {
              this.util.getKey(KEY.SETTINGS).then((setting) => {
                if (setting) {
                  let idx = setting[this.roleInput.keySettingStorage].findIndex(obj => obj.id == data.id);
                  setting[this.roleInput.keySettingStorage][idx] = data;
                  this.util.setKey(KEY.SETTINGS, setting).then(() => {
                    this.settingProvider.setting = setting;
                    this.events.publish('callback', setting[this.roleInput.keySettingStorage]);
                  })
                }
              })
              this.navCtrl.pop();
            }
          })
          .catch((err: Error) => {})
      }
    }

  }

  ngAfterContentInit(): void {

    this.navParams.data.roleInput.inputRole.forEach(e => {
      this.credentialsForm.controls[e.name].setValue(this.roleInput.object[e.name]);
    })
  }

}
