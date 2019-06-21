import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Slides } from 'ionic-angular';
import { KEY, VARIABLE } from '../../common/const';

import { CalendarComponent } from 'ng-fullcalendar';
import { OptionsInput } from '@fullcalendar/core';
import { UserProvider } from '../../providers/user/user';
import { Utils } from '../../common/utils';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import resourceTimeline from '@fullcalendar/resource-timeline';
import timeGridPlugin from '@fullcalendar/timegrid';
import { user } from '../../common/entity';

@IonicPage()
@Component({
  selector: 'page-user-info',
  templateUrl: 'user-info.html',
})
export class UserInfoPage {

  public userAccount: user = new user();
  public events: Array<any> = [];
  public month: number;
  public year: number;

  public tab = '0';

  options: OptionsInput;
  @ViewChild('slider') slider: Slides;
  @ViewChild('slider1') slider1: Slides;
  @ViewChild('fullcalendar') fullcalendar: CalendarComponent;
  calendarPlugins = [interactionPlugin, resourceTimeline, dayGridPlugin, timeGridPlugin, listPlugin]; // important!

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public util: Utils,
    public userProvider: UserProvider,
    public platform: Platform
  ) {
    if (this.navParams.data.user) {
      this.userAccount = this.navParams.data.user;
      this.init();
    }
  }

  init() {
    this.month = new Date().getMonth() + 1;
    this.year = new Date().getFullYear();

    this.userAccount.employee['birthdayDisplay'] = this.util.convertDate(this.userAccount.employee.birthday);
    this.userAccount.employee['dateJoinDisplay'] = this.util.convertDate(this.userAccount.employee.dateJoin);
    this.userAccount.employee['genderName'] = VARIABLE.GENDER_EMPLOYEE[this.userAccount.employee.gender].name;
    this.userAccount['createdAtDisplay'] = this.util.convertDate(this.userAccount.createdAt);

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
    }
  }

  ngAfterViewInit() {
    if (this.slider)
      this.slider.autoHeight = true;
    if (this.slider1)
      this.slider1.autoHeight = true;
  }


  scrollToView(idx: number) {
    this.slider.slideTo(idx);
  }

  slideChange() {
    this.tab = this.slider1.realIndex.toString();
  }

  selectedTab(index) {
    this.slider1.slideTo(index);
  }

  ionViewDidLoad() {
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
}
