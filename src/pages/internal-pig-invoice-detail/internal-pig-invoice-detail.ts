import { Component, ViewChild } from '@angular/core';
import { Events, IonicPage, NavController, NavParams, Platform, Slides, ViewController } from 'ionic-angular';
import { invoicePigDetail, invoicesPig, pig, } from '../../common/entity';

import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { ImportInternalPigInvoiceInputPage } from '../import-internal-pig-invoice-input/import-internal-pig-invoice-input';
import { InputPigToInternalInvoicePage } from '../input-pig-to-internal-invoice/input-pig-to-internal-invoice';
import { InvoicesProvider } from '../../providers/invoices/invoices';
import { PigsProvider } from '../../providers/pigs/pigs';
import { UserProvider } from '../../providers/user/user';
import { Utils } from '../../common/utils';
import { VARIABLE } from '../../common/const';

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
    public viewCtrl: ViewController,
    public userProvider: UserProvider,
    public platform: Platform
  ) {
    if (this.navParams.data.invoice) {
      this.invoice = this.navParams.data.invoice;
      this.invoice['destination'] = this.deployData.get_farm_by_id(this.invoice.destinationId);
      this.invoice['source'] = this.deployData.get_farm_by_id(this.invoice.sourceId);
      this.invoice['importDateDisplay'] = this.util.convertDate(this.invoice.importDate);
      this.invoice['createdAtDisplay'] = this.util.convertDate(this.invoice.createdAt);
      this.invoice['updatedAtDisplay'] = this.util.convertDate(this.invoice.updatedAt);
      this.invoice.sourceManagerName = this.deployData.get_employee_by_id(this.invoice['source'].manager).name;
          this.invoice.destinationManagerName = this.deployData.get_employee_by_id(this.invoice['destination'].manager).name;
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
    this.getDetails();
  }

  getDetails() {
    this.util.openBackDrop();
    this.invoiceProvider.getPigInvoiceDetail(this.navParams.data.invoice.id)
      .then((details: Array<invoicePigDetail>) => {
        this.details = details;
        if (details.length) {
          this.invoice = details[0].invoice;
          this.invoice['destination'] = this.deployData.get_farm_by_id(this.invoice.destinationId);
          this.invoice['source'] = this.deployData.get_farm_by_id(this.invoice.sourceId);
          this.invoice['importDateDisplay'] = this.util.convertDate(this.invoice.importDate);
          this.invoice['createdAtDisplay'] = this.util.convertDate(this.invoice.createdAt);
          this.invoice['updatedAtDisplay'] = this.util.convertDate(this.invoice.updatedAt);
          this.invoice.sourceManagerName = this.deployData.get_employee_by_id(this.invoice['source'].manager).name;
          this.invoice.destinationManagerName = this.deployData.get_employee_by_id(this.invoice['destination'].manager).name;
          this.navParams.get('callback')(this.invoice);
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
              let destination = this.deployData.get_farm_by_id(this.invoice.destinationId);
              let source = this.deployData.get_farm_by_id(this.invoice.sourceId);
              updatedInvoice['destination'] = destination;
              updatedInvoice['source'] = source;
              updatedInvoice.sourceManagerName = this.deployData.get_employee_by_id(updatedInvoice['source'].manager).name;
              updatedInvoice.destinationManagerName = this.deployData.get_employee_by_id(updatedInvoice['destination'].manager).name;
              updatedInvoice['importDisplay'] = this.util.convertDate(this.invoice.importDate);
              updatedInvoice['createdAtDisplay'] = this.util.convertDate(this.invoice.createdAt);
              updatedInvoice['updatedAtDisplay'] = this.util.convertDate(this.invoice.updatedAt);
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

  /**
   * Đánh giá lại heo thuộc chứng từ
   */
  edit(item: invoicePigDetail) {
    let callback = (pig: pig) => {
      pig = this.deployData.get_pig_object_to_send_request(pig);
      this.invoiceProvider.updatePigInvoiceDetail({
        pigs: pig,
        invoicesPig: this.invoice
      })
        .then((res) => {
          if (res.pigs) {
            this.pigProvider.updatedPig(res.pigs);
            this.getDetails();
          }
          this.navCtrl.pop();
        })
        .catch(err => {
          console.log(err);
          return err;
        })
    }

    let pig = this.deployData.get_pig_by_id(item.objectId);
    let pigs = [pig];
    this.navCtrl.push(InputPigToInternalInvoicePage, { pigs: pigs, pig: pig, callback: callback });
  }

}
