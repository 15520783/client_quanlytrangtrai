import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController, AlertController, LoadingController, Loading, Platform, ModalController, Modal } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BackdropComponent } from '../components/backdrop/backdrop';
import { PigsProvider } from '../providers/pigs/pigs';

@Injectable()
export class Utils {
  protected loading: Loading;
  protected toast: any;
  protected toastOptions: any;
  protected modal: Modal;

  constructor(
    public http: HttpClient,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public platform: Platform,
    public modalCtrl: ModalController,
  ) {

  }

  isEmpty(obj) {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop))
        return false;
    }
    return true;
  }

  isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  showToast(message) {
    this.toastOptions = {
      message: message,
      duration: 5000,
      position: 'bottom',
      closeButtonText: 'Close',
      cssClass: 'ion-toast',
      showCloseButton: true,
    }
    this.toast = this.toastCtrl.create(this.toastOptions)
    return this.toast.present();
  }

  showToastInform(message:string){
    this.toastOptions = {
      message: message,
      duration: 5000,
      position: 'bottom',
      closeButtonText: 'Close',
      cssClass: 'ion-toast-inform',
      showCloseButton: true,
    }
    this.toast = this.toastCtrl.create(this.toastOptions)
    return this.toast.present();
  }

  showToastSuccess(message) {
    this.toastOptions = {
      message: message,
      duration: 5000,
      position: 'bottom',
      closeButtonText: 'Close',
      cssClass: 'ion-toast-success',
      showCloseButton: true,
    }
    this.toast = this.toastCtrl.create(this.toastOptions)
    return this.toast.present();
  }

  showAlert(options: any) {
    let alert = this.alertCtrl.create(options);
    return alert.present();
  }

  showLoading(message: string) {
    let options = {
      content: message,
      spinner: 'circles',
      cssClass: 'ion-loading'
    }
    this.loading = this.loadingCtrl.create(options);
    return this.loading.present();
  }

  closeLoading() {
    return this.loading.dismiss();
  }

  convertDate(date) {
    var options = {
      // weekday: "long",
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    };

    return new Date(date).toLocaleDateString("vn", options);
  }

  getKey(key: string) {
    return this.storage.get(key);
  }

  setKey(key: string, data: any) {
    return this.storage.set(key, data);
  }

  removeKey(key:string){
    return this.storage.remove(key);
  }

  clearAllKeyStorage(){
    return this.storage.clear();
  }

  openModal(page, data) {
    this.modal = this.modalCtrl.create(page, data, { cssClass: 'ion-modal' });
    return this.modal.present();
  }

  closeModal(){
    return this.modal.dismiss();
  }

  
  deepClone(obj){
    return JSON.parse(JSON.stringify(obj));
  }

  openBackDrop(){
    this.modal = this.modalCtrl.create(BackdropComponent, {}, { cssClass: 'ion-modal' });
    return this.modal.present();
  }

  closeBackDrop(){
    return this.modal.dismiss();
  }
}
