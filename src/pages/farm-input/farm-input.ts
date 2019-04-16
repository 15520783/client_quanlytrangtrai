import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-farm-input',
  templateUrl: 'farm-input.html',
})
export class FarmInputPage {

  public credentialsForm: FormGroup;
  public submitAttempt: boolean = false;
  public FarmTypes:any = [
    {name:'Loại 1',value:1},
    {name:'Loại 2',value:2},
    {name:'Loại 3',value:3},
    {name:'Loại 4',value:4},
    {name:'Loại 5',value:5},
  ]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder
  ) {

    this.credentialsForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(1000)])],
      type_id: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required, Validators.maxLength(1000)])],
      area: ['', Validators.compose([Validators.required])],
      founding:['', Validators.compose([Validators.required])],
      manager:['',Validators.compose([Validators.required])],
      description:['',Validators.compose([Validators.required, Validators.maxLength(1000)])],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FarmInputPage');
  }

  onSubmit(){
    this.submitAttempt = true;
  }
}
