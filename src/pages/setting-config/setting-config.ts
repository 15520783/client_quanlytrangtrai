import { CONFIG, MESSAGE, SETTING_KEY, VARIABLE } from '../../common/const';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Component } from '@angular/core';
import { SettingsProvider } from '../../providers/settings/settings';
import { Utils } from '../../common/utils';
import { settingConfig } from '../../common/entity';

@IonicPage()
@Component({
  selector: 'page-setting-config',
  templateUrl: 'setting-config.html',
})
export class SettingConfigPage {

  public credentialsForm: FormGroup;
  public submitAttempt: boolean = false;
  public editMode: boolean = false;

  public settingConfig: settingConfig = new settingConfig();
  public defaultTimeoutList: Array<any> = [];
  public syncDelayList: Array<any> = [];


  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public navParams: NavParams,
    public settingProvider: SettingsProvider,
    public util: Utils
  ) {
    this.defaultTimeoutList = VARIABLE.DEFAULT_TIMEOUT_LIST;
    this.syncDelayList = VARIABLE.INTERVALTIME_LIST;

    this.settingConfig.serverApi = CONFIG.SERVER_API;
    this.settingConfig.defaultTimeout = CONFIG.DEFAULT_TIMEOUT;
    this.settingConfig.syncDelayDuration = CONFIG.SYNC_DELAY_DURATION;

    this.credentialsForm = this.formBuilder.group({
      serverApi: [this.settingConfig.serverApi, Validators.compose([Validators.required, Validators.maxLength(1000)])],
      defaultTimeout: [this.settingConfig.defaultTimeout, Validators.compose([Validators.required])],
      syncDelayDuration: [this.settingConfig.syncDelayDuration, Validators.compose([Validators.required])],
    });
  }

  ionViewDidLoad() {

  }

  onSubmit() {
    this.submitAttempt = true;
    if (this.credentialsForm.valid) {
      this.util.openBackDrop();
      Object.keys(this.credentialsForm.value).forEach((attr) => {
        this.settingConfig[attr] = this.credentialsForm.value[attr];
      })
      CONFIG.SERVER_API = this.settingConfig.serverApi;
      CONFIG.DEFAULT_TIMEOUT = this.settingConfig.defaultTimeout;
      CONFIG.SYNC_DELAY_DURATION = this.settingConfig.syncDelayDuration;
      this.util.setKey(SETTING_KEY.SERVER_API, this.settingConfig.serverApi)
        .then(() => {
          this.util.setKey(SETTING_KEY.DEFAULT_REQUEST_TIMEOUT, this.settingConfig.defaultTimeout)
            .then(() => {
              this.util.setKey(SETTING_KEY.INTERVAL_SYNC_DELAY, this.settingConfig.syncDelayDuration)
                .then(() => {
                  this.util.closeBackDrop();
                  this.util.showToastSuccess(MESSAGE[CONFIG.LANGUAGE_DEFAULT].UPDATE_SUCCESS);
                  this.navParams.get('callback')(this.settingConfig);
                })
            })
        })
        .catch((err) => {
          this.util.closeBackDrop();
          console.log(err);
        })
      this.editMode = false;
    }
  }

  execute_training(){
    this.util.openBackDrop();
    this.settingProvider.execute_training_data()
    .then((res:{success:boolean,message:string})=>{
      if(res.success){
        this.util.showToastSuccess('Đã thực hiện hoàn tất training. Đã có thể tiến hành phân loại heo.')
      }
      this.util.closeBackDrop();
    })
    .catch((err)=>{
      this.util.closeBackDrop();
      this.util.showToast(MESSAGE[CONFIG.LANGUAGE_DEFAULT].ERROR_OCCUR);
    })
  }
}
