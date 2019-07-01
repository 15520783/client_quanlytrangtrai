import { Events, IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivitiesProvider } from '../../providers/activities/activities';
import { Component } from '@angular/core';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { Utils } from '../../common/utils';
import { ValidateNumber } from '../../validators/number.validator';
import { births } from '../../common/entity';

@IonicPage()
@Component({
  selector: 'page-birth-input',
  templateUrl: 'birth-input.html',
})
export class BirthInputPage {

  public credentialsForm: FormGroup;
  public submitAttempt: boolean = false;
  public updateMode: boolean = false;

  public birth = new births();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public deployData: DeployDataProvider,
    public activitiesProvider: ActivitiesProvider,
    public events: Events,
    public util: Utils
  ) {
    if (this.navParams.data.mating) {
      this.birth.mating = this.navParams.data.mating;
      this.birth.date = new Date (this.birth.mating.birthEstimate).toISOString();
    }

    if (this.navParams.data.birth) {
      this.birth = this.navParams.data.birth;
      this.birth.date = new Date(this.birth.date).toISOString();
    }

    if (this.navParams.data.updateMode) {
      this.updateMode = true;
    }

    this.credentialsForm = this.formBuilder.group({
      id: this.birth.id,
      mating: this.birth.mating,
      date: [this.birth.date, Validators.compose([Validators.required])],
      parities: this.birth.parities,
      borning: this.birth.borning,
      fetalWeight: [this.birth.fetalWeight, Validators.compose([Validators.required, ValidateNumber])],
      selected: this.birth.selected,
      dieBeforeBorning: [this.birth.dieBeforeBorning, Validators.compose([Validators.required, ValidateNumber])],
      dieBorning: [this.birth.dieBorning, Validators.compose([Validators.required, ValidateNumber])],
      dieBlack: [this.birth.dieBlack, Validators.compose([Validators.required, ValidateNumber])],
      // defect: [this.birth.defect, Validators.compose([Validators.required, ValidateNumber])],
      smallRemove: [this.birth.smallRemove, Validators.compose([Validators.required, ValidateNumber])],
    });
  }

  onSubmit() {
    this.submitAttempt = true;
    if (this.credentialsForm.valid) {
      Object.keys(this.credentialsForm.value).forEach((attr) => {
        this.birth[attr] = this.credentialsForm.value[attr];
      });
      if (!this.updateMode) {
        this.activitiesProvider.createBirth(this.birth)
          .then((newBirth: births) => {
            if (newBirth) {
              this.navParams.get('callback')(newBirth);
            }
            this.navCtrl.pop();
          })
          .catch((err: Error) => {
            console.log(err);
          })
      }else{
        this.activitiesProvider.updateBirth(this.birth)
          .then((Birth: births) => {
            if (Birth) {
              this.navParams.get('callback')(Birth);
            }
            this.navCtrl.pop();
          })
          .catch((err: Error) => {
            console.log(err);
          })
      }
    }
  }
}
