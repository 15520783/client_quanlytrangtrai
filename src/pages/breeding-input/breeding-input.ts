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
  public updateMode: boolean = false;

  public breeding = new breedings();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public deployData: DeployDataProvider,
    public events: Events,
    public util: Utils
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

    if (this.navParams.data.updateMode) {
      this.updateMode = true;
      this.breeding = this.navParams.data.breeding;
      this.breeding.date = this.breeding.date ? new Date(this.breeding.date).toISOString() : '';
      this.breeding.breedingNext = this.breeding.breedingNext ? new Date(this.breeding.breedingNext).toISOString() : '';
      this.breeding.matingEstimate = this.breeding.matingEstimate ? new Date(this.breeding.matingEstimate).toISOString() : '';
      this.breeding.matingReal = this.breeding.matingReal ? new Date(this.breeding.matingReal).toISOString() : '';
      Object.keys(this.credentialsForm.value).forEach((attr) => {
        this.credentialsForm.controls[attr].setValue(this.breeding[attr]);
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
        this.breeding[attr] = this.credentialsForm.value[attr];
      });
      if(!this.updateMode){
        this.navParams.get('callback')(this.breeding);
      }
      else{
        this.navParams.get('callback')(this.breeding);
      }
    }
  }

  public breedingTypes: Array<{ name: string, value: string }> = [];

  init() {
    this.breedingTypes = this.deployData.get_breedingType_list_for_select();
  }
}
