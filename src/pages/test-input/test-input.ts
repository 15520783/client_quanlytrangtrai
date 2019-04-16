import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ModalController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Utils } from '../../common/utils';
import { KEY } from '../../common/const';
import { PigGroupListComponent } from '../../components/pig-group-list/pig-group-list';

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
      group_code: ['', Validators.compose([Validators.required])]
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

  // presentModal() {
  //   this.util.getKey(KEY.GROUPS).then((data) => {
  //     let modal = this.modalCtrl.create(PigGroupListComponent, { groups: data, selectMode: true });
  //     modal.present();
  //     modal.onDidDismiss((data) => {
  //       if (data)
  //         this.group_code = data.group_code;
  //     })
  //   })
  // }
}
