import { Injectable } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONFIG, API } from '../../common/const';
import { ObjDataNotification } from '../../common/entity';
import { Firebase } from '@ionic-native/firebase';
import { AngularFirestore } from 'angularfire2/firestore';
import { tap } from 'rxjs/operators';

@Injectable()
export class FcmProvider {

  constructor(
    public afs: AngularFirestore,
    private platform: Platform,
    public http: HttpClient,
    public toastCtrl: ToastController,
    public firebaseNative: Firebase,
  ) {
  }


  // Get permission from the user
  async getToken() {
    let token;

    if (this.platform.is('android')) {
      token = await this.firebaseNative.getToken()
      console.log(token);
    }

    if (this.platform.is('ios')) {
      token = await this.firebaseNative.getToken();
      await this.firebaseNative.grantPermission();
    }

    return this.saveTokenToFirestore(token);
  }

  // Save the token to firestore
  private saveTokenToFirestore(token) {
    if (!token) return;

    const devicesRef = this.afs.collection('devices')

    const docData = {
      token,
      userId: 'testUser',
    }
    return devicesRef.doc(token).set(docData);
  }

  // Listen to incoming FCM messages
  listenToNotifications() {
    return this.firebaseNative.onNotificationOpen().pipe(
      tap(msg => {
        // show a toast
        const toast = this.toastCtrl.create({
          message: msg.body,
          duration: 3000
        });
        toast.present();
      })
    ).subscribe();
  }


  /**Push notification using firebase cloud message */
  pushNotification(dataNoti: ObjDataNotification) {
    let headers = new HttpHeaders().set('Authorization', ('key = ').concat(CONFIG.FCM_HEADER_KEY));
    return this.http
      .post(API.PUSH_NOTIFICATION, dataNoti, { headers: headers })
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

}
