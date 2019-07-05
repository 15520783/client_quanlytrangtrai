import { CONFIG, MESSAGE, VARIABLE } from '../../common/const';
import { Component, ViewChild } from '@angular/core';
import { Events, IonicPage, ModalController, NavController, NavParams, Platform, PopoverController } from 'ionic-angular';
import { ObjDataNotification, breedings, mating, schedule, user } from '../../common/entity';

import { ActivitiesProvider } from '../../providers/activities/activities';
import { CalendarComponent } from 'ng-fullcalendar';
import { EmployeesProvider } from '../../providers/employees/employees';
import { FcmProvider } from '../../providers/fcm/fcm';
import { OptionsInput } from '@fullcalendar/core';
import { ScheduleInputPage } from '../schedule-input/schedule-input';
import { SchelduleDetailComponent } from '../../components/scheldule-detail/scheldule-detail';
import { UserProvider } from '../../providers/user/user';
import { Utils } from '../../common/utils';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import resourceTimeline from '@fullcalendar/resource-timeline';
import timeGridPlugin from '@fullcalendar/timegrid';

export class Schedule {
  breedings: Array<breedings> = [];
  matings: Array<mating> = []
}

@IonicPage()
@Component({
  selector: 'page-date-plan',
  templateUrl: 'date-plan.html',
})

export class DatePlanPage {
  @ViewChild('calendar') calendar: any;
  @ViewChild('fullcalendar') fullcalendar: CalendarComponent;

  options: OptionsInput;

  public schedules: Array<schedule> = [];
  public events: Array<any> = [];
  public month: number;
  public year: number;

