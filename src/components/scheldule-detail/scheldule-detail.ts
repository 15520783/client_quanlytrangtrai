import { NavController, NavParams } from 'ionic-angular';
import { ObjDataNotification, schedule, user } from '../../common/entity';

import { ActivitiesProvider } from '../../providers/activities/activities';
import { Component } from '@angular/core';
import { EmployeesProvider } from '../../providers/employees/employees';
import { FcmProvider } from '../../providers/fcm/fcm';
import { ScheduleInputPage } from '../../pages/schedule-input/schedule-input';
import { Utils } from '../../common/utils';
import { VARIABLE } from '../../common/const';

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

  public schedule: schedule = new schedule();
  public personalMode:boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fcmProvider: FcmProvider,
    public activitiesProvider: ActivitiesProvider,
    public employeeProvider: EmployeesProvider,
    public util: Utils
  ) {
    if (this.navParams.data.schedule) {
      this.schedule = this.navParams.data.schedule;
      this.schedule['dateDisplay'] = this.util.convertDate(this.schedule.date);
    }
    if(this.navParams.data.personalMode){
      this.personalMode = this.navParams.data.personalMode;
    }
  }


  pushNotification() {
    let param = new ObjDataNotification();

    param = {
      notification: {
        title: 'Phân công công việc ngày '.concat(new Date(this.schedule.date).toISOString()),
        body: this.schedule.name,
        sound: 'default',
        icon: "fcm_push_icon"
      },
      data: this.schedule,
      registration_ids: [],
      priority: "high",
      restricted_package_name: 'io.ionic.quanlitrangtrai'
    }



    if (this.schedule.employee.email && this.schedule.id) {
      this.activitiesProvider.sendMailToEmployee(this.schedule.employee.email, this.schedule.id)
        .then((isOk) => {
          if (isOk) {
            this.util.showToastSuccess('Gửi mail thành công đến nhân viên');
          }
        })
        .catch(err => {
          return err;
        })
    }

    this.util.openBackDrop();
    this.employeeProvider.getUserAccountsOfEmployee(this.schedule.employee.id)
      .then((users: Array<user>) => {
        this.util.closeBackDrop();
        if (users.length) {
          let tokens: Array<string> = [];
          users.forEach((user) => {
            if (user.tokenNotification) {
              tokens.push(user.tokenNotification);
            }
          })
          if (tokens.length) {
            param.registration_ids = tokens;
            this.fcmProvider.pushNotification(param)
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                return err;
              })
          }
        }
      })
      .catch((err) => {
        this.util.closeBackDrop();
        return err;
      })
  }

  /**
   * Tạo một công việc
   */
  input() {
    let callback = (schedule: schedule) => {
      if (schedule) {
        this.navCtrl.pop();
        this.navParams.get('callbackUpdate')(schedule);
      }
    }
    this.navCtrl.push(ScheduleInputPage, { schedule: this.schedule, callback: callback });
  }

  /**
   * Xóa công việc lên kế hoạch
   */
  delete() {
    this.activitiesProvider.removeSchedule(this.schedule)
      .then((isOk) => {
        if (isOk) {
          this.navParams.get('callbackRemove')(this.schedule);
        }
      })
      .catch((err) => {
        return err;
      })
  }

  edit() {
    let callback = (schedule: schedule) => {
      if (schedule) {
        this.navCtrl.pop();
        this.navParams.get('callbackUpdate')(schedule);
      }
    }

    this.navCtrl.push(ScheduleInputPage, {
      updateMode: true,
      schedule: this.schedule,
      callback: callback
    })
  }

  confirmCompleteSchedule(){
    this.schedule.status = VARIABLE.SCHEDULE_STATUS.COMPLETE.name;
    this.activitiesProvider.updateSchedule(this.schedule)
    .then((updated_schedule:schedule)=>{
      if(updated_schedule){
        this.navParams.get('callbackUpdate')(updated_schedule);
      }
    })
    .catch((err)=>{
      console.log(err);
      return err;
    })
  }
}
