import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { AngularFirestore } from 'angularfire2/firestore';
import { Platform, Config } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONFIG, API } from '../../common/const';
import { ObjDataNotification } from '../../common/entity';

@Injectable()
export class FcmProvider {

  constructor(
    public firebaseNative: Firebase,
    public afs: AngularFirestore,
    private platform: Platform,
    public http: HttpClient
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

    return this.saveTokenToFirestore(token)
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
    return this.firebaseNative.onNotificationOpen();
  }


  /**Push notification using firebase cloud message */
  pushNotification(dataNoti:ObjDataNotification) {
    let headers = new HttpHeaders().set('Authorization', ('key = ').concat(CONFIG.FCM_HEADER_KEY));
    return this.http
      .post(API.PUSH_NOTIFICATION, dataNoti, { headers: headers })
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

}
