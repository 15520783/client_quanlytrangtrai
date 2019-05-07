import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ViewController, Platform, ModalController } from 'ionic-angular';
import { VARIABLE } from '../../common/const';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SettingsProvider } from '../../providers/settings/settings';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { pig } from '../../common/entity';

@IonicPage()
@Component({
  selector: 'page-input-pig-to-internal-invoice',
  templateUrl: 'input-pig-to-internal-invoice.html',
})
export class InputPigToInternalInvoicePage {

  public credentialsForm: FormGroup;
  public submitAttempt: boolean = false;



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
    public viewCtrl: ViewController
  ) {
    this.init();
    this.credentialsForm = this.formBuilder.group({
      id: ['', Validators.compose([Validators.required])],
      // id: this.pig.id,
      farmId: '',
      sectionId: '',
      houseId: [this.pig.houseId, Validators.compose([Validators.required])],
      originWeight: [this.pig.originWeight, Validators.compose([Validators.required])],
      statusId: [this.pig.statusId, Validators.compose([Validators.required])],
      healthStatusId: [this.pig.healthStatusId, Validators.compose([Validators.required])],
      description: [this.pig.description, Validators.compose([Validators.maxLength(1000)])],
      healthPoint: [this.pig.healthPoint, Validators.compose([Validators.required])],
      footTypeId: [this.pig.footTypeId, Validators.compose([Validators.required])],
      functionUdder: [this.pig.functionUdder, Validators.compose([Validators.required])],
      totalUdder: [this.pig.totalUdder, Validators.compose([Validators.required])],
      gentialTypeId: [this.pig.gentialTypeId, Validators.compose([Validators.required])],
      fcr: [this.pig.fcr, Validators.compose([Validators.required])],
      adg: [this.pig.adg, Validators.compose([Validators.required])],
      bf: [this.pig.bf, Validators.compose([Validators.required])],
      filet: [this.pig.filet, Validators.compose([Validators.required])],
      longBack: [this.pig.longBack, Validators.compose([Validators.required])],
      longBody: [this.pig.longBody, Validators.compose([Validators.required])],



      // roundId: [this.pig.roundId, Validators.compose([Validators.required])],
      // breedId: [this.pig.breedId, Validators.compose([Validators.required])],
      // gender: [this.pig.gender, Validators.compose([Validators.required])],
      // originMother: [this.pig.originMother, Validators.compose([Validators.required])],
      // birthday: [this.pig.birthday, Validators.compose([Validators.required])],
      // receiveWeight: [this.pig.receiveWeight, Validators.compose([Validators.required])],
      // pregnancyStatusId:[this.pig.pregnancyStatusId, Validators.compose([Validators.required])],
      // priceCodeId: [this.pig.priceCodeId, Validators.compose([Validators.required])],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PigInputPage');
  }


  onSubmit() {
    this.submitAttempt = true;
    if (this.credentialsForm.valid) {
      Object.keys(this.credentialsForm.value).forEach((attr) => {
        this.pig[attr] = this.credentialsForm.value[attr];
      });
      this.events.publish('updatePig', this.pig);
      this.events.subscribe('OK', () => {
        this.viewCtrl.dismiss();
        this.events.unsubscribe('OK');
      })
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

    this.settingProvider.setting.status.forEach((status) => {
      this.status.push({
        name: status.name,
        value: status.id
      })
    })

  }

  farmChange(e) {
    if (e.valueId) {
      this.houses = [];
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

  changePig(e) {
    this.sections = this.deployData.get_section_list_for_select();
    this.houses = this.deployData.get_house_list_for_select();

    this.pig = this.deployData.get_pig_by_id(e.id);
    let house: any = this.deployData.get_house_by_id(this.pig.houseId);
    this.pig['farmId'] = house.section.farm.id;
    this.pig['sectionId'] = house.section.id;
    Object.keys(this.credentialsForm.value).forEach((attr) => {
      this.credentialsForm.controls[attr].setValue(this.pig[attr]);
    });
  }
}
