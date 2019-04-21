import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import resourceTimeline from '@fullcalendar/resource-timeline';
import interactionPlugin from '@fullcalendar/interaction';
import { OptionsInput } from '@fullcalendar/core';
import { CalendarComponent } from 'ng-fullcalendar';

@IonicPage()
@Component({
  selector: 'page-date-plan',
  templateUrl: 'date-plan.html',
})
export class DatePlanPage {
  @ViewChild('calendar') calendar: any;

  calendarPlugins = [interactionPlugin, resourceTimeline, dayGridPlugin, timeGridPlugin, listPlugin]; // important!
  // calendarOptions: any;
  // calendarPlugins = [dayGridPlugin, timeGridPlugin]; // important!

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform
  ) {
    // this.calendarOptions = {
    //   dayClick: (date, jsEvent, view, resourceObj) => {
    //     console.log('Date: ' + date.format());
    //   }
    // };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DatePlanPage');
  }

  handleEventClick(arg) { // handler method
    console.log(arg.event.title);
    console.log(arg.event.start);
    console.log(arg.event.end);
  }

  handleDayClick(event) {
    console.log(event);
  }


  options: OptionsInput;
  eventsModel: any;
  @ViewChild('fullcalendar') fullcalendar: CalendarComponent;
  ngOnInit() {
    this.options = {
      // schedulerLicenseKey : 'GPL-My-Project-Is-Open-Source',
      // selectable: true,
      // defaultView: "dayGridMonth",
      // header: {
      //   left: 'title',
      //   right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      // },
      // footer: {
      //   right: 'today prev,next'
      // },
      // height: 'parent',
      // fixedWeekCount: false,
      // editable: true,
      // contentHeight: this.platform.is('core') ? 500 : 400,
      // plugins: this.calendarPlugins,
      // weekends: true,
      // locale: 'vi',
      // timeZone: 'UTC',
      // eventLimit: true,
      // views: {
      //   timeGrid: {
      //     eventLimit: 4
      //   }
      // },
      // events: [
      //   { title: 'Sự kiện 1', start: '2019-04-01 7:30', end: '2019-04-01 9:30', classNames: ['event-fullcalendar'] },
      //   { title: 'Sự kiện 1', start: '2019-04-01', end: '2019-04-03', classNames: ['event-fullcalendar'] },
      //   { title: 'Sự kiện 1', start: '2019-04-01', end: '2019-04-03', classNames: ['event-fullcalendar'] },
      //   { title: 'Sự kiện 1', start: '2019-04-01', end: '2019-04-03', classNames: ['event-fullcalendar'] },
      //   { title: 'Sự kiện 3', date: '2019-04-01', classNames: ['event-fullcalendar'] },
      //   { title: 'Sự kiện 2', date: '2019-04-02', classNames: ['event-fullcalendar'] }
      // ]


      defaultView: 'resourceTimelineDay',
      locale: 'vi',
      isRTL: false,
      header: {
        left: 'today prev,next',
        center: 'title',
        right: 'resourceTimelineDay,resourceTimelineWeek'
      },
      contentHeight: this.platform.is('core') ? 550 : 400,
      schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
      plugins: this.calendarPlugins,
      resources: [
        {
          id: 'A',
          title: 'Resource A'
        },
        {
          id: 'B',
          title: 'Resource B'
        },
        {
          id: 'C',
          title: 'Resource C'
        }
      ],
      events: [
        {
          id: '1',
          resourceId: 'A',
          title: 'Meeting',
          start: '2019-04-08 7:30',
          end: '2019-04-08 9:30'
        }
      ]
    }
  }
}
