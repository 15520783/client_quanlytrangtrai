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
      pig_code: [this.pig.pig_code, Validators.compose([Validators.required, Validators.maxLength(1000)])],      
      house_id: [this.pig.house_id,Validators.compose([Validators.required])],
      round_id: [this.pig.round_id,Validators.compose([Validators.required])],
      breed_id: [this.pig.breed_id,Validators.compose([Validators.required])],
      gender:[this.pig.gender,Validators.compose([Validators.required])],
      father_id:[this.pig.father_id,Validators.compose([Validators.required])],
      mother_id:[this.pig.mother_id,Validators.compose([Validators.required])],
      birth_day:[this.pig.birthday,Validators.compose([Validators.required])],
      born_weight:[this.pig.born_weight,Validators.compose([Validators.required])],
      // born_status:[this.pig.born_status,Validators.compose([Validators.required])],
      origin_weight:[this.pig.origin_weight,Validators.compose([Validators.required])],
      receive_weight:[this.pig.receive_weight,Validators.compose([Validators.required])],
      health_point:[this.pig.health_point,Validators.compose([Validators.required])],
      foot:[this.pig.foot,Validators.compose([Validators.required])],
      function_udder:[this.pig.function_udder,Validators.compose([Validators.required])],
      total_udder:[this.pig.total_udder,Validators.compose([Validators.required])],
      gential:[this.pig.gential,Validators.compose([Validators.required])],
      description:[this.pig.description,Validators.compose([Validators.required, Validators.maxLength(1000)])],
      fcr:[this.pig.fcr,Validators.compose([Validators.required])],
      adg:[this.pig.adg,Validators.compose([Validators.required])],
      bf:[this.pig.bf,Validators.compose([Validators.required])],
      filet:[this.pig.filet,Validators.compose([Validators.required])],
      long_back:[this.pig.long_back,Validators.compose([Validators.required])],
      long_body:[this.pig.long_body,Validators.compose([Validators.required])],
      index:[this.pig.index,Validators.compose([Validators.required])],
      // parities:[this.pig.parities,Validators.compose([Validators.required])],
      health_status:[this.pig.health_status,Validators.compose([Validators.required])],
      breeding_type:[this.pig.breeding_type,Validators.compose([Validators.required])],
      // breed_status:[this.pig.breed_status,Validators.compose([Validators.required])],
      // pregnancy_status:[this.pig.pregnancy_status,Validators.compose([Validators.required])],
      // overview_status:[this.pig.overview_status,Validators.compose([Validators.required])],
      // point_review:[this.pig.point_review,Validators.compose([Validators.required])],
      // status:[this.pig.status,Validators.compose([Validators.required])],
      price_code:[this.pig.price_code,Validators.compose([Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PigInputPage');
  }


  onSubmit(){
    this.submitAttempt = true;
  }
}
