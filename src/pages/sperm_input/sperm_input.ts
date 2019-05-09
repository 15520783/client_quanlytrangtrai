import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { sperms } from '../../common/entity';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { Utils } from '../../common/utils';
import { ValidateNumber } from '../../validators/number.validator';
import { MESSAGE, CONFIG } from '../../common/const';

@IonicPage()
@Component({
  selector: 'page-sperm-input',
  templateUrl: 'sperm_input.html',
})
export class SpermInputPage {
  public credentialsForm: FormGroup;
  public submitAttempt: boolean = false;

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

      let eventTag = Date.now().toString();
      this.events.publish(this.navParams.data.eventTag, { eventTag: eventTag, sperm: this.sperm });
      // this.events.unsubscribe('sperm-input:CreateSperm:OK');
      this.events.subscribe(eventTag, (OK) => {
        if (OK) {
          this.navCtrl.pop();
          this.events.unsubscribe(eventTag);
        } else {
          this.util.showToast(MESSAGE[CONFIG.LANGUAGE_DEFAULT].UPDATE_FAILED);
          this.events.unsubscribe(eventTag);
        }
      });
    }
  }

  public breedingTypes: Array<{ name: string, value: string }> = [];

}
