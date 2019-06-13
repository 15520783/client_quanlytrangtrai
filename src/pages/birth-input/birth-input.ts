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
    }

    this.credentialsForm = this.formBuilder.group({
      id: this.birth.id,
      mating: this.birth.mating,
      date: [this.birth.date, Validators.compose([Validators.required])],
      logId: this.birth.logId,
      parities: this.birth.parities,
      borning: [this.birth.borning, Validators.compose([Validators.required, ValidateNumber])],
      fetalWeight: [this.birth.fetalWeight, Validators.compose([Validators.required, ValidateNumber])],
      selected: [this.birth.selected, Validators.compose([Validators.required, ValidateNumber])],
      dieBeforeBorning: [this.birth.dieBeforeBorning, Validators.compose([Validators.required, ValidateNumber])],
      dieBorning: [this.birth.dieBorning, Validators.compose([Validators.required, ValidateNumber])],
      dieBlack: [this.birth.dieBlack, Validators.compose([Validators.required, ValidateNumber])],
      defect: [this.birth.defect, Validators.compose([Validators.required, ValidateNumber])],
      smallReview: [this.birth.smallReview, Validators.compose([Validators.required, ValidateNumber])],
      remain: this.birth.remain
    });
  }

  onSubmit() {
    this.submitAttempt = true;
    if (this.credentialsForm.valid) {
      Object.keys(this.credentialsForm.value).forEach((attr) => {
        this.birth[attr] = this.credentialsForm.value[attr];
      });
      
      this.activitiesProvider.createBirth(this.birth)
      .then((newBirth:births)=>{
        if(newBirth){
          this.navParams.get('callback')(newBirth);
        }
        this.navCtrl.pop();
      })
      .catch((err:Error)=>{
        console.log(err);
      })
    }
  }

}
