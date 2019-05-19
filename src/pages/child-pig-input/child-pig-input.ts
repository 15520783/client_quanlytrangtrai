import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { pig, births } from '../../common/entity';
import { Utils } from '../../common/utils';
import { SettingsProvider } from '../../providers/settings/settings';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { ValidateNumber } from '../../validators/number.validator';
import { VARIABLE } from '../../common/const';


@IonicPage()
@Component({
  selector: 'page-child-pig-input',
  templateUrl: 'child-pig-input.html',
})
export class ChildPigInputPage {

  public credentialsForm: FormGroup;
  public submitAttempt: boolean = false;
  public pig = new pig();
  public birth = new births();


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public platform: Platform,
    public deployData: DeployDataProvider,
    public settingProvider: SettingsProvider,
    public util: Utils
  ) {
    this.init();
    if (this.navParams.data.pig) {
      this.pig = this.navParams.data.pig;
      this.pig.birthday = new Date(this.pig.birthday).toISOString();
    } else if (this.navParams.data.birth) {
      this.birth = this.navParams.data.birth;
      this.pig.birthId = this.birth.id;
      this.pig.house = this.navParams.data.birth.mating.mother.house;
      this.pig.houseId = this.pig.house.id;
      if (this.birth.mating.type == VARIABLE.MATING_TYPE.SPERM.codeName) {
        let childBreed = this.deployData.get_child_breed_of_mating_role(this.birth.mating.mother.breed.id, this.birth.mating.fatherId);
        if (childBreed) {
          this.pig.breedId = childBreed.id;
        }
      } else {
        let father = this.deployData.get_pig_by_id(this.birth.mating.fatherId);
        this.pig.originFatherId = father.id;
        let childBreed = this.deployData.get_child_breed_of_mating_role(this.birth.mating.mother.breed.id, father.breedId);
        if (childBreed) {
          this.pig.breedId = childBreed.id;
        }
      }
      this.pig.originMotherId = this.birth.mating.mother.id;
      let statusChildPig = this.deployData.get_status_pig_by_status_code(VARIABLE.STATUS_PIG.NEWBORN);
      if (statusChildPig) {
        this.pig.statusId = statusChildPig.id;
      }
    }

    this.credentialsForm = this.formBuilder.group({
      id: this.pig.id,
      pigCode: [this.pig.pigCode, Validators.compose([Validators.required, Validators.maxLength(1000)])],
      houseId: this.pig.houseId,
      breedId: [this.pig.breedId, Validators.compose([Validators.required])],
      birthday: [this.pig.birthday, Validators.compose([Validators.required])],
      gender: [this.pig.gender, Validators.compose([Validators.required])],
      originWeight: [this.pig.originWeight, Validators.compose([Validators.required, ValidateNumber])],
      totalUdder: [this.pig.totalUdder, Validators.compose([Validators.required, ValidateNumber])],
      description: [this.pig.description, Validators.compose([Validators.maxLength(1000)])],
      birthId: this.pig.birthId,
      originFatherId: this.pig.originFatherId,
      originMotherId: this.pig.originMotherId,

      // functionUdder: [this.pig.functionUdder, Validators.compose([Validators.required, ValidateNumber])],
      // roundId: [this.pig.roundId, Validators.compose([Validators.required])],
      // receiveWeight: [this.pig.receiveWeight, Validators.compose([Validators.required, ValidateNumber])],
      // healthPoint: [this.pig.healthPoint, Validators.compose([Validators.required])],
      // healthStatusId: [this.pig.healthStatusId, Validators.compose([Validators.required])],
      // footTypeId: [this.pig.footTypeId, Validators.compose([Validators.required])],
      // gentialTypeId: [this.pig.gentialTypeId, Validators.compose([Validators.required])],
      // adg: [this.pig.adg, Validators.compose([Validators.required, ValidateNumber])],
      // fcr: [this.pig.fcr, Validators.compose([Validators.required, ValidateNumber])],
      // bf: [this.pig.bf, Validators.compose([Validators.required, ValidateNumber])],
      // filet: [this.pig.filet, Validators.compose([Validators.required, ValidateNumber])],
      // longBack: [this.pig.longBack, Validators.compose([Validators.required, ValidateNumber])],
      // longBody: [this.pig.longBody, Validators.compose([Validators.required, ValidateNumber])],
      // pregnancyStatusId: [this.pig.pregnancyStatusId, Validators.compose([Validators.required])],
      // priceCodeId: [this.pig.priceCodeId, Validators.compose([Validators.required])],
      // statusId: [this.pig.statusId, Validators.compose([Validators.required])],
    });

    Object.keys(this.credentialsForm.value).forEach((attr) => {
      this.credentialsForm.controls[attr].setValue(this.pig[attr]);
    });
  }

  public genders: Array<{ name: string, value: string }> = [];
  public breeds: Array<{ name: string, value: string }> = [];

  init() {
    this.settingProvider.setting.breeds.forEach((breed) => {
      this.breeds.push({
        name: breed.name + ' - ' + breed.symbol,
        value: breed.id
      })
    })
    this.genders = VARIABLE.gender;
  }

  onSubmit() {
    this.submitAttempt = true;
    console.log(this.credentialsForm.value);
    if (this.credentialsForm.valid) {
      Object.keys(this.credentialsForm.value).forEach((attr) => {
        this.pig[attr] = this.credentialsForm.value[attr];
      });
      this.navParams.get('callback')(this.pig);
    }
  }

}
