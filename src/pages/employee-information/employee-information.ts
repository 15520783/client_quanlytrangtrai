import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Platform } from 'ionic-angular';
import { employee } from '../../common/entity';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

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
    public platform: Platform
  ) {
    this.employee = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmployeeInformationPage');
  }

  ngAfterViewInit() {
    if (this.slider)
      this.slider.autoHeight = true;
    console.log('ngAfterViewInit FarmInfomationPage');
  }

  calendarPlugins = [dayGridPlugin, timeGridPlugin, listPlugin]; // important!
  calendarOptions: any;

  handleEventClick(arg) { // handler method
    console.log(arg.event.title);
    console.log(arg.event.start);
    console.log(arg.event.end);
  }

}
