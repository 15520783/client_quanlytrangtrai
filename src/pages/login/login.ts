import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, ToastController, MenuController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MyApp } from '../../app/app.component';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
    public toastCtrl: ToastController
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
    // setTimeout(()=>{
    //   this.navCtrl.setRoot(HomePage);
    //   this.menuCtrl.enable(true);
    //   this.wait = false;
    // },2000);
    const toast = this.toastCtrl.create(
      {
        message: 'Username/Password is wrong. Try again.',
        showCloseButton: true,
        position: 'bottom',
        duration: 5000,
        closeButtonText: 'Close',
        cssClass:'ion-toast'
      }
    )
    toast.present().then((res)=>{
      this.wait=false;
      this.navCtrl.setRoot(HomePage);
    })
  }
}
