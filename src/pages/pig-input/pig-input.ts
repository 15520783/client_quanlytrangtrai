import { Events, IonicPage, ModalController, NavController, NavParams, Platform, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { farm, house, pig, status } from '../../common/entity';

import { Component } from '@angular/core';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { SettingsProvider } from '../../providers/settings/settings';
import { Utils } from '../../common/utils';
import { VARIABLE } from '../../common/const';
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

  /**using to check implement in option-list-pig-section*/
  public isTransferSection: boolean = false;


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
    if (this.navParams.data.pigId) {
      this.pig = this.deployData.get_pig_by_id(this.navParams.data.pigId);
    }
    this.init();
    this.credentialsForm = this.formBuilder.group({
      id: this.pig.id,
      pigCode: [this.pig.pigCode, Validators.compose([Validators.required, Validators.maxLength(1000)])],
      farmId: this.pig['farmId'] ? this.pig['farmId'] : '',
      sectionId: this.pig['sectionId'] ? this.pig['sectionId'] : '',
      houseId: [this.pig.houseId, Validators.compose([Validators.required])],
      // roundId: [this.pig.roundId, Validators.compose([Validators.required])],
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
      index:[this.pig.index,Validators.compose([Validators.required,ValidateNumber])],
      priceCodeId: [this.pig.priceCodeId],
      statusId: [this.pig.statusId, Validators.compose([Validators.required])],
      birthId: this.pig.birthId,
      pigType: this.pig.pigType,
      createdAt: this.pig.createdAt
    });


    if (this.pig.id) {
      this.UpdateMode = true;
      let house: house = this.deployData.get_house_by_id(this.pig.houseId);

      this.deployData.get_sections_of_farm(house.section.farm.id).forEach((section) => {
        this.sections.push({
          name: section.name,
          typeId: section.typeId,
          value: section.id
        })
      });

      this.deployData.get_houses_of_section(house.section.id).forEach((house) => {
        this.houses.push({
          name: house.name,
          value: house.id
        })
      });

      if (this.navParams.data.requiredSectionType) {
        this.sections = this.sections.filter(section => {
          return this.navParams.data.requiredSectionType.includes((section.typeId).toString()) == true ? true : false;
        });
      }

      let mother = this.deployData.get_pig_by_pig_code(this.pig.originMother);
      let father = this.deployData.get_pig_by_pig_code(this.pig.originFather);
      this.pig['farmId'] = house.section.farm.id;
      this.pig['sectionId'] = house.section.id;
      this.pig['originFatherId'] = mother ? mother.id : '';
      this.pig['originMotherId'] = father ? father.id : '';
      this.pig['birthday'] = new Date(this.pig.birthday).toISOString();
      Object.keys(this.credentialsForm.value).forEach((attr) => {
        this.credentialsForm.controls[attr].setValue(this.pig[attr]);
      });
      if (this.navParams.data.isTransferSection) {
        this.credentialsForm.controls.pigCode.disable();
        this.credentialsForm.controls.farmId.disable();
        this.credentialsForm.controls.breedId.disable();
        this.credentialsForm.controls.originFatherId.disable();
        this.credentialsForm.controls.originMotherId.disable();
        this.credentialsForm.controls.gender.disable();
        this.credentialsForm.controls.birthday.disable();
      }


    }
  }

  ngAfterViewChecked(): void {

  }

  onSubmit() {
    this.submitAttempt = true;
    if (this.credentialsForm.valid) {
      Object.keys(this.credentialsForm.value).forEach((attr) => {
        this.pig[attr] = this.credentialsForm.value[attr];
      });
      this.navParams.get('callback')(this.pig);
    }
  }

  public status_pig_util: any = {};

  public farms: Array<{ name: string, value: string }> = [];
  public sections: Array<any> = [];
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
    this.status_pig_util = this.deployData.get_object_list_key_of_status();
    this.farms = this.deployData.get_farm_list_for_select();
    if (this.navParams.data.farmId) {
      this.farms = this.farms.filter((farm) => {
        return farm.value == this.navParams.data.farmId ? true : false;
      })
    }

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


    if (this.navParams.data.statusPigValiable) {
      this.navParams.data.statusPigValiable.forEach((status) => {
        this.status.push({
          name: status.name,
          value: status.id
        })
      })
    } else {
      let statusCode = {}
      Object.keys(VARIABLE.STATUS_PIG).forEach((key) => {
        statusCode[VARIABLE.STATUS_PIG[key]] = key;
      })

      let statusValiable = [];
      if (this.pig.statusId) {
        statusValiable = this.settingProvider.setting.status.filter((status: status) => {
          return (status.previousStatus == this.status_pig_util[this.pig.statusId].code || status.id == this.pig.statusId) ? true : false;
        });
        console.log(statusValiable);
      } else {
        statusValiable = this.settingProvider.setting.status.filter((status: status) => {
          return status.previousStatus == VARIABLE.STATUS_PIG.UNKNOW ? true : false;
        });
      }
      statusValiable.forEach((status: status) => {
        this.status.push({
          name: status.description,
          value: status.id
        })
      })

      // this.settingProvider.setting.status.forEach((status) => {
      //   this.status.push({
      //     name: (status.description ? status.description : 'Không xác định') + " - Trạng thái trước " + statusCode[status.previousStatus],
      //     value: status.id
      //   })
      // })
    }

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

    // this.settingProvider.setting.priceCodes.forEach((priceCode) => {
    //   this.priceCodes.push({
    //     name: priceCode.name,
    //     value: priceCode.id
    //   })
    // })
  }

  farmChange(e) {
    if (e.valueId) {
      this.credentialsForm.controls.houseId.setValue(null);
      this.sections = [];
      this.deployData.get_sections_of_farm(e.valueId).forEach((section) => {
        this.sections.push({
          name: section.name,
          typeId: section.typeId,
          value: section.id
        })
      });
      if (this.navParams.data.sectionTypeId) {
        this.sections = this.sections.filter((section) => {
          return section.typeId == this.navParams.data.sectionTypeId ? true : false;
        })
      }
    }
  }

  sectionChange(e) {
    if (e.valueId) {
      this.credentialsForm.controls.houseId.setValue(null);
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
