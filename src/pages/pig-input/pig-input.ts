import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { pig, house } from '../../common/entity';


@IonicPage()
@Component({
  selector: 'page-pig-input',
  templateUrl: 'pig-input.html',
})
export class PigInputPage {

  public credentialsForm: FormGroup;
  public submitAttempt: boolean = false;

  public houses:any = [
    {name:'Nhà 1',value:1},
    {name:'Nhà 2',value:2},
    {name:'Nhà 3',value:3},
    {name:'Nhà 4',value:4}
  ];

  public rounds:any = [
    {name:'Lứa 1',value:1},
    {name:'Lứa 2',value:2},
    {name:'Lứa 3',value:3},
    {name:'Lứa 4',value:4},
  ]

  public genders:any = [
    {name:'Đực', value:1},
    {name:'Cái', value:2},
    {name:'Đực hiến', value:3},
  ]

  public health_status:any = [
    {name:'Trạng thái 1',value:1},
    {name:'Trạng thái 2',value:2},
    {name:'Trạng thái 3',value:3},
    {name:'Trạng thái 4',value:4},
  ]

  public breeds:any = [
    {name:'Giống 1',value:1},
    {name:'Giống 2',value:2},
    {name:'Giống 3',value:3},
    {name:'Giống 4',value:4},
  ]

  public breeding_types:any = [
    {name:'Loại lên giống 1',value:1},
    {name:'Loại lên giống 2',value:2},
    {name:'Loại lên giống 3',value:3},
    {name:'Loại lên giống 4',value:4},
  ]

  public pig = new pig();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public modalCtrl: ModalController,
    public platform: Platform
  ) {

    this.credentialsForm = this.formBuilder.group({
      id: this.pig.id,
      pigCode: [this.pig.pigCode, Validators.compose([Validators.required, Validators.maxLength(1000)])],      
      houseId: [this.pig.houseId,Validators.compose([Validators.required])],
      roundId: [this.pig.roundId,Validators.compose([Validators.required])],
      breedId: [this.pig.breedId,Validators.compose([Validators.required])],
      gender:[this.pig.gender,Validators.compose([Validators.required])],
      originFather:[this.pig.originFather,Validators.compose([Validators.required])],
      originMother:[this.pig.originMother,Validators.compose([Validators.required])],
      birthday:[this.pig.birthday,Validators.compose([Validators.required])],
      born_weight:[this.pig.born_weight,Validators.compose([Validators.required])],
      // born_status:[this.pig.born_status,Validators.compose([Validators.required])],
      originWeight:[this.pig.originWeight,Validators.compose([Validators.required])],
      receiveWeight:[this.pig.receiveWeight,Validators.compose([Validators.required])],
      healthPoint:[this.pig.healthPoint,Validators.compose([Validators.required])],
      footTypeId:[this.pig.footTypeId,Validators.compose([Validators.required])],
      functionUdder:[this.pig.functionUdder,Validators.compose([Validators.required])],
      totalUdder:[this.pig.totalUdder,Validators.compose([Validators.required])],
      gentialTypeId:[this.pig.gentialTypeId,Validators.compose([Validators.required])],
      description:[this.pig.description,Validators.compose([Validators.required, Validators.maxLength(1000)])],
      fcr:[this.pig.fcr,Validators.compose([Validators.required])],
      adg:[this.pig.adg,Validators.compose([Validators.required])],
      bf:[this.pig.bf,Validators.compose([Validators.required])],
      filet:[this.pig.filet,Validators.compose([Validators.required])],
      longBack:[this.pig.longBack,Validators.compose([Validators.required])],
      longBody:[this.pig.longBody,Validators.compose([Validators.required])],
      index:[this.pig.index,Validators.compose([Validators.required])],
      // parities:[this.pig.parities,Validators.compose([Validators.required])],
      healthStatusId:[this.pig.healthStatusId,Validators.compose([Validators.required])],
      breedingType:[this.pig.breedingType,Validators.compose([Validators.required])],
      // breed_status:[this.pig.breed_status,Validators.compose([Validators.required])],
      // pregnancy_status:[this.pig.pregnancy_status,Validators.compose([Validators.required])],
      // overview_status:[this.pig.overview_status,Validators.compose([Validators.required])],
      // point_review:[this.pig.point_review,Validators.compose([Validators.required])],
      // status:[this.pig.status,Validators.compose([Validators.required])],
      priceCodeId:[this.pig.priceCodeId,Validators.compose([Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PigInputPage');
  }


  onSubmit(){
    this.submitAttempt = true;
  }
}
