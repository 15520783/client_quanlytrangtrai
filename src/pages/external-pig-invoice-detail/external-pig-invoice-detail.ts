import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ViewController, Slides } from 'ionic-angular';
import { invoicesPig, invoicePigDetail, pig } from '../../common/entity';
import { InvoicesProvider } from '../../providers/invoices/invoices';
import { Utils } from '../../common/utils';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { PigInputPage } from '../pig-input/pig-input';
import { PigsProvider } from '../../providers/pigs/pigs';
import { KEY } from '../../common/const';


@IonicPage()
@Component({
  selector: 'page-external-pig-invoice-detail',
  templateUrl: 'external-pig-invoice-detail.html',
})
export class ExternalPigInvoiceDetailPage {
  @ViewChild('slider') slider: Slides;

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


  input_pig() {
    this.navCtrl.push(PigInputPage);
    this.events.unsubscribe('pig-inputs:createPig');
    this.events.subscribe('pig-inputs:createPig', (pig: pig) => {
      this.invoiceProvider.createPigInvoiceDetail({
        pigs: this.deployData.get_pig_object_to_send_request(pig),
        invoicesPig: this.invoice
      })
        .then((response) => {
          if (response && response.pigs && response.invoicePigDetail) {
            this.pigs[response.pigs.id] = response.pigs;
            this.pigProvider.pigs.push(response.pigs);
            this.details.push(response.invoicePigDetail);
            this.events.unsubscribe('pig-inputs:createPig');
            this.events.publish('OK');
          }
        })
        .catch((err: Error) => { })
    })
  }

  edit(item: invoicePigDetail) {
    this.navCtrl.push(PigInputPage, { pigId: item.objectId });
    this.events.unsubscribe('pig-inputs:updatePig');
    this.events.subscribe('pig-inputs:updatePig', (pig: pig) => {
      // this.invoiceProvider.createPigInvoiceDetail({
      //   pigs: this.deployData.get_pig_object_to_send_request(pig),
      //   invoicesPig: this.invoice
      // })
      //   .then((response) => {
      //     if (response && response.pigs && response.invoicePigDetail) {
      //       this.pigs[response.pigs.id] = response.pigs;
      //       this.pigProvider.pigs.push(response.pigs);
      //       this.details.push(response.invoicePigDetail);
      //       this.events.unsubscribe('pig-inputs:updatePig');
      //       this.events.publish('OK');
      //     }
      //   })
      //   .catch((err: Error) => { })
      pig = this.deployData.get_pig_object_to_send_request(pig);
      this.pigProvider.updatePig(pig)
        .then((pig) => {
          this.pigs[pig.id] = pig;
          this.events.unsubscribe('pig-inputs:updatePig');
          this.events.publish('OK');
        })
        .catch((err: Error) => { })
    })
  }

  removePigInvoicesDetail(invoiceDetail: invoicePigDetail) {
    this.invoiceProvider.removePigInvoiceDetail(invoiceDetail)
      .then((isOK_detail) => {
        if (isOK_detail) {
          let pig = this.deployData.get_pig_object_to_send_request(this.pigs[invoiceDetail.objectId]);
          this.pigProvider.removePig(pig)
            .then((isOK_pig) => {
              if (isOK_pig) {
                let idx = this.details.findIndex(detail => detail.id == invoiceDetail.id);
                if (idx > -1)
                  this.details.splice(idx, 1);
              }
            })
        }
      })
      .catch((err: Error) => { })
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
}
