import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ViewController, Slides } from 'ionic-angular';
import { invoicesPig, invoicePigDetail, pig } from '../../common/entity';
import { InvoicesProvider } from '../../providers/invoices/invoices';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { Utils } from '../../common/utils';
import { PigsProvider } from '../../providers/pigs/pigs';
import { InputPigToInternalInvoicePage } from '../input-pig-to-internal-invoice/input-pig-to-internal-invoice';

@IonicPage()
@Component({
  selector: 'page-internal-pig-invoice-detail',
  templateUrl: 'internal-pig-invoice-detail.html',
})
export class InternalPigInvoiceDetailPage {
  @ViewChild('slider') slider : Slides;
  
  public tab = "0";
  
  public invoice: invoicesPig;
  public details: Array<invoicePigDetail> = [];
  public pigs: any;
  public house: any;
  public gentials: any;
  public foots: any;
  public healStatus: any;

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
      this.invoice['source'] = this.deployData.get_partner_by_id(this.invoice.sourceId);
    }
    this.pigs = this.deployData.get_object_list_key_of_pig();
    this.house = this.deployData.get_object_list_key_of_house();
    this.gentials = this.deployData.get_object_list_key_of_gential();
    this.healStatus = this.deployData.get_object_list_key_of_healthStatus();
    this.foots = this.deployData.get_object_list_key_of_foot();
  }

  ngAfterViewInit() {
    if (this.slider){
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
    this.util.showLoading('Đang tải dữ liệu');
    this.invoiceProvider.getPigInvoiceDetail(this.navParams.data.invoice.id)
      .then((details: any) => {
        if (details.length) {
          this.details = details;
        }
        this.util.closeLoading();
      })
      .catch((err: Error) => {
        console.log(err);
        this.util.closeLoading().then(() => {
          this.util.showToast('Dữ liệu chưa được tải về. Vui lòng kiểm tra kết nối');
        })
      })
  }


  input_pig() {
    this.navCtrl.push(InputPigToInternalInvoicePage);
    this.events.unsubscribe('updatePig');
    this.events.subscribe('updatePig', (pig: pig) => {
      pig = this.deployData.get_pig_object_to_send_request(pig);
      this.pigProvider.updatePig(pig)
        .then((data) => {
          if (data) {
            console.log(data);
            // this.pigs[data.id] = data;
            // let invoiceDetail = new invoicePigDetail();
            // invoiceDetail.objectId = data.id;
            // invoiceDetail.invoice = this.invoice;
            // this.invoiceProvider.createPigInvoiceDetail(invoiceDetail)
            //   .then((invoiceDetail: invoicePigDetail) => {
            //     if (invoiceDetail) {
            //       this.details.push(invoiceDetail);
            //       this.events.unsubscribe('updatePig');
            //       this.events.publish('OK');
            //     }
            //   })
          }
        })
        .catch((err: Error) => {
        })
    })
  }

  removePigInvoicesDetail(invoiceDetail: invoicePigDetail) {
    // this.invoiceProvider.removePigInvoiceDetail(invoiceDetail)
    //   .then((isOK_detail) => {
    //     if (isOK_detail) {
    //       let pig = this.deployData.get_pig_object_to_send_request(this.pigs[invoiceDetail.objectId]);
    //       this.pigProvider.removePig(pig)
    //         .then((isOK_pig) => {
    //           if (isOK_pig) {
    //             let idx = this.details.findIndex(detail => detail.id == invoiceDetail.id);
    //             this.details.splice(idx, 1);
    //           }
    //         })
    //     }
    //   })
    //   .catch((err: Error) => {})
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
      .catch((err: Error) => {})
  }

}
