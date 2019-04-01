import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Injectable()
export class Utils {
  protected loading: Loading;

  constructor(
    public http: HttpClient,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public storage: Storage
  ) {
  }

  showToast(message) {
    let toast = this.toastCtrl.create(
      {
        message: message,
        showCloseButton: true,
        position: 'bottom',
        duration: 5000,
        closeButtonText: 'Close',
        cssClass: 'ion-toast'
      }
    )
    return toast.present();
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

}
