import { Component, ViewChild } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, Platform, Slides } from 'ionic-angular';
import { employee, user } from '../../common/entity';

import { CalendarComponent } from 'ng-fullcalendar';
import { EmployeeInputPage } from '../employee-input/employee-input';
import { EmployeesProvider } from '../../providers/employees/employees';
import { OptionsInput } from '@fullcalendar/core';
import { SettingsProvider } from '../../providers/settings/settings';
import { UserAccountListPage } from '../user-account-list/user-account-list';
import { Utils } from '../../common/utils';
import dayGridPlugin from '@fullcalendar/daygrid';
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
  public users: Array<user> = [];

  public tab = "0";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public modalCtrl: ModalController,
    public settingProvider: SettingsProvider,
    public employeeProvider: EmployeesProvider,
    public util: Utils
  ) {
    this.employee = this.navParams.data.employee;
    this.employee['dateJoinDisplay'] = this.util.convertDate(this.employee.dateJoin);
    this.employee['dateOffDisplay'] = this.util.convertDate(this.employee.dateOff);
    this.employee['birthdayDisplay'] = this.util.convertDate(this.employee.birthday);

    this.util.openBackDrop();

    /**
     * Lấy danh sách user
     */
    this.employeeProvider.getUserAccountsOfEmployee(this.employee.id)
      .then((users: Array<user>) => {
        if (users) {
          this.users = users;
        }
        this.util.closeBackDrop();
      })
      .catch((err) => {
        this.util.closeBackDrop();
      })
  }

  ionViewDidLoad() {
  }

  ngAfterViewInit() {
    if (this.slider)
      this.slider.autoHeight = true;
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

  slideChange() {
    this.tab = this.slider.realIndex.toString();
  }

  selectedTab(index) {
    this.slider.slideTo(index);
  }

  /**
   * Chỉnh sửa nhân viên
   */
  editEmployee() {
    let callback = (employee: employee) => {
      if (employee) {
        this.employeeProvider.updateEmployee(employee)
          .then((updated_employee: any) => {
            this.employee = updated_employee;
            this.employee['dateJoinDisplay'] = this.util.convertDate(this.employee.dateJoin);
            this.employee['dateOffDisplay'] = this.util.convertDate(this.employee.dateOff);
            this.employee['birthdayDisplay'] = this.util.convertDate(this.employee.birthday);
            this.navParams.get('callbacklUpdate')(updated_employee);
            this.navCtrl.pop();
          })
          .catch((err) => {
            console.log(err);
          })
      }
    }

    this.navCtrl.push(EmployeeInputPage, { employee: this.employee, callback: callback });
  }

  /**
   * Xóa nhân viên
   */
  removeEmployee() {
    let handler = () => {
      this.employeeProvider.deleteEmployees(this.employee)
        .then((isOK) => {
          if (isOK) {
            this.navParams.get('callbackRemove')(this.employee);
            this.navCtrl.pop();
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }
    return this.util.presentComfirm('Xác nhận xóa nhân viên', handler);
  }

  openUserList() {
    this.navCtrl.push(UserAccountListPage, { users: this.users, employeeId: this.employee.id });
  }
}
