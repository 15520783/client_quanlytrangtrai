import { Component, ViewChild } from '@angular/core';
import { Events, IonicPage, NavController, NavParams, Slides, ViewController } from 'ionic-angular';
import { KEY, VARIABLE } from '../../common/const';
import { invoicePigDetail, invoicesPig, pig } from '../../common/entity';

import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { ExternalPigInvoiceRole } from '../../role-input/externalPigInvoice';
import { InvoiceInputUtilComponent } from '../../components/invoice-input-util/invoice-input-util';
import { InvoicesProvider } from '../../providers/invoices/invoices';
import { PigInputPage } from '../pig-input/pig-input';
import { PigsProvider } from '../../providers/pigs/pigs';
import { SettingsProvider } from '../../providers/settings/settings';
import { Utils } from '../../common/utils';

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
    public settingProvider: SettingsProvider
  ) {
    if (this.navParams.data.invoice) {
      this.invoice = this.navParams.data.invoice;
      this.invoice['destination'] = this.deployData.get_farm_by_id(this.invoice.destinationId);
      this.invoice['source'] = this.deployData.get_partner_by_id(this.invoice.sourceId);
    }
    this.pigs = this.deployData.get_object_list_key_of_pig();
    this.house = this.deployData.get_object_list_key_of_house();
    this.gentials = this.deployData.get_object_list_key_of_gential();
    this.healStatus = this.deployData.get_object_list_key_of_healthStatus();
    this.foots = this.deployData.get_object_list_key_of_foot();

    if (this.invoice.status != VARIABLE.INVOICE_STATUS.COMPLETE) {
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

  /**
   * Nhập heo vào chứng từ
   */
  input_pig() {
    let statusPigValiable = this.settingProvider.setting.status.filter((status) => {
      return status.previousStatus == '0' ? true : false;
    })

    let callback = (pig: pig) => {
      this.invoiceProvider.createPigInvoiceDetail({
        pigs: this.deployData.get_pig_object_to_send_request(pig),
        invoicesPig: this.invoice
      })
        .then((response) => {
          if (response && response.pigs && response.invoicePigDetail) {
            this.pigs[response.pigs.id] = response.pigs;
            this.pigProvider.updatedPig(response.pigs);
            this.details.push(response.invoicePigDetail);
          }
          this.navCtrl.pop();
        })
        .catch((err: Error) => { })
    }

    this.navCtrl.push(PigInputPage, { statusPigValiable: statusPigValiable, callback: callback });
  }

  /**
   * Đánh giá lại heo thuộc chứng từ
   */
  edit(item: invoicePigDetail) {
    let callback = (pig: pig) => {
      pig = this.deployData.get_pig_object_to_send_request(pig);
      this.pigProvider.updatePig(pig)
        .then((pig) => {
          this.pigs[pig.id] = pig;
        })
        .catch((err: Error) => { })
    }

    this.navCtrl.push(PigInputPage, { pigId: item.objectId, callback: callback });
  }

  /**
   * Xóa heo khỏi chứng từ
   * @param invoiceDetail 
   */
  removePigInvoicesDetail(invoiceDetail: invoicePigDetail) {
    this.invoiceProvider.removeExternalImportPigInvoiceDetail(invoiceDetail)
      .then((isOK_detail) => {
        if (isOK_detail) {
          let idx = this.details.findIndex(detail => detail.id == invoiceDetail.id);
          if (idx > -1)
            this.details.splice(idx, 1);
          this.util.getKey(KEY.PIGS).then((pigs: Array<pig>) => {
            let idx = pigs.findIndex(pig => pig.id == invoiceDetail.objectId);
            if (idx > -1)
              pigs.splice(idx, 1);
            this.util.setKey(KEY.PIGS, pigs).then(() => {
              this.pigProvider.pigs = pigs;
            });
          })
        }
      })
      .catch((err: Error) => { })
  }

  /**
   * Xóa chứng từ
   */
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

    let callback = data =>{
      if (data) {
        this.invoice = data;
        this.invoice['destination'] = this.deployData.get_farm_by_id(this.invoice.destinationId);
        this.invoice['source'] = this.deployData.get_partner_by_id(this.invoice.sourceId);
        this.navParams.get('callback')(this.invoice);
        this.navCtrl.pop();
      }
    }

    let roleInput = new ExternalPigInvoiceRole(this.deployData, this.invoiceProvider);
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
   * Xác nhận chứng từ đã hoàn tất
   */
  completeInvoice() {
    let invoice: invoicesPig = this.util.deepClone(this.invoice);
    invoice.status = VARIABLE.INVOICE_STATUS.COMPLETE;
    this.invoiceProvider.updatePigInvoice(invoice)
      .then((updatedInvoice: invoicesPig) => {
        if (updatedInvoice) {
          this.invoice = updatedInvoice;
          this.invoice['destination'] = this.deployData.get_farm_by_id(this.invoice.destinationId);
          this.invoice['source'] = this.deployData.get_partner_by_id(this.invoice.sourceId);
          this.canCheckComplete = false;
          this.canEditInvoice = false;
          this.navParams.get('callback')(this.invoice);
        }
      })
      .catch((err: Error) => { })
  }
}
