import { CONFIG, MESSAGE } from '../../common/const';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, Platform, PopoverController } from 'ionic-angular';
import { breedings, mating, schedule } from '../../common/entity';

import { ActivitiesProvider } from '../../providers/activities/activities';
import { CalendarComponent } from 'ng-fullcalendar';
import { OptionsInput } from '@fullcalendar/core';
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
  eventsModel: any;

  public schedules:Array<schedule> = [];
  public events: Array<any> = [];

  calendarPlugins = [interactionPlugin, resourceTimeline, dayGridPlugin, timeGridPlugin, listPlugin]; // important!
  // calendarOptions: any;
  // calendarPlugins = [dayGridPlugin, timeGridPlugin]; // important!

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public activitiesProvider: ActivitiesProvider,
    public userProvider: UserProvider,
    public util: Utils,
    public modalCtrl: ModalController,
    public popoverCtrl:PopoverController
  ) {
    this.getSchedule().then((data) => {
      this.initSchedule();
      this.options = {
        schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
        selectable: true,
        defaultView: this.platform.is('core') ? "dayGridMonth" : "listWeek",
        header: {
          left: 'title',
          right: this.platform.is('core') ?'dayGridMonth,listWeek':'dayGridWeek,listWeek'
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
        isRTL: false,
        eventLimit: true,
        displayEventTime: false,
        views: {
          timeGrid: {
            eventLimit: 0,
          }
        },
        events: []
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

  ionViewDidLoad() {

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
          status:schedule.status,
          date: this.GetFormattedDate(schedule.date)+" 07:00",
          // end: this.GetFormattedDate(schedule.date)+' 23:59',
          employee:schedule.employee,
          backgroundColor: (new Date(schedule.date) >= new Date()) ? 
          (schedule.employee?'#32db64':'#01c2fa'): '#f53d3d',
          borderColor: (new Date(schedule.date) >= new Date()) ? (schedule.employee?'#32db64':'#01c2fa') : '#f53d3d'
        })
      }
    })
  }

  handleEventClick(model) { // handler method
    console.log(model.event.extendedProps);
    let modal = this.modalCtrl.create(SchelduleDetailComponent, {
      schedule: {
        name: model.event.title,
        date: model.event.start,
        employee: model.event.extendedProps.employee,
        status: model.event.extendedProps.status,
      }
    });

    modal.present();
  }

  handleDayClick(event) {
    console.log(event);
  }





}
