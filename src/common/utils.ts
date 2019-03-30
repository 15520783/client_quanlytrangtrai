import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';


@Injectable()
export class Utils {

  constructor(
    public http: HttpClient,
    public toastCtrl: ToastController
    ) {
  }

  showToast(message){
    let toast = this.toastCtrl.create(
      {
        message: message,
        showCloseButton: true,
        position: 'bottom',
        duration: 5000,
        closeButtonText: 'Close',
        cssClass:'ion-toast'
      }
    )
    return toast.present();
  }
}
