import { NavController, NavParams } from 'ionic-angular';

import { Component } from '@angular/core';
import { FcmProvider } from '../../providers/fcm/fcm';
import { ObjDataNotification } from '../../common/entity';
import { Utils } from '../../common/utils';

export class Schedule {
  name: string = '';
  date: any = '';
  employee: string = '';
  status: string = '';
}

@Component({
  selector: 'scheldule-detail',
  templateUrl: 'scheldule-detail.html'
})

export class SchelduleDetailComponent {

  public schedule: Schedule = new Schedule();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fcmProvider: FcmProvider,
    public util:Utils
  ) {
    if (this.navParams.data.schedule) {
      this.schedule = this.navParams.data.schedule;
      this.schedule.date = this.util.convertDate(this.schedule.date);
    }
  }


  pushNotification() {
    let param = new ObjDataNotification();

    param = {
      notification: {
        title:'Phân công công việc ngày '.concat(new Date(this.schedule.date).toISOString()),
        body: this.schedule.name,
        sound: 'default',
        icon: "fcm_push_icon"
      },
      data: this.schedule,
      registration_ids: ['fgt_8Qe00Kw:APA91bGKNGI0VfhIjy5OGlUPo1EW8ZlBKnYqFdHNVYmkc4BLNQcOuJQ4_C97AtoePddYQa8SP9FW5z1M89puYgmZR9zu3sRkO3tQh93vsAPXD72G_-z6JfaAuWWyWkz0YxqfiPlcuYzN'],
      priority: "high",
      restricted_package_name: 'io.ionic.quanlitrangtrai'
    }

    this.fcmProvider.pushNotification(param)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        return err;
      })

  }

}
