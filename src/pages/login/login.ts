import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, ToastController, MenuController, Events, Backdrop, ModalController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MyApp } from '../../app/app.component';
import { Utils } from '../../common/utils';
import { FarmsProvider } from '../../providers/farms/farms';
import { PigsProvider } from '../../providers/pigs/pigs';
import { PigGroupsProvider } from '../../providers/pig-groups/pig-groups';
import { SectionsProvider } from '../../providers/sections/sections';
import { EmployeesProvider } from '../../providers/employees/employees';
import { HousesProvider } from '../../providers/houses/houses';
import { UserProvider } from '../../providers/user/user';
import { KEY } from '../../common/const';
import { BackdropComponent } from '../../components/backdrop/backdrop';

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
          if (res) {
            this.util.setKey(KEY.ACCESSTOKEN, res.accessToken)
              .then(() => {
                this.util.setKey(KEY.TOKENTYPE, res.tokenType)
              }).then(() => {
                this.util.setKey(KEY.EMPID, res.employeeId)
              })
          }
        })
        .catch((err: any) => {
          this.wait = false;
        })
        .then(() => {
          backdrop.dismiss();
          this.events.publish('app_begin');
        })
    }
  }

}
