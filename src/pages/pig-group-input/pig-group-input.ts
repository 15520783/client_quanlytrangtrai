import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { group } from '../../common/entity';

/**
 * Generated class for the PigGroupInputPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pig-group-input',
  templateUrl: 'pig-group-input.html',
})
export class PigGroupInputPage {

  public credentialsForm: FormGroup;
  public submitAttempt: boolean = false;

  public group = new group();

  public rounds:any = [
    {name:'Lứa 1',value:1},
    {name:'Lứa 2',value:2},
    {name:'Lứa 3',value:3},
    {name:'Lứa 4',value:4},
  ]

  public health_status:any = [
    {name:'Trạng thái 1',value:1},
    {name:'Trạng thái 2',value:2},
    {name:'Trạng thái 3',value:3},
    {name:'Trạng thái 4',value:4},
  ]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public platform: Platform
  ) {
    if(this.navParams.data.group){
      this.group = this.navParams.data.group;
    }

    this.credentialsForm = this.formBuilder.group({
      id: this.group.id,
      group_code: [this.group.group_code, Validators.compose([Validators.required, Validators.maxLength(1000)])],      
      parent_id: [this.group.parent_id,Validators.compose([Validators.required])],
      round_id: [this.group.round_id,Validators.compose([Validators.required])],
      father_id: [this.group.father_id,Validators.compose([Validators.required])],
      mother_id:[this.group.mother_id,Validators.compose([Validators.required])],
      avg_birthday:[this.group.avg_birthday,Validators.compose([Validators.required])],
      quantity:[this.group.quantity,Validators.compose([Validators.required])],
      health_status:[this.group.health_status,Validators.compose([Validators.required])],
      // overview_status:[this.group.overview_status,Validators.compose([Validators.required])],
      origin_sum_weight:[this.group.origin_sum_weight,Validators.compose([Validators.required])],
      origin_avg_weight:[this.group.origin_avg_weight,Validators.compose([Validators.required])],
      // status:[this.group.status,Validators.compose([Validators.required])],
      // mark:[this.group.mark,Validators.compose([Validators.required])],
      description:[this.group.description,Validators.compose([Validators.required, Validators.maxLength(1000)])],
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PigGroupInputPage');
  }

  onSubmit(){
    this.submitAttempt = true;
  }
}
