import { Events, IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { employee, schedule } from '../../common/entity';

import { Component } from '@angular/core';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { EmployeesProvider } from '../../providers/employees/employees';
import { Utils } from '../../common/utils';
import { VARIABLE } from '../../common/const';

@IonicPage()
@Component({
  selector: 'page-schedule-input',
  templateUrl: 'schedule-input.html',
})
export class ScheduleInputPage {

  public credentialsForm: FormGroup;
  public submitAttempt: boolean = false;
  public updateMode: boolean = false;

  public schedule = new schedule();
  public peopleForSchedule: Array<employee> = [];
  public dateInput:any = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public deployData: DeployDataProvider,
    public employeeProvider: EmployeesProvider,
    public events: Events,
    public util: Utils
  ) {
    if (this.navParams.data.schedule) {
      this.schedule = this.navParams.data.schedule;
      this.schedule['employeeId'] = this.schedule.employee.id;
    }
    if(this.navParams.data.dateInput){
      this.dateInput = this.navParams.data.dateInput;
    }

    this.peopleForSchedule = this.employeeProvider.employees;

    this.credentialsForm = this.formBuilder.group({
      id: this.schedule.id,
      name: [this.schedule.name, Validators.compose([Validators.required, Validators.maxLength(1000)])],
      date: [this.schedule.date, Validators.compose([Validators.required])],
      employeeId: [this.schedule.employee.id, Validators.compose([Validators.required])],
      status: this.schedule.status
    });

    if(this.dateInput){
      this.credentialsForm.controls.date.setValue(this.dateInput);
    }

    if (this.navParams.data.updateMode) {
      this.updateMode = true;
      this.schedule = this.navParams.data.sperm;
      this.schedule.date = this.schedule.date ? new Date(this.schedule.date).toISOString() : '';
      Object.keys(this.credentialsForm.value).forEach((attr) => {
        this.credentialsForm.controls[attr].setValue(this.schedule[attr]);
      })
    }
  }

  onSubmit() {
    this.submitAttempt = true;
    if (this.credentialsForm.valid) {
      Object.keys(this.credentialsForm.value).forEach((attr) => {
        this.schedule[attr] = this.credentialsForm.value[attr];
      });
      if(this.credentialsForm.value.employeeId){
        this.schedule.employee = this.deployData.get_employee_by_id(this.credentialsForm.value.employeeId);
        this.schedule.status = VARIABLE.SCHEDULE_STATUS.ASSIGNED.name;
      }else{
        this.schedule.employee = null;
        this.schedule.status = VARIABLE.SCHEDULE_STATUS.NOT_ASSIGNED.name;
      }

      if (!this.updateMode) {
        this.navParams.get('callback')(this.schedule);
      }
      else {
        this.navParams.get('callback')(this.schedule);
      }
    }
  }
}