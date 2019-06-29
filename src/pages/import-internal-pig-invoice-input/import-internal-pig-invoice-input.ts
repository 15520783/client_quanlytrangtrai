import { Events, IonicPage, ModalController, NavController, NavParams, Platform, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Component } from '@angular/core';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { UserProvider } from '../../providers/user/user';
import { Utils } from '../../common/utils';
import { VARIABLE } from '../../common/const';
import { invoicesPig } from '../../common/entity';

@IonicPage()
@Component({
  selector: 'page-import-internal-pig-invoice-input',
  templateUrl: 'import-internal-pig-invoice-input.html',
})
export class ImportInternalPigInvoiceInputPage {

  public credentialsForm: FormGroup;
  public submitAttempt: boolean = false;
  public editMode: boolean = false;

  public invoice: invoicesPig = new invoicesPig();
  public sectionId: string = '';
  public houseId: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public modalCtrl: ModalController,
    public platform: Platform,
    public deployData: DeployDataProvider,
    public events: Events,
    public viewCtrl: ViewController,
    public util: Utils,
    public userProvider:UserProvider
  ) {
    if (this.navParams.data.sourceId && this.navParams.data.destinationId) {
      this.invoice.sourceId = this.navParams.data.sourceId;
      this.invoice.destinationId = this.navParams.data.destinationId;
    }
    this.init();

    if (this.navParams.data.vehicleNumber) {
      this.invoice.vehicleNumber = this.navParams.data.vehicleNumber;
    }

    if (this.navParams.data.invoice) {
      this.invoice = this.navParams.data.invoice;
      this.invoice.importDate = new Date(this.invoice.importDate).toISOString();
    }

    this.credentialsForm = this.formBuilder.group({
      id: this.invoice.id,
      invoiceType: VARIABLE.INVOICE_PIG_TYPE.INTERNAL_IMPORT,
      sourceId: [this.invoice.sourceId, Validators.compose([Validators.required])],
      invoiceNo: VARIABLE.GENERNAL_INVOICE_ID.INTERNAL_IMPORT + Date.now(),
      vehicleNumber: this.invoice.vehicleNumber,
      importDate: [this.invoice.importDate, Validators.compose([Validators.required])],
      quantity: this.invoice.quantity,
      destinationId: [this.invoice.destinationId, Validators.compose([Validators.required])],
      sectionId: this.editMode ? null : [this.sectionId, Validators.compose([Validators.required])],
      houseId: this.editMode ? null : [this.houseId, Validators.compose([Validators.required])],
      status: VARIABLE.INVOICE_STATUS.PROCCESSING,
      employee:this.userProvider.user
    });

    if (this.navParams.data.editMode) {
      Object.keys(this.credentialsForm.value).forEach((attr) => {
        this.credentialsForm.controls[attr].setValue(this.invoice[attr]);
        this.credentialsForm.controls[attr].setErrors(null);
      });
      this.editMode = this.navParams.data.editMode;
    }
  }


  onSubmit() {
    this.submitAttempt = true;
    console.log(this.credentialsForm.value);
    if (this.credentialsForm.valid) {
      Object.keys(this.credentialsForm.value).forEach((attr) => {
        this.invoice[attr] = this.credentialsForm.value[attr];
      });
      this.navParams.get('callback')({
        invoice: this.invoice,
        sectionId: this.credentialsForm.value.sectionId,
        houseId: this.credentialsForm.value.houseId
      });
    }
  }

  public farms: Array<{ name: string, value: string }> = [];
  public sections: Array<{ name: string, value: string }> = [];
  public houses: Array<{ name: string, value: string }> = [];

  init() {
    this.farms = this.deployData.get_farm_list_for_select();
    this.deployData.get_sections_of_farm(this.invoice.destinationId).forEach((section) => {
      if (section.typeId == VARIABLE.SECTION_TYPE[1].id)
        this.sections.push({
          name: section.name,
          value: section.id
        })
    });
  }

  farmChange(e) {
    if (e.valueId) {
      this.sections = [];
      this.deployData.get_sections_of_farm(e.valueId).forEach((section) => {
        if (section.typeId == VARIABLE.SECTION_TYPE[1].id)
          this.sections.push({
            name: section.name,
            value: section.id
          })
      });
    }
  }

  sectionChange(e) {
    console.log(e);
    if (e.valueId) {
      this.houses = [];
      this.deployData.get_houses_of_section(e.valueId).forEach((house) => {
        this.houses.push({
          name: house.name,
          value: house.id
        })
      })
    }
  }
}
