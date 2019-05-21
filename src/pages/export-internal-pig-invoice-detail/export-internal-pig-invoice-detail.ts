import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ViewController, Slides } from 'ionic-angular';
import { InvoicesProvider } from '../../providers/invoices/invoices';
import { Utils } from '../../common/utils';
import { PigsProvider } from '../../providers/pigs/pigs';
import { SettingsProvider } from '../../providers/settings/settings';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { invoicePigDetail, invoicesPig } from '../../common/entity';
import { VARIABLE, MESSAGE } from '../../common/const';
import { ExportInternalPigInvoiceRole } from '../../role-input/export-InternalPigInvoice';
import { InvoiceInputUtilComponent } from '../../components/invoice-input-util/invoice-input-util';

@IonicPage()
@Component({
  selector: 'page-export-internal-pig-invoice-detail',
  templateUrl: 'export-internal-pig-invoice-detail.html',
})
export class ExportInternalPigInvoiceDetailPage {

  @ViewChild('slider') slider: Slides;

  public tab = "0";

  public invoice: invoicesPig;
  public details: Array<invoicePigDetail> = [];
  public pigs: any;
  public house: any;
  public gentials: any;
  public foots: any;
  public healStatus: any;

  canCheckComplete: boolean = false;
  canEditInvoice: boolean = false;
  canDelete: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public invoiceProvider: InvoicesProvider,
    public deployData: DeployDataProvider,
    public util: Utils,
    public events: Events,
    public pigProvider: PigsProvider,
    public viewCtrl: ViewController,
    public settingProvider: SettingsProvider
  ) {
    if (this.navParams.data.invoice) {
      this.invoice = this.navParams.data.invoice;
      this.invoice['destination'] = this.deployData.get_farm_by_id(this.invoice.destinationId);
      this.invoice['source'] = this.deployData.get_farm_by_id(this.invoice.sourceId);
      this.invoice.sourceManagerName = this.deployData.get_employee_by_id(this.invoice.sourceManager).name;
    }
    this.pigs = this.deployData.get_object_list_key_of_pig();
    this.house = this.deployData.get_object_list_key_of_house();
    this.gentials = this.deployData.get_object_list_key_of_gential();
    this.healStatus = this.deployData.get_object_list_key_of_healthStatus();
    this.foots = this.deployData.get_object_list_key_of_foot();

    if (this.invoice.status == VARIABLE.INVOICE_STATUS.PROCCESSING) {
      this.canCheckComplete = true;
      this.canEditInvoice = true;
    }
  }

  ionViewDidLoad() {
    this.util.openBackDrop();
    this.invoiceProvider.getPigInvoiceDetail(this.navParams.data.invoice.id)
      .then((details: any) => {
        if (details.length) {
          this.details = details;
        }
        this.util.closeBackDrop()
      })
      .catch((err: Error) => {
        this.util.closeBackDrop().then(() => {
          this.util.showToast(MESSAGE.vi.ERROR_OCCUR);
        })
      })
  }

  ngAfterViewInit() {
    if (this.slider) {
      this.slider.autoHeight = true;
    }
  }

  slideChange() {
    this.tab = this.slider.realIndex.toString();
  }

  selectedTab(index) {
    this.slider.slideTo(index);
  }


  /**
   * Chỉnh sửa chứng từ
   */
  editInvoice() {

    let callback = data =>{
      if (data) {
        this.invoice = data;
        this.invoice['destination'] = this.deployData.get_farm_by_id(this.invoice.destinationId);
        this.invoice['source'] = this.deployData.get_farm_by_id(this.invoice.sourceId);
        this.invoice.sourceManagerName = this.deployData.get_employee_by_id(this.invoice.sourceManager).name;
        this.navParams.get('callback')(this.invoice);
        this.navCtrl.pop();
      }
    }

    let roleInput = new ExportInternalPigInvoiceRole(this.deployData, this.invoiceProvider);
    roleInput.object = this.util.deepClone(this.invoice);
    roleInput.object.importDate = new Date(roleInput.object.importDate).toISOString();
    this.navCtrl.push(InvoiceInputUtilComponent,
      {
        editMode: true,
        roleInput: roleInput,
        callback:callback
      }
    )
  }


  /**
   * Xóa chứng từ
  */
  removeInvoice() {
    this.invoiceProvider.removePigInvoice(this.invoice)
      .then((isOK) => {
        if (isOK) {
          this.viewCtrl.dismiss().then(() => {
            this.navParams.get('callbackRemove')(this.invoice);
          });
        }
      })
      .catch((err: Error) => { })
  }
}
