import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { employee, section } from '../../common/entity';

import { Component } from '@angular/core';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { VARIABLE } from '../../common/const';

@IonicPage()
@Component({
  selector: 'page-section-input',
  templateUrl: 'section-input.html',
})
export class SectionInputPage {

  public credentialsForm: FormGroup;
  public submitAttempt: boolean = false;

  public section = new section();
  public manOfSection: Array<employee> = [];
  public typeSections: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public deployData: DeployDataProvider
  ) {
    this.typeSections = VARIABLE.SECTION_TYPE.filter((e)=>{
      return e.id != '0' ? true:false;
    });
    if (this.navParams.data.section) {
      this.section = this.navParams.data.section;
      this.section.founding = new Date(this.section.founding).toISOString();
    }

    if (this.navParams.data.farmId) {
      this.section.farm.id = this.navParams.data.farmId;
    }

    let manOfFarm = this.deployData.get_employees_of_farm(this.section.farm.id);
    if(manOfFarm && manOfFarm.length){
      this.manOfSection = manOfFarm.filter((employee) => {
        return employee.regency.id == VARIABLE.REGENCIES.quan_ly_khu.id ? true : false;
      })
    }
    

    this.credentialsForm = this.formBuilder.group({
      farm: this.section.farm,
      typeId: [this.section.typeId, Validators.compose([Validators.required])],
      name: [this.section.name, Validators.compose([Validators.required, Validators.maxLength(1000)])],
      description: [this.section.description, Validators.compose([Validators.required, Validators.maxLength(1000)])],
      founding: [this.section.founding, Validators.compose([Validators.required])],
      manager: [this.section.manager, Validators.compose([Validators.required])]
    });
  }

  onSubmit() {
    this.submitAttempt = true;
    if (this.credentialsForm.valid) {
      Object.keys(this.credentialsForm.value).forEach((attr) => {
        this.section[attr] = this.credentialsForm.value[attr];
      })
      this.navParams.get('callback')(this.section);
    }
  }

}
