import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { mating, pig, breeds, matingDetails, sperms, employee } from '../../common/entity';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { ActivitiesProvider } from '../../providers/activities/activities';
import { Utils } from '../../common/utils';
import { VARIABLE, KEY } from '../../common/const';

@IonicPage()
@Component({
  selector: 'page-mating-input',
  templateUrl: 'mating-input.html',
})
export class MatingInputPage {

  public credentialsForm: FormGroup;
  public submitAttempt: boolean = false;
  public updateMode: boolean = false;

  public mating = new mating();
  public matingDetail: Array<matingDetails> = [
    new matingDetails(),
    new matingDetails()
  ];
  public male_pigs: Array<pig> = [];
  public breeds: any = {};
  public matingRole: any = {};
  public insemination: any;

  public fatherBreed: breeds = new breeds();
  public motherBreed: breeds = new breeds();
  public resultMating: breeds = new breeds();

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
    this.motherBreed = this.breeds[this.mating.mother.breedId];
    this.insemination = VARIABLE.INSEMINATION;

    this.util.getKey(KEY.EMPID).then((employeeId) => {
      console.log(employeeId);
      this.mating.employeeId = employeeId;
    })

    this.credentialsForm = this.formBuilder.group({
      id: this.mating.id,
      motherId: this.mating.mother.id,
      fatherId: [this.mating.fatherId, Validators.compose([Validators.required])],
      childId: this.mating.childId,
      date: [this.mating.date, Validators.compose([Validators.required])],
      birthEstimate: [this.mating.birthEstimate, Validators.compose([Validators.required])],
      status: this.mating.status,
      employeeId: this.mating.employeeId,
      mating1_id: this.matingDetail[0].id,
      sperm1: [null, Validators.compose([Validators.required])],
      date1: [this.matingDetail[0].date, Validators.compose([Validators.required])],
      insemination1: [this.matingDetail[0].insemination, Validators.compose([Validators.required])],
      mating2_id: this.matingDetail[1].id,
      sperm2: [null],
      date2: [this.matingDetail[1].date],
      insemination2: [this.matingDetail[0].insemination],
    });


    // if(this.navParams.data.mating){

    // }
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
            return sperm.pig.id == this.credentialsForm.value.fatherId || sperm.id == "0" ? true : false;
          })
          if (!this.sperms.length) {
            this.util.showToastInform('Không tìm thấy liều tinh của heo nọc được chọn.');
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

      this.matingDetail[0].sperm = this.credentialsForm.value.sperm1;
      this.matingDetail[0].date = this.credentialsForm.value.date1;
      this.matingDetail[0].insemination = this.credentialsForm.value.insemination1;

      this.matingDetail[1].sperm = this.credentialsForm.value.sperm2;
      this.matingDetail[1].date = this.credentialsForm.value.date2;
      this.matingDetail[1].insemination = this.credentialsForm.value.insemination2;

      this.navParams.get('callback')({
        mating: this.mating,
        matingDetail: this.matingDetail
      })
      // if(!this.updateMode){
      //   this.navParams.get('callback')(this.breeding);
      // }
      // else{
      //   this.navParams.get('callback')(this.breeding);
      // }
    }
  }


  changeFatherBreed(pig: pig) {
    this.fatherBreed = this.breeds[pig.breedId];
    this.resultMating = this.matingRole[this.fatherBreed.id + '-' + this.motherBreed.id];
    this.getSperms();
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
}
