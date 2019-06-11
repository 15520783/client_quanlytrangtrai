import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Events, ModalController } from 'ionic-angular';
import { diseases, employee, group, medicineWarehouse, medicines, pig, sperms } from '../../common/entity';

import { DiseaseListPage } from '../../pages/disease-list/disease-list';
import { EmployeeListComponent } from '../employee-list/employee-list';
import { EmployeesProvider } from '../../providers/employees/employees';
import { KEY } from '../../common/const';
import { MedicineListPage } from '../../pages/medicine-list/medicine-list';
import { MedicineWarehouseListPage } from '../../pages/medicine-warehouse-list/medicine-warehouse-list';
import { PigGroupListComponent } from '../pig-group-list/pig-group-list';
import { PigListComponent } from '../pig-list/pig-list';
import { PigsProvider } from '../../providers/pigs/pigs';
import { SpermListPage } from '../../pages/sperm-list/sperm-list';
import { Utils } from '../../common/utils';

@Component({
  selector: 'input-select-target',
  templateUrl: 'input-select-target.html',
})
export class InputSelectTargetComponent {
  @ViewChild('input') input: any;

  @Input() data: Array<pig | employee>;
  @Input() validControl: any;
  @Input() errorMessage_Required: string;
  @Input() errorMessage_Maxlength: string;
  @Input() label: string = 'Nhóm heo';
  @Input() active: boolean = false;
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() targertCmp: 'pigGroup' |
    'employee' |
    'pigs' |
    'sperms' |
    'diseases' |
    'medicineWarehouses' |
    'medicines' = 'pigGroup';
  @Input() farmId: string;
  @Input() sectionId: string;

  public value_visible: any = '';

  public value: any = '';

  @Output() valueChange = new EventEmitter();

  ngAfterContentInit() {
    if (this.validControl && this.validControl.value) {
      switch (this.targertCmp) {
        case "pigs": {
          this.value = this.validControl.value;
          this.value_visible = this.pigProvider.getPigByID(this.validControl.value).pigCode;
          break;
        }

        case "employee": {
          this.value = this.validControl.value;
          this.value_visible = this.employeeProvider.getEmployeeByID(this.validControl.value) ? this.employeeProvider.getEmployeeByID(this.validControl.value).name : '';
          // this.value_visible = this.validControl.value ? this.value.name : '';
          break;
        }

        case "sperms": {
          this.value = this.validControl.value;
          this.value_visible = this.validControl.value ? 'Liều tinh của heo ' + this.value.pig.pigCode : '';
          break;
        }

        case "diseases": {
          this.value = this.validControl.value;
          this.value_visible = this.validControl.value ? this.value.name : '';
          break;
        }

        case "medicines": {
          this.value = this.validControl.value;
          this.value_visible = this.validControl.value ? this.value.name : '';
          break;
        }

        case "medicineWarehouses": {
          this.value = this.validControl.value;
          this.value_visible = (this.validControl.value && this.value.medicine.name) ?
            this.value.medicine.name + ' - Kho: ' + this.value.warehouse.name + ' - Chứng từ: ' + this.value.invoice.invoiceNo : '';
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
    public employeeProvider: EmployeesProvider,
    public event: Events
  ) {

  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    switch (this.targertCmp) {
      case "medicineWarehouses": {

        this.event.subscribe('input-select-target:medicineWarehouses', (event) => {
          console.log('TEST');
          this.value = this.validControl.value;
          this.value_visible = (this.validControl.value && this.value.medicine.name) ?
            this.value.medicine.name + ' - Kho: ' + this.value.warehouse.name + ' - Chứng từ: ' + this.value.invoice.invoiceNo : '';
        })
        break;
      }

      default:
        break;
    }
  }

  presentModal() {
    if (!this.disabled) {
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
                this.value_visible = group.groupCode;
                this.validControl?this.validControl.setErrors(null):null;
              }
            })
            modal.present();
          });
          break;
        case 'employee':
          // this.util.getKey(KEY.EMPLOYEES).then((data) => {
          //   modal = this.modalCtrl.create(
          //     EmployeeListComponent, { groups: data, employees: data, pigs: data, selectMode: true });
          //   modal.onDidDismiss((employee: employee) => {
          //     if (employee) {
          //       this.valueChange.emit(employee);
          //       this.value = employee.id;
          //       this.value_visible = employee.name;
          //       this.validControl.setErrors(null);
          //     }
          //   })
          //   modal.present();
          // });
          if (this.data) {
            modal = this.modalCtrl.create(EmployeeListComponent, { groups: this.data, employees: this.data, pigs: this.data, selectMode: true });
            modal.onDidDismiss((employee: employee) => {
              if (employee) {
                this.valueChange.emit(employee);
                this.value = employee.id;
                this.value_visible = employee.name;
                this.validControl?this.validControl.setErrors(null):null;
              }
            })
            modal.present();
          }
          break;
        case 'pigs':
          if (this.data) {
            modal = this.modalCtrl.create(PigListComponent, { pigs: this.data, selectMode: true });
            modal.onDidDismiss((pig: pig) => {
              if (pig) {
                this.valueChange.emit(pig);
                this.value = pig.id;
                this.value_visible = pig.pigCode;
                this.validControl?this.validControl.setErrors(null):null;
              }
            })
            modal.present();
          } else {
            this.util.getKey(KEY.PIGS).then((data) => {
              modal = this.modalCtrl.create(PigListComponent, { groups: data, employees: data, pigs: data, selectMode: true });
              modal.onDidDismiss((pig: pig) => {
                if (pig) {
                  this.valueChange.emit(pig);
                  this.value = pig.id;
                  this.value_visible = pig.pigCode;
                  this.validControl?this.validControl.setErrors(null):null;
                }
              })
              modal.present();
            });
          }
          break;

