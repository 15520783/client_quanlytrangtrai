import { Backdrop, Content, Events, IonicPage, MenuController, ModalController, NavController, NavParams, ToastController } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BackdropComponent } from '../../components/backdrop/backdrop';
import { EmployeesProvider } from '../../providers/employees/employees';
import { FarmsProvider } from '../../providers/farms/farms';
import { HousesProvider } from '../../providers/houses/houses';
import { KEY } from '../../common/const';
import { MyApp } from '../../app/app.component';
import { PigGroupsProvider } from '../../providers/pig-groups/pig-groups';
import { PigsProvider } from '../../providers/pigs/pigs';
import { SectionsProvider } from '../../providers/sections/sections';
import { UserProvider } from '../../providers/user/user';
import { Utils } from '../../common/utils';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  @ViewChild('content') content: Content;

  credentialsForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public util: Utils,
    public events: Events,
    public farmProvider: FarmsProvider,
    public pigProvider: PigsProvider,
    public pigGroupProvider: PigGroupsProvider,
    public sectionProvider: SectionsProvider,
    public employeeProvider: EmployeesProvider,
    public houseProvider: HousesProvider,
    public userProvider: UserProvider,
    public modalCtrl: ModalController
  ) {
    this.menuCtrl.enable(false);
    this.credentialsForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
      password: ['', Validators.compose([Validators.required, , Validators.maxLength(100)])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  scrollToBottom() {
    this.content.scrollToBottom();
  }

  onSubmit() {
    this.scrollToBottom();
    // this.navCtrl.setRoot(MyApp);
  }


  public wait: boolean = false;

  login() {
    if (this.credentialsForm.valid) {
      let backdrop = this.modalCtrl.create(BackdropComponent, {}, { cssClass: 'ion-modal' });
      backdrop.present();
      this.wait = true;
      let params = {
        username: this.credentialsForm.get('username').value,
        password: this.credentialsForm.get('password').value
      }
      this.userProvider.login(params)
        .then((res: any) => {
          console.log(res);
          if (res) {
            this.util.setKey(KEY.ACCESSTOKEN, res.accessToken)
              .then(() => {
                this.util.setKey(KEY.TOKENTYPE, res.tokenType)
              }).then(() => {
                this.util.setKey(KEY.EMPID, res.user.employee.id)
              }).then(() => {
                this.util.setKey(KEY.USERNAME, params.username)
              }).then(() => {
                this.util.setKey(KEY.PASSWORD, params.password);
              }).then(()=>{
                this.util.setKey(KEY.USER,res.user)
              })
              .catch((err) => {
                console.log(err);
              })
          }
        }).then(() => {
          backdrop.dismiss();
          this.events.publish('app_begin');
        })
        .catch((err: any) => {
          this.wait = false;
          backdrop.dismiss();
        })
        
    }
  }

}
