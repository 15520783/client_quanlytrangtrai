import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ViewController, Slides } from 'ionic-angular';
import { invoicesPig, invoicePigDetail, pig } from '../../common/entity';
import { InvoicesProvider } from '../../providers/invoices/invoices';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { Utils } from '../../common/utils';
import { PigsProvider } from '../../providers/pigs/pigs';
import { VARIABLE } from '../../common/const';
import { InternalPigInvoiceRole } from '../../role-input/internalPigInvoice';
import { InvoiceInputUtilComponent } from '../../components/invoice-input-util/invoice-input-util';
import { ImportInternalPigInvoiceInputPage } from '../import-internal-pig-invoice-input/import-internal-pig-invoice-input';

@IonicPage()
@Component({
  selector: 'page-internal-pig-invoice-detail',
  templateUrl: 'internal-pig-invoice-detail.html',
})
export class InternalPigInvoiceDetailPage {
  @ViewChild('slider') slider: Slides;

  public tab = "0";

  public invoice: invoicesPig;
  public details: Array<invoicePigDetail> = [];
  public pigs: any;
  public house: any;
  public gentials: any;
  public foots: any;
  public healStatus: any;
  public gender: any;
  public breeds;

  canCheckComplete: boolean = false;
  canEditInvoice: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public invoiceProvider: InvoicesProvider,
    public deployData: DeployDataProvider,
    public util: Utils,
    public events: Events,
    public pigProvider: PigsProvider,
    public viewCtrl: ViewController
  ) {
    if (this.navParams.data.invoice) {
      this.invoice = this.navParams.data.invoice;
      // this.invoice.importDate = this.util.convertDate(this.invoice.importDate);
      // this.invoice.updatedAt = this.util.convertDate(this.invoice.updatedAt);
      this.invoice['destination'] = this.deployData.get_farm_by_id(this.invoice.destinationId);
      this.invoice['source'] = this.deployData.get_farm_by_id(this.invoice.sourceId);
    }
    this.pigs = this.deployData.get_object_list_key_of_pig();
    this.house = this.deployData.get_object_list_key_of_house();
    this.gentials = this.deployData.get_object_list_key_of_gential();
    this.healStatus = this.deployData.get_object_list_key_of_healthStatus();
    this.foots = this.deployData.get_object_list_key_of_foot();
    this.breeds = this.deployData.get_object_list_key_of_breeds();
    this.gender = VARIABLE.GENDER;

    if (this.invoice.status == VARIABLE.INVOICE_STATUS.PROCCESSING) {
      this.canCheckComplete = true;
      this.canEditInvoice = true;
    }
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

  ionViewDidLoad() {
    this.util.openBackDrop();
    this.invoiceProvider.getPigInvoiceDetail(this.navParams.data.invoice.id)
      .then((details: any) => {
        if (details.length) {
          this.details = details;
        }
        this.util.closeBackDrop();
      })
      .catch((err: Error) => {
        console.log(err);
        this.util.closeBackDrop().then(() => {
          this.util.showToast('Dữ liệu chưa được tải về. Vui lòng kiểm tra kết nối');
        })
      })
  }

  removeInvoice() {
    this.invoiceProvider.removePigInvoice(this.invoice)
      .then((isOK) => {
        if (isOK) {
          this.viewCtrl.dismiss().then(() => {
            this.events.publish('removeInvoiceEvent', this.invoice);
          });
        }
      })
      .catch((err: Error) => { })
  }

  /**
   * Chỉnh sửa chứng từ
   */
  editInvoice() {
    let callback = data => {
      if (data.invoice) {
        this.invoiceProvider.updatePigInvoice(data.invoice)
          .then((updatedInvoice: invoicesPig) => {
            if (updatedInvoice) {
              updatedInvoice['destination'] = this.deployData.get_farm_by_id(this.invoice.destinationId);
              updatedInvoice['source'] = this.deployData.get_farm_by_id(this.invoice.sourceId);
              this.invoice = updatedInvoice;
              this.navParams.get('callback')(this.invoice);
            }
            this.navCtrl.pop();
          })
          .catch((err: Error) => { return err; })
      }
    }
    this.navCtrl.push(ImportInternalPigInvoiceInputPage,
      {
        editMode: true,
        invoice: this.invoice,
        callback: callback
      }
    )
  }

  /**
   * Xác nhận chứng từ đã hoàn tất
   */
  completeInvoice() {
    let invoice: invoicesPig = this.util.deepClone(this.invoice);
    invoice.status = VARIABLE.INVOICE_STATUS.COMPLETE;
    this.invoiceProvider.updatePigInvoice(invoice)
      .then((updatedInvoice: invoicesPig) => {
        if (updatedInvoice) {
          this.invoice.status = updatedInvoice.status;
          this.canCheckComplete = false;
          this.canEditInvoice = false;
          this.navParams.get('callback')(this.invoice);
        }
      })
      .catch((err: Error) => { })
  }
}
