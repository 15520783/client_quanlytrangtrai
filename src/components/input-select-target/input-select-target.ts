import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { group, employee, pig } from '../../common/entity';
import { Utils } from '../../common/utils';
import { ModalController } from 'ionic-angular';
import { KEY } from '../../common/const';
import { PigGroupListComponent } from '../pig-group-list/pig-group-list';
import { EmployeeListComponent } from '../employee-list/employee-list';
import { PigListComponent } from '../pig-list/pig-list';
import { PigsProvider } from '../../providers/pigs/pigs';
import { EmployeesProvider } from '../../providers/employees/employees';


@Component({
  selector: 'input-select-target',
  templateUrl: 'input-select-target.html',
})
export class InputSelectTargetComponent {
  @ViewChild('input') input: any;

  @Input() validControl: any;
  @Input() errorMessage_Required: string;
  @Input() errorMessage_Maxlength: string;
  @Input() label: string = 'Nhóm heo';
  @Input() active: boolean = false;
  @Input() placeholder: string = '';
  @Input() targertCmp: 'pigGroup' | 'employee' | 'pigs' = 'pigGroup';
  public value_visible: any = '';

  public value: string = '';

  @Output() valueChange = new EventEmitter();

  ngAfterContentInit(){
    if(this.validControl.value){
      switch(this.targertCmp){
        case "pigs":{
          this.value = this.validControl.value;
          this.value_visible = this.pigProvider.getPigByID(this.validControl.value).pig_code;
          break;
        }

        case "employee":{
          this.value = this.validControl.value;
          this.value_visible = this.employeeProvider.getEmployeeByID(this.validControl.value).name;
          break;
        }

        default:
        break;
      }
    }
  }

  constructor(
    public util: Utils,
    public modalCtrl: ModalController,
    public pigProvider: PigsProvider,
    public employeeProvider: EmployeesProvider
  ) {
    console.log('Hello InputSelectPigGroupComponent Component');
  }

  presentModal() {

    let modal;
    switch (this.targertCmp) {
      case 'pigGroup':
        this.util.getKey(KEY.GROUPS).then((data) => {
          modal = this.modalCtrl.create(
            PigGroupListComponent, { groups: data, employees: data, pigs: data, selectMode: true });
          modal.onDidDismiss((group: group) => {
            if (group) {
              this.valueChange.emit(group);
              this.value = group.id;
              this.value_visible = group.group_code;
              this.validControl.setErrors(null);
            }
          })
          modal.present();
        });


        break;
      case 'employee':
        this.util.getKey(KEY.EMPLOYEES).then((data) => {
          modal = this.modalCtrl.create(
            EmployeeListComponent, { groups: data, employees: data, pigs: data, selectMode: true });
          modal.onDidDismiss((employee: employee) => {
            if (employee) {
              this.valueChange.emit(employee);
              this.value = employee.id;
              this.value_visible = employee.name;
              this.validControl.setErrors(null);
            }
          })
          modal.present();
        });


        break;
      case 'pigs':
        this.util.getKey(KEY.PIGS).then((data) => {
          modal = this.modalCtrl.create(
            PigListComponent, { groups: data, employees: data, pigs: data, selectMode: true });
          modal.onDidDismiss((pig: pig) => {
            if (pig) {
              this.valueChange.emit(pig);
              this.value = pig.id;
              this.value_visible = pig.pig_code;
              this.validControl.setErrors(null);
            }
          })
          modal.present();
        });


        break;
      default:
        break;
    }


  }

  scrollTo() {
    this.input.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