        case 'sperms':
          if (this.data) {
            modal = this.modalCtrl.create(SpermListPage, { sperms: this.data, selectMode: true });
            modal.onDidDismiss((sperm: sperms) => {
              if (sperm) {
                this.valueChange.emit(sperm);
                this.value = JSON.parse(JSON.stringify(sperm));
                this.value_visible = 'Liều tinh của heo ' + sperm.pig.pigCode;
                this.validControl?this.validControl.setErrors(null):null;
              }
            })
            modal.present();
          }
          break;

        case 'diseases':
          if (this.data) {
            console.log(this.data);

            modal = this.modalCtrl.create(DiseaseListPage,
              {
                diseases: this.data,
                selectMode: true
              });
            modal.onDidDismiss((disease: diseases) => {
              if (disease) {
                this.valueChange.emit(disease);
                this.value = JSON.parse(JSON.stringify(disease));
                this.value_visible = disease.name;
                this.validControl?this.validControl.setErrors(null):null;
              }
            })
            modal.present();
          }
          break;

        case 'medicines':
          if (this.data) {
            modal = this.modalCtrl.create(MedicineListPage,
              {
                medicines: this.data,
                selectMode: true
              });
            modal.onDidDismiss((medicine: medicines) => {
              if (medicine) {
                this.valueChange.emit(medicine);
                this.value = JSON.parse(JSON.stringify(medicine));
                this.value_visible = medicine.name;
                this.validControl?this.validControl.setErrors(null):null;
              }
            })
            modal.present();
          }
          break;

        case 'medicineWarehouses':
          if (this.data) {
            console.log(this.data);
            modal = this.modalCtrl.create(MedicineWarehouseListPage,
              {
                medicineWarehouses: this.data,
                selectMode: true
              });
            modal.onDidDismiss((medicineWarehouse: medicineWarehouse) => {
              if (medicineWarehouse) {
                this.valueChange.emit(medicineWarehouse);
                this.value = JSON.parse(JSON.stringify(medicineWarehouse));
                this.value_visible = this.value.medicine.name + ' - Kho: ' + medicineWarehouse.warehouse.name + ' - Chứng từ: ' + medicineWarehouse.invoice.invoiceNo;
                this.validControl?this.validControl.setErrors(null):null;
              }
            })
            modal.present();
          }
          break;

        default:
          break;
      }
    }
  }

  scrollTo() {
    this.input.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

}
