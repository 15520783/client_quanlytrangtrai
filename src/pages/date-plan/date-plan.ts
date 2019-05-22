import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController, PopoverController } from 'ionic-angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import resourceTimeline from '@fullcalendar/resource-timeline';
import interactionPlugin from '@fullcalendar/interaction';
import { OptionsInput } from '@fullcalendar/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { breedings, mating } from '../../common/entity';
import { ActivitiesProvider } from '../../providers/activities/activities';
import { Utils } from '../../common/utils';
import { UserProvider } from '../../providers/user/user';
import { MESSAGE, CONFIG } from '../../common/const';
import { SchelduleDetailComponent } from '../../components/scheldule-detail/scheldule-detail';

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

  public schedule: Schedule = {
    breedings: [],
    matings: []
  };
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
        eventLimit: true,
        displayEventTime: false,
        views: {
          timeGrid: {
            eventLimit: this.platform.is('core') ? 4 : 0,
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
      .then((data: Schedule) => {
        if (breedings) {
          this.schedule.breedings = data.breedings;
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
    this.schedule.breedings.forEach((breeding) => {
      if (breeding.breedingNext) {
        this.events.push({
          id: breeding.id,
          title: 'Thực hiện lên giống cho heo có mã '.concat(breeding.pig.pigCode).concat(' theo dự kiến.'),
          type: 'breeding',
          object: breeding,
          start: this.GetFormattedDate(breeding.breedingNext),
          end: this.GetFormattedDate(breeding.breedingNext),
          backgroundColor: (new Date(breeding.breedingNext) > new Date()) ? '#01c2fa' : '#f53d3d',
          borderColor: (new Date(breeding.breedingNext) > new Date()) ? '#01c2fa' : '#f53d3d'
        })
      }
      if (breeding.matingEstimate) {
        this.events.push({
          id: breeding.id,
          title: 'Thực hiện phối giống cho heo có mã '.concat(breeding.pig.pigCode).concat(' theo dự kiến.'),
          type: 'mating',
          object: breeding,
          start: this.GetFormattedDate(breeding.matingEstimate),
          end: this.GetFormattedDate(breeding.matingEstimate),
          backgroundColor: (new Date(breeding.matingEstimate) > new Date()) ? '#32db64' : '#f53d3d',
          borderColor: (new Date(breeding.matingEstimate) > new Date()) ? '#32db64' : '#f53d3d'
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
        employee: '',
        status: 'Chưa phân công',
        object: model.event.extendedProps.object,
        type: model.event.extendedProps.type
      }
    });

    modal.present();
  }

  handleDayClick(event) {
    console.log(event);
  }





}
