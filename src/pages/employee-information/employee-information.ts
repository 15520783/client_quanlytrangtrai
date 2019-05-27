import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Platform, ModalController } from 'ionic-angular';
import { employee } from '../../common/entity';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import listPlugin from '@fullcalendar/list';
import { EmployeeInputPage } from '../employee-input/employee-input';
import { OptionsInput } from '@fullcalendar/core';
import { CalendarComponent } from 'ng-fullcalendar';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import resourceTimeline from '@fullcalendar/resource-timeline';
import interactionPlugin from '@fullcalendar/interaction';
import { SettingsProvider } from '../../providers/settings/settings';
import { Utils } from '../../common/utils';

/**
 * Generated class for the EmployeeInformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-employee-information',
  templateUrl: 'employee-information.html',
})
export class EmployeeInformationPage {
  @ViewChild('slider') slider: Slides;

  public employee: employee;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public modalCtrl: ModalController,
    public settingProvider:SettingsProvider,
    public util:Utils
  ) {
    this.employee = this.navParams.data;
    this.employee['dateJoinDisplay']=this.util.convertDate(this.employee.dateJoin);
    this.employee['dateOffDisplay']=this.util.convertDate(this.employee.dateOff);
    this.employee['birthdayDisplay']=this.util.convertDate(this.employee.birthday);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmployeeInformationPage');
  }

  ngAfterViewInit() {
    if (this.slider)
      this.slider.autoHeight = true;
    console.log('ngAfterViewInit FarmInfomationPage');
  }

  // calendarPlugins = [dayGridPlugin, timeGridPlugin, listPlugin]; // important!
  calendarOptions: any;

  options: OptionsInput;
  @ViewChild('fullcalendar') fullcalendar: CalendarComponent;
  calendarPlugins = [interactionPlugin, resourceTimeline, dayGridPlugin, timeGridPlugin, listPlugin]; // important!

  ngOnInit() {
    this.options = {
      schedulerLicenseKey : 'GPL-My-Project-Is-Open-Source',
      selectable: true,
      defaultView: "dayGridMonth",
      header: {
        left: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      footer: {
        right: 'today prev,next'
      },
      height: 'parent',
      fixedWeekCount: false,
      editable: true,
      contentHeight: this.platform.is('core') ? 400 : 300,
      plugins: this.calendarPlugins,
      weekends: true,
      locale: 'vi',
      timeZone: 'UTC',
      eventLimit: true,
      views: {
        timeGrid: {
          eventLimit: 4
        }
      },
      events: [
        { title: 'Sự kiện 1', start: '2019-04-01 7:30', end: '2019-04-01 9:30', classNames: ['event-fullcalendar'] },
        { title: 'Sự kiện 1', start: '2019-04-01', end: '2019-04-03', classNames: ['event-fullcalendar'] },
        { title: 'Sự kiện 1', start: '2019-04-01', end: '2019-04-03', classNames: ['event-fullcalendar'] },
        { title: 'Sự kiện 1', start: '2019-04-01', end: '2019-04-03', classNames: ['event-fullcalendar'] },
        { title: 'Sự kiện 3', date: '2019-04-01', classNames: ['event-fullcalendar'] },
        { title: 'Sự kiện 2', date: '2019-04-02', classNames: ['event-fullcalendar'] }
      ]
    }
    
  }

  editEmployee(){
    // let modal = this.modalCtrl.create(EmployeeInputPage,{employee:this.employee});
    // return modal.present();
    this.navCtrl.push(EmployeeInputPage,{employee:this.employee});
  }

  handleEventClick(arg) { // handler method
    console.log(arg.event.title);
    console.log(arg.event.start);
    console.log(arg.event.end);
  }
  handleDayClick(event){
    console.log(event);
  }
}
