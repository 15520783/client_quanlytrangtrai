import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController, AlertController, LoadingController, Loading, Platform, ModalController, Modal } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Toast } from '@ionic-native/toast';

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
    private toastNative: Toast,
    public modalCtrl: ModalController
  ) {

  }

  showToast(message) {
    this.toastOptions = {
      message: message,
      duration: 5000,
      position: 'bottom',
      styling: {
        opacity: 0.75, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
        backgroundColor: '#FF0000', // make sure you use #RRGGBB. Default #333333
        textColor: '#FFFFFF', // Ditto. Default #FFFFFF
        cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
      },
      closeButtonText: 'Close',
      cssClass: 'ion-toast',
      showCloseButton: true,
    }
    if (this.platform.is('cordova')) {
      return this.toastNative.showWithOptions(this.toastOptions).toPromise();
    } else {
      this.toast = this.toastCtrl.create(this.toastOptions)
      return this.toast.present();
    }
  }

  showAlert(options: any) {
    let alert = this.alertCtrl.create(options);
    return alert.present();
  }

  showLoading(options: any) {
    this.loading = this.loadingCtrl.create(options);
    return this.loading.present();
  }

  closeLoading() {
    return this.loading.dismiss();
  }

  convertDate(date) {
    var options = {
      weekday: "long",
      year: "numeric",
      month: "2-digit",
      day: "numeric"
    };

    return new Date(date).toLocaleDateString("vn", options);
  }

  getKey(key: string) {
    return this.storage.get(key);
  }

  setKey(key: string, data: any) {
    return this.storage.set(key, data);
  }

  openModal(page, data) {
    this.modal = this.modalCtrl.create(page, data,{cssClass:'ion-modal'});
    return this.modal.present();
  }

}
