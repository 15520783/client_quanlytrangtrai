import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import resourceTimeline from '@fullcalendar/resource-timeline';
import interactionPlugin from '@fullcalendar/interaction';

@IonicPage()
@Component({
  selector: 'page-date-plan',
  templateUrl: 'date-plan.html',
})
export class DatePlanPage {
  @ViewChild('calendar') calendar: any;

  calendarPlugins = [interactionPlugin, resourceTimeline, dayGridPlugin, timeGridPlugin, listPlugin]; // important!
  calendarOptions: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform
  ) {
    this.calendarOptions = {
      dayClick: (date, jsEvent, view, resourceObj) => {
        console.log('Date: ' + date.format());
      }
    };
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
}
