import { CONFIG, MESSAGE } from '../../common/const';
import { Events, IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Component } from '@angular/core';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { Utils } from '../../common/utils';
import { ValidateNumber } from '../../validators/number.validator';
import { sperms } from '../../common/entity';

@IonicPage()
@Component({
  selector: 'page-sperm-input',
  templateUrl: 'sperm_input.html',
})
export class SpermInputPage {
  public credentialsForm: FormGroup;
  public submitAttempt: boolean = false;
  public updateMode: boolean = false;

  public sperm = new sperms();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public deployData: DeployDataProvider,
    public events: Events,
    public util: Utils
  ) {
    if (this.navParams.data.pig) {
      this.sperm.pig = this.navParams.data.pig;
    }

    this.sperm.date = new Date().toISOString();

    this.credentialsForm = this.formBuilder.group({
      id: this.sperm.id,
      pig: this.sperm.pig,
      spermCount: this.sperm.spermCount,
      date: [this.sperm.date, Validators.compose([Validators.required])],
      volume: [this.sperm.volume, Validators.compose([Validators.required, Validators.maxLength(1000), ValidateNumber])],
      doses: [this.sperm.doses, Validators.compose([Validators.required, Validators.maxLength(1000), ValidateNumber])],
      used: this.sperm.used,
      activity: [this.sperm.activity, Validators.compose([Validators.required, Validators.maxLength(1000), ValidateNumber])],
      c: [this.sperm.c, Validators.compose([Validators.required, Validators.maxLength(1000), ValidateNumber])],
      lifeAvg: [this.sperm.lifeAvg, Validators.compose([Validators.required, Validators.maxLength(1000), ValidateNumber])],
      dieAvg: [this.sperm.dieAvg, Validators.compose([Validators.required, Validators.maxLength(1000), ValidateNumber])],
      faddiness: [this.sperm.faddiness, Validators.compose([Validators.required, Validators.maxLength(1000), ValidateNumber])],
      status: this.sperm.status
    });

    if (this.navParams.data.updateMode) {
      this.updateMode = true;
      this.sperm = this.navParams.data.sperm;
      this.sperm.date = this.sperm.date ? new Date(this.sperm.date).toISOString() : '';
      Object.keys(this.credentialsForm.value).forEach((attr) => {
        this.credentialsForm.controls[attr].setValue(this.sperm[attr]);
      })
    }
  }

  ionViewDidLoad() {
  }

  onSubmit() {
    this.submitAttempt = true;
    console.log(this.credentialsForm.value);
    if (this.credentialsForm.valid) {
      Object.keys(this.credentialsForm.value).forEach((attr) => {
        this.sperm[attr] = this.credentialsForm.value[attr];
      });
      if (!this.updateMode) {
        this.navParams.get('callback')(this.sperm);
      }
      else {
        this.navParams.get('callback')(this.sperm);
      }
    }
  }

  public breedingTypes: Array<{ name: string, value: string }> = [];

}
