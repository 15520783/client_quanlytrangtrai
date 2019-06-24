import { AlertController, IonicPage, ModalController, NavController, NavParams, Platform, Slides } from 'ionic-angular';
import { CONFIG, KEY, MESSAGE, VARIABLE } from '../../common/const';
import { Component, ViewChild } from '@angular/core';
import { employee, schedule, user } from '../../common/entity';

import { ActivitiesProvider } from '../../providers/activities/activities';
import { CalendarComponent } from 'ng-fullcalendar';
import { EmployeeInputPage } from '../employee-input/employee-input';
import { EmployeesProvider } from '../../providers/employees/employees';
import { OptionsInput } from '@fullcalendar/core';
import { SchelduleDetailComponent } from '../../components/scheldule-detail/scheldule-detail';
import { UserProvider } from '../../providers/user/user';
import { Utils } from '../../common/utils';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import resourceTimeline from '@fullcalendar/resource-timeline';
import timeGridPlugin from '@fullcalendar/timegrid';

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
    public platform: Platform,
    public activitiesProvider: ActivitiesProvider,
    public modalCtrl: ModalController,
    public employeeProvider:EmployeesProvider,
    public alertCtrl:AlertController
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

  public schedules: Array<schedule> = [];


  ionViewDidLoad() {
    this.util.openBackDrop();
    this.userProvider.getSchedule()
      .then((schedules: Array<schedule>) => {
        this.util.closeBackDrop();
        if (schedules && schedules.length) {
          this.userProvider.schedules = schedules.filter((schedule: schedule) => {
            return schedule.status == VARIABLE.SCHEDULE_STATUS.ASSIGNED.name ? true : false;
          })

          this.schedules = schedules;

          this.initSchedule();
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
      })
      .catch(err => {
        this.util.closeBackDrop();
        this.util.showToast(MESSAGE[CONFIG.LANGUAGE_DEFAULT].ERROR_OCCUR)
        console.log(err);
      })
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
    })
  }

  GetFormattedDate(value) {
    let date = new Date(value);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
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
          })
          .catch((err) => {
            return err;
          })
      }
    }

    let modal = this.modalCtrl.create(SchelduleDetailComponent, {
      schedule: model.event.extendedProps.schedule,
      callbackUpdate: callbackUpdate,
      personalMode: true
    });

    modal.present();
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

  edit() {
    let callback = (employee:employee) =>{
      if(employee){
        console.log(employee);
        this.employeeProvider.updateEmployee(employee)
        .then((updated_employee:employee)=>{
          if(updated_employee){
            this.util.setKey(KEY.EMPLOYEE_USER,updated_employee);
            this.userAccount.employee = updated_employee;
            this.init();
          }
          this.navCtrl.pop();
        })
        .catch((err)=>{
          console.log(err);
          return err;
        })
      }
    }

    this.navCtrl.push(EmployeeInputPage, { employee: this.userAccount.employee, personalMode: true ,title:'Cập nhật thông tin',callback:callback});
  }

  changePassword() {
    let alert = this.alertCtrl.create({
      title: 'Đổi mật khẩu',
      message: '',
      inputs: [
        {
          name: 'password',
          placeholder: 'Nhập mật khẩu mới',
          type: 'password'
        },
        {
          name: 'repeatPassword',
          placeholder: 'Nhập lại mật khẩu',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Xác nhận',
          handler: data => {
            if (!data.password || !data.repeatPassword) {
              this.util.showToast('Mật khẩu không thể để trống');
            } else {
              if (data.password.length > 1000 || data.repeatPassword.length > 1000) {
                this.util.showToast('Mật khẩu không thể vượt quá 1000 ký tự');
              } else {
                if (data.password == data.repeatPassword) {
                  this.userAccount.password = data.password;
                  this.userProvider.updatePassword(this.userAccount)
                    .then((updated_user: user) => {
                    })
                    .catch((err) => {
                      console.log(err);
                    })
                }
                else {
                  this.util.showToast('Mật khẩu xác nhận không khớp.');
                }
              }
            }
          }
        },
        {
          text: 'Hủy',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        }
      ]
    })
    alert.present();
  }
}
