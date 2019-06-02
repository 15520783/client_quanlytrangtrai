import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { farm } from '../../common/entity';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';

@IonicPage()
@Component({
  selector: 'page-farm-input',
  templateUrl: 'farm-input.html',
})
export class FarmInputPage {

  public credentialsForm: FormGroup;
  public submitAttempt: boolean = false;
  public FarmTypes: any = [];

  public farm = new farm();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public modalCtrl: ModalController,
    public deployData:DeployDataProvider
  ) {
    this.FarmTypes = this.deployData.get_farm_types_list_for_select();

    if (this.navParams.data.farm) {
      this.farm = this.navParams.data.farm;
      this.farm.founding = new Date(this.navParams.data.farm.founding).toISOString();
      console.log(new Date(this.navParams.data.farm.founding).toISOString());
    }

    this.credentialsForm = this.formBuilder.group({
      id: this.farm.id,
      name: [this.farm.name, Validators.compose([Validators.required, Validators.maxLength(1000)])],
      type_id: [this.farm.type.id, Validators.compose([Validators.required])],
      address: [this.farm.address, Validators.compose([Validators.required, Validators.maxLength(1000)])],
      area: [this.farm.area, Validators.compose([Validators.required])],
      founding: [this.farm.founding, Validators.compose([Validators.required])],
      manager: [this.farm.manager, Validators.compose([Validators.required])],
      description: [this.farm.description, Validators.compose([Validators.required, Validators.maxLength(1000)])],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FarmInputPage');
  }

  onSubmit() {
    this.submitAttempt = true;
    console.log(this.credentialsForm.value);
    if (this.credentialsForm.valid) {
      Object.keys(this.credentialsForm.value).forEach((attr)=>{
        this.farm[attr] = this.credentialsForm.value[attr];
      })
      this.farm.type.id = this.credentialsForm.value.type_id;
      this.navParams.get('callback')(this.farm);
    }
  }
}
