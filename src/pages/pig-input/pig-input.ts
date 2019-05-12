import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform, Events, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { pig, house } from '../../common/entity';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { SettingsProvider } from '../../providers/settings/settings';
import { VARIABLE } from '../../common/const';
import { Utils } from '../../common/utils';
import { ValidateNumber } from '../../validators/number.validator';


@IonicPage()
@Component({
  selector: 'page-pig-input',
  templateUrl: 'pig-input.html',
})
export class PigInputPage {

  public credentialsForm: FormGroup;
  public submitAttempt: boolean = false;
  public UpdateMode: boolean = false;


  public pig = new pig();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public modalCtrl: ModalController,
    public platform: Platform,
    public deployData: DeployDataProvider,
    public settingProvider: SettingsProvider,
    public events: Events,
    public viewCtrl: ViewController,
    public util: Utils
  ) {
    this.init();
    this.credentialsForm = this.formBuilder.group({
      id: this.pig.id,
      pigCode: [this.pig.pigCode, Validators.compose([Validators.required, Validators.maxLength(1000)])],
      farmId: this.pig['farmId'] ? this.pig['farmId'] : '',
      sectionId: this.pig['sectionId'] ? this.pig['sectionId'] : '',
      houseId: [this.pig.houseId, Validators.compose([Validators.required])],
      roundId: [this.pig.roundId, Validators.compose([Validators.required])],
      breedId: [this.pig.breedId, Validators.compose([Validators.required])],
      gender: [this.pig.gender, Validators.compose([Validators.required])],
      originFatherId: [this.pig.originFatherId, Validators.compose([])],
      originMotherId: [this.pig.originMotherId, Validators.compose([])],
      birthday: [this.pig.birthday, Validators.compose([Validators.required])],
      originWeight: [this.pig.originWeight, Validators.compose([Validators.required, ValidateNumber])],
      receiveWeight: [this.pig.receiveWeight, Validators.compose([Validators.required, ValidateNumber])],
      description: [this.pig.description, Validators.compose([Validators.maxLength(1000)])],
      healthPoint: [this.pig.healthPoint, Validators.compose([Validators.required])],
      healthStatusId: [this.pig.healthStatusId, Validators.compose([Validators.required])],
      footTypeId: [this.pig.footTypeId, Validators.compose([Validators.required])],
      functionUdder: [this.pig.functionUdder, Validators.compose([Validators.required, ValidateNumber])],
      totalUdder: [this.pig.totalUdder, Validators.compose([Validators.required, ValidateNumber])],
      gentialTypeId: [this.pig.gentialTypeId, Validators.compose([Validators.required])],
      adg: [this.pig.adg, Validators.compose([Validators.required, ValidateNumber])],
      fcr: [this.pig.fcr, Validators.compose([Validators.required, ValidateNumber])],
      bf: [this.pig.bf, Validators.compose([Validators.required, ValidateNumber])],
      filet: [this.pig.filet, Validators.compose([Validators.required, ValidateNumber])],
      longBack: [this.pig.longBack, Validators.compose([Validators.required, ValidateNumber])],
      longBody: [this.pig.longBody, Validators.compose([Validators.required, ValidateNumber])],
      pregnancyStatusId: [this.pig.pregnancyStatusId, Validators.compose([Validators.required])],
      priceCodeId: [this.pig.priceCodeId, Validators.compose([Validators.required])],
      statusId: [this.pig.statusId, Validators.compose([Validators.required])],

      // born_weight: [this.pig.born_weight, Validators.compose([Validators.required])],
      // born_status:[this.pig.born_status,Validators.compose([Validators.required])],
      // index: [this.pig.index, Validators.compose([Validators.required])],
      // parities:[this.pig.parities,Validators.compose([Validators.required])],
      // breedingType: [this.pig.breedingType, Validators.compose([Validators.required])],
      // breed_status:[this.pig.breed_status,Validators.compose([Validators.required])],
      // pregnancy_status:[this.pig.pregnancy_status,Validators.compose([Validators.required])],
      // overview_status:[this.pig.overview_status,Validators.compose([Validators.required])],
      // point_review:[this.pig.point_review,Validators.compose([Validators.required])],
      // status:[this.pig.status,Validators.compose([Validators.required])],
    });

    if (this.navParams.data.pigId) {
      this.UpdateMode = true;
      this.pig = this.deployData.get_pig_by_id(this.navParams.data.pigId);
      let house: house = this.deployData.get_house_by_id(this.pig.houseId);

      this.deployData.get_sections_of_farm(house.section.farm.id).forEach((section) => {
        this.sections.push({
          name: section.name,
          value: section.id
        })
      })

      this.deployData.get_houses_of_section(house.section.id).forEach((house) => {
        this.houses.push({
          name: house.name,
          value: house.id
        })
      })

      let mother = this.deployData.get_pig_by_pig_code(this.pig.originMother);
      let father = this.deployData.get_pig_by_pig_code(this.pig.originFather);
      this.pig['farmId'] = house.section.farm.id;
      this.pig['sectionId'] = house.section.id;
      this.pig['originFatherId'] = mother ? father.id : '';
      this.pig['originMotherId'] = father ? mother.id : '';
      this.pig['birthday'] = new Date(this.pig.birthday).toISOString();
      Object.keys(this.credentialsForm.value).forEach((attr) => {
        this.credentialsForm.controls[attr].setValue(this.pig[attr]);
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PigInputPage');

  }


  onSubmit() {
    this.submitAttempt = true;
    console.log(this.credentialsForm.value);
    if (this.credentialsForm.valid) {
      Object.keys(this.credentialsForm.value).forEach((attr) => {
        this.pig[attr] = this.credentialsForm.value[attr];
      });

      if (!this.UpdateMode) {
        this.events.publish('pig-inputs:createPig', this.pig);
        this.events.subscribe('OK', () => {
          this.viewCtrl.dismiss();
          this.events.unsubscribe('OK');
        })
      }
      else {
        this.events.publish('pig-inputs:updatePig', this.pig);
        this.events.subscribe('OK', () => {
          this.viewCtrl.dismiss();
          this.events.unsubscribe('OK');
        })
      }
    }
  }

  public farms: Array<{ name: string, value: string }> = [];
  public sections: Array<{ name: string, value: string }> = [];
  public houses: Array<{ name: string, value: string }> = [];
  public breeds: Array<{ name: string, value: string }> = [];
  public health_points: Array<{ name: string, value: number }> = [];
  public footType: Array<{ name: string, value: string }> = [];
  public gentialType: Array<{ name: string, value: string }> = [];
  public health_status: Array<{ name: string, value: string }> = [];
  public rounds: Array<{ name: string, value: string }> = [];
  public pregnancyStatus: Array<{ name: string, value: string }> = [];
  public priceCodes: Array<{ name: string, value: string }> = [];
  public genders: Array<{ name: string, value: string }> = [];
  public status: Array<{ name: string, value: string }> = [];

  init() {
    this.farms = this.deployData.get_farm_list_for_select();
    this.settingProvider.setting.breeds.forEach((breed) => {
      this.breeds.push({
        name: breed.name + ' - ' + breed.symbol,
        value: breed.id
      })
    })
    this.genders = VARIABLE.gender;

    for (let i = 0; i <= 5; i += 0.5) {
      this.health_points.push({
        name: i.toString(),
        value: i
      })
    }
    this.settingProvider.setting.footType.forEach((foot) => {
      this.footType.push({
        name: foot.name,
        value: foot.id
      })
    })
    this.settingProvider.setting.gentialType.forEach((gential) => {
      this.gentialType.push({
        name: gential.name,
        value: gential.id
      })
    })
    this.settingProvider.setting.healthStatus.forEach((healthStatus) => {
      this.health_status.push({
        name: healthStatus.name,
        value: healthStatus.id
      })
    })
    this.settingProvider.setting.status.forEach((status) => {
      if(status.id in ["1","2","3","4","5","6","7"]){
        this.status.push({
          name:status.name,
          value:status.id
        })
      }
    })

    this.rounds.push({
      name: "Không xác định",
      value: "0"
    });

    this.settingProvider.setting.pregnancyStatus.forEach((pregnancyStatus) => {
      this.pregnancyStatus.push({
        name: pregnancyStatus.name,
        value: pregnancyStatus.id
      })
    })

    this.settingProvider.setting.priceCodes.forEach((priceCode) => {
      this.priceCodes.push({
        name: priceCode.name,
        value: priceCode.id
      })
    })

  }

  farmChange(e) {
    if (e.valueId) {
      this.sections = [];
      this.deployData.get_sections_of_farm(e.valueId).forEach((section) => {
        this.sections.push({
          name: section.name,
          value: section.id
        })
      });
    }
  }

  sectionChange(e) {
    console.log(e);
    if (e.valueId) {
      this.houses = [];
      this.deployData.get_houses_of_section(e.valueId).forEach((house) => {
        this.houses.push({
          name: house.name,
          value: house.id
        })
      })
    }
  }
}
