import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Component } from '@angular/core';
import { house } from '../../common/entity';

@IonicPage()
@Component({
  selector: 'page-house-input',
  templateUrl: 'house-input.html',
})
export class HouseInputPage {

  public credentialsForm: FormGroup;
  public submitAttempt: boolean = false;

  public house = new house();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder
  ) {
    if (this.navParams.data.house) {
      this.house = this.navParams.data.house;
      this.house.founding = new Date(this.house.founding).toISOString();
    }
    if (this.navParams.data.section) {
      this.house.section = this.navParams.data.section;
    }

    this.credentialsForm = this.formBuilder.group({
      section_id: [this.house.section.id, Validators.compose([Validators.required, Validators.maxLength(1000)])],
      houseCode: [this.house.houseCode, Validators.compose([Validators.required, Validators.maxLength(1000)])],
      name: [this.house.name, Validators.compose([Validators.required, Validators.maxLength(1000)])],
      position: [this.house.position, Validators.compose([Validators.required, Validators.maxLength(1000)])],
      founding: [this.house.founding, Validators.compose([Validators.required])],
      status: this.house.status,
      description: [this.house.description, Validators.compose([Validators.required, Validators.maxLength(1000)])],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HouseInputPage');
  }

  onSubmit() {
    this.submitAttempt = true;
    if (this.credentialsForm.valid) {
      Object.keys(this.credentialsForm.value).forEach((attr) => {
        this.house[attr] = this.credentialsForm.value[attr];
      })
      this.navParams.get('callback')(this.house);
    }
  }
}
