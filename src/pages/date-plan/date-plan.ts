import { CONFIG, MESSAGE } from '../../common/const';
import { Component, ViewChild } from '@angular/core';
import { Events, IonicPage, ModalController, Nav, NavController, NavParams, Platform, PopoverController, ViewController } from 'ionic-angular';
import { breedings, mating, schedule } from '../../common/entity';

import { ActivitiesProvider } from '../../providers/activities/activities';
import { CalendarComponent } from 'ng-fullcalendar';
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
    public eventEmitter: Events
  ) {

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
          left: 'title',
          right: this.platform.is('core') ? 'dayGridMonth,listWeek' : 'dayGridWeek,listWeek'
        },
        footer: {
          right: 'today prev,next'
        },
        height: 'parent',
        fixedWeekCount: false,
        editable: true,
        contentHeight: this.platform.is('core') ? 500 : 400,
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
        this.events.push({
          id: schedule.id,
          title: schedule.name,
          status: schedule.status,
          date: this.GetFormattedDate(schedule.date) + " 07:00",
          employee: schedule.employee,
          schedule: schedule,
          backgroundColor: (new Date(schedule.date) >= new Date()) ?
            (schedule.employee ? '#32db64' : '#01c2fa') : '#f53d3d',
          borderColor: (new Date(schedule.date) >= new Date()) ? (schedule.employee ? '#32db64' : '#01c2fa') : '#f53d3d'
        })
      }
    })
  }

  handleEventClick(model) { // handler method
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
            this.eventEmitter.publish('home:reloadSchedule');
          })
          .catch((err)=>{
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
              this.schedules.push(newSchedule);
              this.events.push({
                id: newSchedule.id,
                title: newSchedule.name,
                status: newSchedule.status,
                date: this.GetFormattedDate(newSchedule.date) + " 07:00",
                employee: newSchedule.employee,
                backgroundColor: (new Date(newSchedule.date) >= new Date()) ?
                  (newSchedule.employee ? '#32db64' : '#01c2fa') : '#f53d3d',
                borderColor: (new Date(newSchedule.date) >= new Date()) ? (newSchedule.employee ? '#32db64' : '#01c2fa') : '#f53d3d'
              })
              this.eventEmitter.publish('home:reloadSchedule');
            }
          })
          .catch((err) => {
            return err;
          })
      }
    }
    this.navCtrl.push(ScheduleInputPage, { dateInput: event.dateStr, callback: callback })
  }





}
