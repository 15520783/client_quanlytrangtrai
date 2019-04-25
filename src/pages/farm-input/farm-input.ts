import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { farm } from '../../common/entity';

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
  ];

  public farm = new farm();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public modalCtrl: ModalController
  ) {
    if(this.navParams.data.farm){
      this.farm = this.navParams.data.farm;
    }

    this.credentialsForm = this.formBuilder.group({
      id: this.farm.id,
      name: [this.farm.name, Validators.compose([Validators.required, Validators.maxLength(1000)])],
      type_id: [this.farm.type.id, Validators.compose([Validators.required])],
      address: [this.farm.address, Validators.compose([Validators.required, Validators.maxLength(1000)])],
      area: [this.farm.area, Validators.compose([Validators.required])],
      founding:[this.farm.founding, Validators.compose([Validators.required])],
      manager:[this.farm.manager,Validators.compose([Validators.required])],
      description:[this.farm.description,Validators.compose([Validators.required, Validators.maxLength(1000)])],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FarmInputPage');
  }

  onSubmit(){
    this.submitAttempt = true;
    console.log(this.credentialsForm.value);
    // let modal = this.modalCtrl.create(FarmInputPage,null,{showBackdrop:false});
    // return modal.present();
  }
}