  calendarPlugins = [interactionPlugin, resourceTimeline, dayGridPlugin, timeGridPlugin, listPlugin]; // important!

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public activitiesProvider: ActivitiesProvider,
    public userProvider: UserProvider,
    public util: Utils,
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    public employeeProvider: EmployeesProvider,
    public actitvitiesProvider: ActivitiesProvider,
    public fcmProvider: FcmProvider,
    public eventEmitter: Events
  ) {
    this.month = new Date().getMonth() + 1;
    this.year = new Date().getFullYear();
  }

  ngOnInit(): void {

  }

  ionViewDidLoad() {
    this.loadCalendar();
  }

  loadCalendar() {
    this.getSchedule().then((data) => {
      this.initSchedule();
      this.options = {
        schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
        selectable: true,
        defaultView: this.platform.is('core') ? "dayGridMonth" : "listWeek",
        header: {
          left: 'today prev,next',
          // center: 'title',
          right: this.platform.is('core') ? 'dayGridMonth,listWeek' : 'dayGridWeek,listWeek'
        },
        height: 'parent',
        fixedWeekCount: false,
        editable: true,
        contentHeight: this.platform.is('core') ? 400 : 400,
        plugins: this.calendarPlugins,
        weekends: true,
        locale: 'vi',
        timeZone: 'UTC',
        // isRTL: false,
        eventLimit: true,
        displayEventTime: false,
        views: {
          timeGrid: {
            eventLimit: 0,
          }
        },
        events: this.events
        // events: [
        //   { title: 'Sự kiện 1', object:{}, start: '2019-04-01', classNames: ['event-fullcalendar'] },
        //   { title: 'Sự kiện 1', object:{}, start: '2019-04-01', classNames: ['event-fullcalendar'] },
        //   { title: 'Sự kiện 1', object:{}, start: '2019-04-01', classNames: ['event-fullcalendar'] },
        //   { title: 'Sự kiện 1', object:{}, start: '2019-04-01', classNames: ['event-fullcalendar'] },
        //   { title: 'Sự kiện 3', object:{}, date: '2019-04-01', classNames: ['event-fullcalendar'] },
        //   { title: 'Sự kiện 2', object:{}, date: '2019-04-02', classNames: ['event-fullcalendar'] }
        // ]


        // defaultView: 'resourceTimelineDay',
        // locale: 'vi',
        // isRTL: false,
        // header: {
        //   left: 'today prev,next',
        //   center: 'title',
        //   right: 'resourceTimelineDay,resourceTimelineWeek'
        // },
        // contentHeight: this.platform.is('core') ? 550 : 400,
        // schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
        // plugins: this.calendarPlugins,
        // resources: [
        //   {
        //     id: 'A',
        //     title: 'Resource A'
        //   },
        //   {
        //     id: 'B',
        //     title: 'Resource B'
        //   },
        //   {
        //     id: 'C',
        //     title: 'Resource C'
        //   }
        // ],
        // events: [
        //   {
        //     id: '1',
        //     resourceId: 'A',
        //     title: 'Meeting',
        //     start: '2019-04-08 7:30',
        //     end: '2019-04-08 9:30'
        //   }
        // ]
      }
    })
  }

  getSchedule() {
    this.util.openBackDrop();
    return this.userProvider.getSchedule()
      .then((data: Array<schedule>) => {
        if (data) {
          this.schedules = data;
        }
        this.util.closeBackDrop();
      })
      .catch((err) => {
        console.log(err);
        this.util.closeBackDrop();
        this.util.showToast(MESSAGE[CONFIG.LANGUAGE_DEFAULT].TIMEOUT_REQUEST)
      })
  }

  GetFormattedDate(value) {
    let date = new Date(value);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }

  initSchedule() {
    this.schedules.forEach((schedule) => {
      if (schedule) {
        let today = new Date(new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate());
        this.events.push({
          id: schedule.id,
          title: schedule.name,
          status: schedule.status,
          date: this.GetFormattedDate(schedule.date) + " 07:00",
          employee: schedule.employee,
          schedule: schedule,
          backgroundColor: (new Date(schedule.date) >= today) ?
            (schedule.employee ?
              (schedule.status == VARIABLE.SCHEDULE_STATUS.COMPLETE.name ? VARIABLE.SCHEDULE_STATUS.COMPLETE.color : VARIABLE.SCHEDULE_STATUS.ASSIGNED.color) : VARIABLE.SCHEDULE_STATUS.NOT_ASSIGNED.color) : VARIABLE.SCHEDULE_STATUS.OVERDUE.color,
          borderColor: (new Date(schedule.date) >= today) ?
            (schedule.employee ?
              (schedule.status == VARIABLE.SCHEDULE_STATUS.COMPLETE.name ? VARIABLE.SCHEDULE_STATUS.COMPLETE.color : VARIABLE.SCHEDULE_STATUS.ASSIGNED.color) : VARIABLE.SCHEDULE_STATUS.NOT_ASSIGNED.color) : VARIABLE.SCHEDULE_STATUS.OVERDUE.color
        })
      }
    })
  }

  handleEventClick(model) { // handler method
    console.log(model);
    let callbackRemove = (schedule: schedule) => {
      if (schedule) {
        let idx = this.events.findIndex(_event => _event.id == schedule.id);
        if (idx > -1) {
          this.events.splice(idx, 1);
        }
        modal.dismiss();
        this.eventEmitter.publish('home:reloadSchedule');
      }
    }

    let callbackUpdate = (schedule: schedule) => {
      if (schedule) {
        this.activitiesProvider.updateSchedule(schedule)
          .then((updated_schedule: schedule) => {
            modal.dismiss();
            if(updated_schedule.employee){
              this.pushNotification(updated_schedule);
            }else{
              this.eventEmitter.publish('home:reloadSchedule');
            }
          })
          .catch((err) => {
            return err;
          })
      }
    }


    let modal = this.modalCtrl.create(SchelduleDetailComponent, {
      schedule: model.event.extendedProps.schedule,
      callbackRemove: callbackRemove,
      callbackUpdate: callbackUpdate
    });

    modal.present();
  }

  handleDayClick(event) {
    let callback = (schedule: schedule) => {
      if (schedule) {
        this.activitiesProvider.createSchedule(schedule)
          .then((newSchedule: schedule) => {
            if (newSchedule) {
              if (newSchedule.employee) {
                this.pushNotification(newSchedule);
              } else {
                this.eventEmitter.publish('home:reloadSchedule');
              }
            }
          })
          .catch((err) => {
            return err;
          })
      }
    }
    this.navCtrl.push(ScheduleInputPage, { dateInput: event.dateStr, callback: callback })
  }

  clickButton(button: { buttonType: string, data: Date }) {
    if (button.buttonType == 'next') {
      this.month = button.data.getMonth() + 1;
      this.year = button.data.getFullYear();
    }
    else if (button.buttonType == 'prev') {
      this.month = button.data.getMonth() + 1;
      this.year = button.data.getFullYear();
    } else if (button.buttonType == 'today') {
      this.month = button.data.getMonth() + 1;
      this.year = button.data.getFullYear();
    }
  }

  pushNotification(schedule: schedule): Promise<Object> {
    let param = new ObjDataNotification();

    param = {
      notification: {
        title: 'Phân công công việc ngày '.concat(this.util.convertDate(schedule.date)),
        body: schedule.name,
        sound: 'default',
        icon: "fcm_push_icon"
      },
      data: schedule,
      registration_ids: [],
      priority: "high",
      restricted_package_name: 'io.ionic.quanlitrangtrai'
    }

    if (schedule.employee.email && schedule.id) {
      this.activitiesProvider.sendMailToEmployee(schedule.employee.email, schedule.id)
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
    return this.employeeProvider.getUserAccountsOfEmployee(schedule.employee.id)
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
                this.eventEmitter.publish('home:reloadSchedule')
              })
          }
        }
      })
      .catch((err) => {
        this.util.closeBackDrop();
        this.eventEmitter.publish('home:reloadSchedule')
        return err;
      })
  }
}
