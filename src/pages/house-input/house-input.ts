import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { house } from '../../common/entity';

@IonicPage()
@Component({
  selector: 'page-house-input',
  templateUrl: 'house-input.html',
})
export class HouseInputPage {

  public credentialsForm: FormGroup;
  public submitAttempt: boolean = false;
  public HouseTypes: any = [
    { name: 'Loại 1', value: 1 },
    { name: 'Loại 2', value: 2 },
    { name: 'Loại 3', value: 3 },
    { name: 'Loại 4', value: 4 },
    { name: 'Loại 5', value: 5 },
  ]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder
  ) {
    this.credentialsForm = this.formBuilder.group({
      section_id: [this.navParams.data.section.id, Validators.compose([Validators.required, Validators.maxLength(1000)])],
      type_id: ['', Validators.compose([Validators.required])],
      house_code: ['', Validators.compose([Validators.required, Validators.maxLength(1000)])],
      name: ['', Validators.compose([Validators.required,Validators.maxLength(1000)])],
      position:['', Validators.compose([Validators.required,Validators.maxLength(1000)])],
      founding:['', Validators.compose([Validators.required])],
      manager:['',Validators.compose([Validators.required])],
      description:['',Validators.compose([Validators.required, Validators.maxLength(1000)])],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HouseInputPage');
  }

  onSubmit(){
    this.submitAttempt = true;
    let form = this.credentialsForm;
    let house:house = {
      id:'',
      section_id:form.get('section_id').value,
      type_id:form.get('type_id').value,
      house_code:form.get('house_code').value,
      name:form.get('name').value,
      description:form.get('description').value,
      position:form.get('position').value,
      manager:form.get('manager').value,
      founding:form.get('founding').value
    }; 

    console.log(house);
  }
}
