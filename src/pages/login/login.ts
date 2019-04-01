import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, ToastController, MenuController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MyApp } from '../../app/app.component';
import { HomePage } from '../home/home';
import {Utils} from '../../common/utils';
import { FarmsProvider } from '../../providers/farms/farms';

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
    public farmProvider: FarmsProvider
  ) {
    this.menuCtrl.enable(false);
    this.credentialsForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.maxLength(10)])],
      password: ['', Validators.compose([Validators.required, , Validators.maxLength(10)])]
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
    this.navCtrl.setRoot(MyApp);
  }


  public wait: boolean = false;

  login() {
    console.log(this.credentialsForm.controls.username);
    console.log(this.credentialsForm.controls.password);
    this.wait = true;

    this.util.showToast('Username/Password is wrong. Try again.')
    .then((res)=>{
      this.wait=false;
      // this.farmProvider.sync();
      setTimeout(() => {
        this.navCtrl.setRoot(HomePage);        
      }, 1000);
    })
  }
}
