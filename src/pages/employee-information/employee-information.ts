import { Component, ViewChild } from '@angular/core';
import { Content, IonicPage, ModalController, NavController, NavParams, Platform, Slides } from 'ionic-angular';
import { employee, schedule, user } from '../../common/entity';

import { ActivitiesProvider } from '../../providers/activities/activities';
import { CalendarComponent } from 'ng-fullcalendar';
import { EmployeeInputPage } from '../employee-input/employee-input';
import { EmployeesProvider } from '../../providers/employees/employees';
import { OptionsInput } from '@fullcalendar/core';
import { SchelduleDetailComponent } from '../../components/scheldule-detail/scheldule-detail';
import { SettingsProvider } from '../../providers/settings/settings';
import { UserAccountListPage } from '../user-account-list/user-account-list';
import { UserProvider } from '../../providers/user/user';
import { Utils } from '../../common/utils';
import { VARIABLE } from '../../common/const';
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
  @ViewChild('content') content: Content;

  public employee: employee;
  public users: Array<user> = [];

  public tab = "0";

  public schedules: Array<schedule> = [];
  public events: Array<any> = [];
  public month: number;
  public year: number;

  calendarOptions: any;

  options: OptionsInput;
  @ViewChild('fullcalendar') fullcalendar: CalendarComponent;
  calendarPlugins = [interactionPlugin, resourceTimeline, dayGridPlugin, timeGridPlugin, listPlugin]; // important!

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public modalCtrl: ModalController,
    public settingProvider: SettingsProvider,
    public employeeProvider: EmployeesProvider,
    public activitiesProvider: ActivitiesProvider,
    public util: Utils,
    public userProvider: UserProvider
  ) {
    this.month = new Date().getMonth() + 1;
    this.year = new Date().getFullYear();

    this.employee = this.navParams.data.employee;
    this.employee['dateJoinDisplay'] = this.util.convertDate(this.employee.dateJoin);
    this.employee['dateOffDisplay'] = this.util.convertDate(this.employee.dateOff);
    this.employee['birthdayDisplay'] = this.util.convertDate(this.employee.birthday);
    this.employee['genderName'] = VARIABLE.GENDER_EMPLOYEE[this.employee.gender].name;
  }

  ionViewDidLoad() {
    /**
     * Lấy danh sách user
     */
    if (this.userProvider.rolePermission.ROLE_xem_lich_bieu_nhan_vien != null) {
      this.util.openBackDrop();
      this.employeeProvider.getScheduleOfEmployee(this.employee.id)
        .then((schedules: Array<schedule>) => {
          if (schedules) {
            this.schedules = schedules;
            this.initSchedule();
          }
          if (this.userProvider.rolePermission.ROLE_xem_danh_sach_tai_khoan_nhan_vien != null) {
            return this.employeeProvider.getUserAccountsOfEmployee(this.employee.id)
              .then((users: Array<user>) => {
                if (users) {
                  this.users = users;
                }
                this.util.closeBackDrop();
              })
          }
        })
        .catch((err) => {
          this.util.closeBackDrop();
          return err;
        })
    } else {
      if (this.userProvider.rolePermission.ROLE_xem_danh_sach_tai_khoan_nhan_vien != null) {
        this.util.openBackDrop();
        return this.employeeProvider.getUserAccountsOfEmployee(this.employee.id)
          .then((users: Array<user>) => {
            if (users) {
              this.users = users;
            }
            this.util.closeBackDrop();
          })
          .catch((err) => {
            this.util.closeBackDrop();
            return err;
          })
      }
    }
  }

  initSchedule() {
    this.schedules.forEach((schedule) => {
      let today = new Date(new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate());
      if (schedule) {
        this.events.push({
          id: schedule.id,
          title: schedule.name,
          status: schedule.status,
          date: this.GetFormattedDate(schedule.date) + " 07:00",
          employee: schedule.employee,
          schedule: schedule,
          backgroundColor: (new Date(schedule.date) >= today) ?
            (schedule.employee ?
              (schedule.status == VARIABLE.SCHEDULE_STATUS.COMPLETE.name ? VARIABLE.SCHEDULE_STATUS.COMPLETE.color : VARIABLE.SCHEDULE_STATUS.ASSIGNED.color) : VARIABLE.SCHEDULE_STATUS.NOT_ASSIGNED.color) : VARIABLE.SCHEDULE_STATUS.OVERDUE.color,
          borderColor: (new Date(schedule.date) >= today) ?
            (schedule.employee ?
              (schedule.status == VARIABLE.SCHEDULE_STATUS.COMPLETE.name ? VARIABLE.SCHEDULE_STATUS.COMPLETE.color : VARIABLE.SCHEDULE_STATUS.ASSIGNED.color) : VARIABLE.SCHEDULE_STATUS.NOT_ASSIGNED.color) : VARIABLE.SCHEDULE_STATUS.OVERDUE.color
        })
      }

      this.options = {
        schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
        selectable: true,
        defaultView: this.platform.is('core') ? "dayGridMonth" : "listWeek",
        header: {
          left: 'today prev,next',
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
    })
  }

  GetFormattedDate(value) {
    let date = new Date(value);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }


  ngAfterViewInit() {
    if (this.slider)
      this.slider.autoHeight = true;
  }

  ngOnInit() {

  }

  handleEventClick(model) { // handler method
    let callbackUpdate = (schedule: schedule) => {
      if (schedule) {
        this.activitiesProvider.updateSchedule(schedule)
          .then((updated_schedule: schedule) => {
            modal.dismiss();
            let active_idx = this.navCtrl.getActive().index;
            this.navCtrl.push(this.navCtrl.getActive().component, this.navParams.data);
            this.navCtrl.remove(active_idx);
            // this.navCtrl.setPages(this.navCtrl.getActive().component,this.navParams.data);
          })
          .catch((err) => {
            return err;
          })
      }
    }


    let modal = this.modalCtrl.create(SchelduleDetailComponent, {
      schedule: model.event.extendedProps.schedule,
      // callbackRemove: callbackRemove,
      callbackUpdate: callbackUpdate
    });

    modal.present();
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
            this.employeeProvider.updatedEmployee(updated_employee);
            this.employee = updated_employee;
            this.employee['dateJoinDisplay'] = this.util.convertDate(this.employee.dateJoin);
            this.employee['dateOffDisplay'] = this.util.convertDate(this.employee.dateOff);
            this.employee['birthdayDisplay'] = this.util.convertDate(this.employee.birthday);
            this.employee['genderName'] = VARIABLE.GENDER_EMPLOYEE[this.employee.gender].name;
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
            this.employeeProvider.removedEmployee(this.employee);
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
