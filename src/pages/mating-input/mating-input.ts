import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { KEY, VARIABLE } from '../../common/const';
import { breeds, mating, matingDetails, pig, sperms } from '../../common/entity';

import { ActivitiesProvider } from '../../providers/activities/activities';
import { Component } from '@angular/core';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { Utils } from '../../common/utils';

@IonicPage()
@Component({
  selector: 'page-mating-input',
  templateUrl: 'mating-input.html',
})
export class MatingInputPage {

  public credentialsForm: FormGroup;
  public credentialsFormExtra: FormGroup;
  public submitAttempt: boolean = false;
  public updateMode: boolean = false;

  public mating = new mating();
  public matingDetail: Array<matingDetails> = [
    new matingDetails(),
    new matingDetails()
  ];
  public male_pigs: Array<pig> = [];
  public breeds: any = {};
  public breedList: Array<{ name: string, value: string }> = [];
  public matingRole: any = {};
  public insemination: any;
  public types: Array<any> = [];

  public fatherBreed: breeds = new breeds();
  public motherBreed: breeds = new breeds();
  public resultMating: breeds = new breeds();

  public viewMode: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public deployData: DeployDataProvider,
    public activitiesProvider: ActivitiesProvider,
    public util: Utils
  ) {

    if (this.navParams.data.pig) {
      this.mating.mother = this.navParams.data.pig;
    }
    this.breeds = this.deployData.get_object_list_key_of_breeds();
    this.male_pigs = this.deployData.get_male_mating_pig_for_female_pig(this.mating.mother);
    this.matingRole = this.deployData.get_mating_role_of_mating();
    this.breedList = this.deployData.get_breed_list_for_select();
    this.motherBreed = this.breeds[this.mating.mother.breedId];
    this.insemination = VARIABLE.INSEMINATION;

    Object.keys(VARIABLE.MATING_TYPE).forEach((key) => {
      this.types.push(VARIABLE.MATING_TYPE[key]);
    })

    this.util.getKey(KEY.EMPID).then((employeeId) => {
      this.mating.employeeId = employeeId;
    })

    let today = new Date();
    this.mating.date = new Date(today.getFullYear(),today.getMonth(),today.getDay()).toISOString();
    this.mating.birthEstimate = new Date(today.getFullYear(),today.getMonth(),today.getDay() + 120).toISOString();

    this.credentialsForm = this.formBuilder.group({
      id: this.mating.id,
      motherId: this.mating.mother.id,
      fatherId: [this.mating.fatherId, Validators.compose([Validators.required])],
      childId: this.mating.childId,
      typeId: [this.mating.typeId, Validators.compose([Validators.required])],
      type: this.mating.type,
      date: [this.mating.date, Validators.compose([Validators.required])],
      birthEstimate: [this.mating.birthEstimate, Validators.compose([Validators.required])],
      status: this.mating.status,
      employeeId: this.mating.employeeId,
    });

    this.credentialsFormExtra = this.formBuilder.group({
      mating1_id: this.matingDetail[0].id,
      sperm1: [null, Validators.compose([Validators.required])],
      date1: [this.matingDetail[0].date, Validators.compose([Validators.required])],
      insemination1: [this.matingDetail[0].insemination, Validators.compose([Validators.required])],
      mating2_id: this.matingDetail[1].id,
      sperm2: [null],
      date2: [this.matingDetail[1].date],
      insemination2: [this.matingDetail[0].insemination],
    })


    if (this.navParams.data.mating) {
      this.updateMode = true;
      this.mating = this.navParams.data.mating;
      if (this.mating.type == VARIABLE.MATING_TYPE.IMMEDIATE.codeName)
        this.mating.typeId = VARIABLE.MATING_TYPE.IMMEDIATE.value;
      else
        this.mating.typeId = VARIABLE.MATING_TYPE.SPERM.value;
      this.mating.motherId = this.mating.mother.id;
      this.mating.fatherId = this.mating.fatherId;
      this.mating.date = new Date(this.mating.date).toISOString();
      this.mating.birthEstimate = new Date(this.mating.birthEstimate).toISOString();
      Object.keys(this.credentialsForm.value).forEach((attr) => {
        this.credentialsForm.controls[attr].setValue(this.mating[attr]);
      })

      /**Detect child breed */
      if (this.mating.type == VARIABLE.MATING_TYPE.IMMEDIATE.codeName) {
        let father = this.deployData.get_pig_by_id(this.mating.fatherId);
        this.fatherBreed = this.breeds[father.breedId];
      } else {
        this.fatherBreed = this.breeds[this.mating.fatherId]
        this.getSperms();
      }
      this.motherBreed = this.mating.mother.breed;
      this.resultMating = this.matingRole[this.fatherBreed.id + '-' + this.motherBreed.id];



      if (this.mating.typeId == VARIABLE.MATING_TYPE.SPERM.value) {
        if (this.navParams.data.matingDetails) {
          let matingDetails = this.navParams.data.matingDetails;
          if (this.navParams.data.matingDetails[0]) {
            this.credentialsFormExtra.controls.sperm1.setValue(matingDetails[0].sperm);
            this.Sperm1 = matingDetails[0].sperm;
            this.credentialsFormExtra.controls.date1.setValue(new Date(matingDetails[0].date).toISOString());
            this.credentialsFormExtra.controls.insemination1.setValue(matingDetails[0].insemination);
          }
          if (this.navParams.data.matingDetails[1]) {
            this.credentialsFormExtra.controls.sperm2.setValue(matingDetails[1].sperm);
            this.Sperm2 = matingDetails[1].sperm;
            this.credentialsFormExtra.controls.date2.setValue(new Date(matingDetails[1].date).toISOString());
            this.credentialsFormExtra.controls.insemination2.setValue(matingDetails[1].insemination);
          }
        }
      }

      if (this.navParams.data.viewMode) {
        this.viewMode = true;
      }
    }
  }

  ionViewDidLoad() {

  }

  public sperms: Array<sperms> = [];

  getSperms() {
    this.sperms = [];
    this.util.openBackDrop();
    this.activitiesProvider.getAllSperms()
      .then((sperms: Array<sperms>) => {
        if (sperms) {
          this.sperms = sperms.filter((sperm: sperms) => {
            return (sperm.pig.breed.id == this.credentialsForm.value.fatherId && 
                    sperm.pig.house.section.farm.id == this.navParams.data.farmId ) ? true : false;
          })
          if (!this.sperms.length) {
            this.util.showToastInform('Không tìm thấy liều tinh của giống được chọn.');
          }
        }
        this.util.closeBackDrop();
      })
      .catch((err) => {
        this.util.closeBackDrop();
      })
  }

  onSubmit() {
    this.submitAttempt = true;
    if (this.credentialsForm.valid) {
      Object.keys(this.mating).forEach((attr) => {
        this.mating[attr] = this.credentialsForm.value[attr] ? this.credentialsForm.value[attr] : this.mating[attr];
      });
      this.mating.type = (this.mating.typeId == VARIABLE.MATING_TYPE.IMMEDIATE.value) ?
        VARIABLE.MATING_TYPE.IMMEDIATE.codeName : VARIABLE.MATING_TYPE.SPERM.codeName;

      if (this.mating.typeId == VARIABLE.MATING_TYPE.SPERM.value) {
        if (this.navParams.data.matingDetails && this.navParams.data.matingDetails[0] &&
          this.navParams.data.matingDetails[0].id) {
          this.matingDetail[0].id = this.navParams.data.matingDetails[0].id;
          this.matingDetail[0].createdAt = this.navParams.data.matingDetails[0].createdAt;
        }
        this.matingDetail[0].sperm = this.credentialsFormExtra.value.sperm1;
        this.matingDetail[0].date = this.credentialsFormExtra.value.date1;
        this.matingDetail[0].insemination = this.credentialsFormExtra.value.insemination1;

        if (this.navParams.data.matingDetails && this.navParams.data.matingDetails[1] &&
          this.navParams.data.matingDetails[1].id) {
          this.matingDetail[1].id = this.navParams.data.matingDetails[1].id;
          this.matingDetail[1].createdAt = this.navParams.data.matingDetails[1].createdAt;
        }
        this.matingDetail[1].sperm = this.credentialsFormExtra.value.sperm2;
        this.matingDetail[1].date = this.credentialsFormExtra.value.date2;
        this.matingDetail[1].insemination = this.credentialsFormExtra.value.insemination2;

        if (this.credentialsFormExtra.valid) {
          let err = false;
          if (!this.updateMode) {
            if (this.matingDetail[0].sperm.id == this.matingDetail[1].sperm.id) {
              if ((this.matingDetail[0].sperm.doses - this.matingDetail[0].sperm.used) < 2) {
                err = true;
                this.util.showToast('Số liều tinh của heo có mã ' + this.matingDetail[0].sperm.pig.pigCode + ' không đủ');
              }
            } else {
              if (this.matingDetail[0].sperm.id && (this.matingDetail[0].sperm.doses - this.matingDetail[0].sperm.used) < 1) {
                err = true;
                this.util.showToast('Số liều tinh của heo có mã ' + this.matingDetail[0].sperm.pig.pigCode + ' không đủ');
              }
              if (this.matingDetail[1].sperm.id && (this.matingDetail[1].sperm.doses - this.matingDetail[1].sperm.used) < 1) {
                err = true;
                this.util.showToast('Số liều tinh của heo có mã ' + this.matingDetail[1].sperm.pig.pigCode + ' không đủ');
              }
            }
          } else {
            if (this.matingDetail[1].sperm.id && (this.matingDetail[1].sperm.doses - this.matingDetail[1].sperm.used) < 1) {
              err = true;
              this.util.showToast('Số liều tinh của heo có mã ' + this.matingDetail[1].sperm.pig.pigCode + ' không đủ');
            }             
          }

          if (!err) {
            console.log(this.matingDetail);
            this.navParams.get('callback')({
              mating: this.mating,
              matingDetail: this.matingDetail
            })
          }
        }
      } else {
        this.navParams.get('callback')({
          mating: this.mating,
          matingDetail: this.matingDetail
        })
      }
    }
  }


  changeFatherBreed(eventValue: any) {
    if (this.credentialsForm.value.typeId == 0) {
      if (eventValue.breedId) {
        this.fatherBreed = this.breeds[eventValue.breedId];
        this.resultMating = this.matingRole[this.fatherBreed.id + '-' + this.motherBreed.id];
      }
    } else {
      if (eventValue.valueId) {
        this.getSperms();
        this.fatherBreed = this.breeds[eventValue.valueId];
        this.resultMating = this.matingRole[this.fatherBreed.id + '-' + this.motherBreed.id];
      }
    }
  }

  public Sperm1: sperms;
  public Sperm2: sperms;

  showSperm1(e) {
    setTimeout(() => {
      this.Sperm1 = e;
    }, 200);
  }

  showSperm2(e) {
    setTimeout(() => {
      this.Sperm2 = e;
    }, 200);
  }

  typeChange(value) {
    this.credentialsForm.controls.fatherId.setValue('');
  }

  dateChange(date){
    console.log(date);
    this.credentialsForm.controls.birthEstimate.setValue(new Date(date.year, date.month - 1, date.day + 120).toISOString());
  }
}
