import { Component, ViewChild } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, Platform, Slides } from 'ionic-angular';

import { CalendarComponent } from 'ng-fullcalendar';
import { EmployeeInputPage } from '../employee-input/employee-input';
import { EmployeesProvider } from '../../providers/employees/employees';
import { OptionsInput } from '@fullcalendar/core';
import { SettingsProvider } from '../../providers/settings/settings';
import { Utils } from '../../common/utils';
import dayGridPlugin from '@fullcalendar/daygrid';
import { employee } from '../../common/entity';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import resourceTimeline from '@fullcalendar/resource-timeline';
import timeGridPlugin from '@fullcalendar/timegrid';

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
    public settingProvider: SettingsProvider,
    public employeeProvider: EmployeesProvider,
    public util: Utils
  ) {
    this.employee = this.navParams.data;
    this.employee['dateJoinDisplay'] = this.util.convertDate(this.employee.dateJoin);
    this.employee['dateOffDisplay'] = this.util.convertDate(this.employee.dateOff);
    this.employee['birthdayDisplay'] = this.util.convertDate(this.employee.birthday);
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
      schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
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



  handleEventClick(arg) { // handler method
    console.log(arg.event.title);
    console.log(arg.event.start);
    console.log(arg.event.end);
  }

  handleDayClick(event) {
    console.log(event);
  }

  scrollToView(idx: number) {
    this.slider.slideTo(idx);
  }


  editEmployee() {
    let callback = (employee: employee) => {
      if (employee) {
        this.employeeProvider.createNewEmployee(employee)
          .then((updated_employee: any) => {
            this.employee = updated_employee;
            this.employee['dateJoinDisplay'] = this.util.convertDate(this.employee.dateJoin);
            this.employee['dateOffDisplay'] = this.util.convertDate(this.employee.dateOff);
            this.employee['birthdayDisplay'] = this.util.convertDate(this.employee.birthday);
            this.navCtrl.pop();
          })
          .catch((err) => {
            console.log(err);
          })
      }
    }

    this.navCtrl.push(EmployeeInputPage, { callback: callback });
  }
}
