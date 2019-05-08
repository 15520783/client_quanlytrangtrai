import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { breedings } from '../../common/entity';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { Utils } from '../../common/utils';
import { MESSAGE, CONFIG } from '../../common/const';


@IonicPage()
@Component({
  selector: 'page-breeding-input',
  templateUrl: 'breeding-input.html',
})
export class BreedingInputPage {

  public credentialsForm: FormGroup;
  public submitAttempt: boolean = false;

  public breeding = new breedings();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public deployData: DeployDataProvider,
    public events: Events,
    public util:Utils
  ) {
    if (this.navParams.data.pig) {
      this.breeding.pig = this.navParams.data.pig;
    }

    this.init();

    this.credentialsForm = this.formBuilder.group({
      id: this.breeding.id,
      pig: this.breeding.pig,
      date: [this.breeding.date, Validators.compose([Validators.required])],
      logId: this.breeding.logId,
      typeId: [this.breeding.typeId, Validators.compose([Validators.required])],
      description: [this.breeding.description, Validators.compose([Validators.required])],
      breedingCount: this.breeding.breedingCount,
      breedingNext: [this.breeding.breedingNext, Validators.compose([Validators.required])],
      matingEstimate: [this.breeding.matingEstimate, Validators.compose([Validators.required])],
      matingReal: this.breeding.matingReal
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BreedingInputPage');
  }

  onSubmit() {
    this.submitAttempt = true;
    console.log(this.credentialsForm.value);
    if (this.credentialsForm.valid) {
      Object.keys(this.credentialsForm.value).forEach((attr) => {
        this.breeding[attr] = this.credentialsForm.value[attr];
      });

      this.events.publish('breeding-input:CreateBreeding', this.breeding);
      this.events.unsubscribe('option-list-pig-section:OK');
      this.events.subscribe('option-list-pig-section:OK', (OK) => {
        if (OK) {
          this.navCtrl.pop();
          this.events.unsubscribe('option-list-pig-section:OK');
        }
        else{
          this.util.showToast(MESSAGE[CONFIG.LANGUAGE_DEFAULT].UPDATE_FAILED);
          this.events.unsubscribe('option-list-pig-section:OK');
        }
      });
    }
  }

  public breedingTypes: Array<{ name: string, value: string }> = [];

  init() {
    this.breedingTypes = this.deployData.get_breedingType_list_for_select();

  }
}
