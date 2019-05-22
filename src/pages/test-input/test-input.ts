import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ModalController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Utils } from '../../common/utils';
import { KEY } from '../../common/const';
import { group } from '../../common/entity';

@IonicPage()
@Component({
  selector: 'page-test-input',
  templateUrl: 'test-input.html',
})
export class TestInputPage {

  public credentialsForm: FormGroup;
  public submitAttempt: boolean = false;
  public farms: any = [];
  public options: any;
  public group:group;
  

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public util: Utils,
    public popoverCtrl: PopoverController,
    public modalCtrl: ModalController
  ) {
    this.options = {
      title: 'Chọn trang trại',
    }

    this.credentialsForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.maxLength(10)])],
      password: ['', Validators.compose([Validators.required, , Validators.maxLength(10)])],
      date: ['', Validators.compose([Validators.required])],
      farm: ['', Validators.compose([Validators.required])],
      group_code: ['', Validators.compose([Validators.required])],
      employee_id:['',Validators.compose([Validators.required])],
      pig_id:['',Validators.compose([Validators.required])],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestInputPage');
    this.util.getKey(KEY.FARMS).then((data) => {
      data.forEach((e) => {
        if (e) {
          this.farms.push({
            name: e.name,
            // type: 'radio',
            // label: e.name,
            value: e,
          })
        }
      });
    })
  }

  getGroup(event){
    this.group = event;
  }
  submit(){
    console.log(this.group);
  }
}
