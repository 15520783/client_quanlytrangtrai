import { Component, ViewChild } from '@angular/core';
import { Events, IonicPage, NavController, NavParams, Slides, ViewController } from 'ionic-angular';
import { MESSAGE, VARIABLE } from '../../common/const';
import { invoicePigDetail, invoicesPig, pig } from '../../common/entity';

import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { ExportInternalPigInvoiceRole } from '../../role-input/export-InternalPigInvoice';
import { InputPigToInternalInvoicePage } from '../input-pig-to-internal-invoice/input-pig-to-internal-invoice';
import { InvoiceInputUtilComponent } from '../../components/invoice-input-util/invoice-input-util';
import { InvoicesProvider } from '../../providers/invoices/invoices';
import { PigsProvider } from '../../providers/pigs/pigs';
import { SettingsProvider } from '../../providers/settings/settings';
import { UserProvider } from '../../providers/user/user';
import { Utils } from '../../common/utils';

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
    public settingProvider: SettingsProvider,
    public userProvider:UserProvider
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

    let callback = data => {
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
        callback: callback
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


  /**
   * Nhập heo vào chứng từ
   */
  input_pig() {
    let statusPigValiable = this.settingProvider.setting.status.filter((status) => {
      return status.previousStatus == '0' ? true : false;
    })

    let callback = (pig: pig) => {
      let transferPigsStatus = this.deployData.get_status_farm_transferWaiting_of_pig(pig.statusId);
      pig.statusId = transferPigsStatus.id;
      this.invoiceProvider.createPigInvoiceDetail({
        pigs: this.deployData.get_pig_object_to_send_request(pig),
        invoicesPig: this.invoice
      })
        .then((response) => {
          if (response && response.pigs && response.invoicePigDetail) {
            this.details.push(response.invoicePigDetail);
            this.pigs[response.pigs.id] = response.pigs;
            this.pigProvider.updatedPig(response.pigs);
          }
          this.navCtrl.pop();
        }).then((data) => {
          if (this.slider) {
            this.slider.resize();
          }
        })
        .catch((err: Error) => { })
    }

    let houses = this.deployData.get_object_list_key_of_house();
    let statusPig = this.deployData.get_object_list_key_of_status();
    this.util.openBackDrop();
    this.pigProvider.getPigs()
      .then(() => {
        let transferPigs = this.pigProvider.pigs.filter((pig) => {
          return (statusPig[pig.statusId].code != VARIABLE.STATUS_PIG.WAIT_FOR_TRANSFER &&
            statusPig[pig.statusId].code != VARIABLE.STATUS_PIG.WAIT_FOR_SALE &&
            statusPig[pig.statusId].code != VARIABLE.STATUS_PIG.WAIT_FOR_MATING &&
            statusPig[pig.statusId].code != VARIABLE.STATUS_PIG.MATING &&
            houses[pig.houseId].section.farm.id == this.invoice.sourceId) ? true : false;
        });
        this.util.closeBackDrop();
        this.navCtrl.push(InputPigToInternalInvoicePage, { pigs: transferPigs, statusPigValiable: statusPigValiable, callback: callback });
      })
      .catch((err) => {
        console.log(err);
        this.util.closeBackDrop();
      })

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
          this.navCtrl.pop();
        })
        .catch((err: Error) => { })
    }

    let pig = this.deployData.get_pig_by_id(item.objectId);
    let pigs = [pig];
    this.navCtrl.push(InputPigToInternalInvoicePage, { pigs: pigs, pig: pig, callback: callback });
  }

  /**
   * Xóa heo khỏi chứng từ
   * @param invoiceDetail 
   */
  removePigInvoicesDetail(invoiceDetail: invoicePigDetail) {
    this.invoiceProvider.removePigInvoiceDetail(invoiceDetail)
      .then((isOK_detail) => {
        if (isOK_detail) {
          let idx = this.details.findIndex(detail => detail.id == invoiceDetail.id);
          if (idx > -1) {
            this.details.splice(idx, 1);
            let statusFarmTransferWaiting = this.deployData.get_status_by_id(this.pigs[invoiceDetail.objectId].statusId);
            let pig = this.util.deepClone(this.pigs[invoiceDetail.objectId]);
            pig.statusId = statusFarmTransferWaiting.previousStatus;
            this.pigs[invoiceDetail.objectId] = pig;
            this.pigProvider.updatedPig(pig);
          }

        }
      })
      .catch((err: Error) => { })
  }

  /**
   * Xác nhận xuất heo cho chứng từ
   */
  forwardingModifyInvoice() {
    let invoice: invoicesPig = this.util.deepClone(this.invoice);
    invoice.status = VARIABLE.INVOICE_STATUS.FORWARDING;
    this.invoiceProvider.updatePigInvoice(invoice)
      .then((updatedInvoice: invoicesPig) => {
        if (updatedInvoice) {
          this.invoice = updatedInvoice;
          this.invoice['destination'] = this.deployData.get_farm_by_id(this.invoice.destinationId);
          this.invoice['source'] = this.deployData.get_farm_by_id(this.invoice.sourceId);
          this.invoice.sourceManagerName = this.deployData.get_employee_by_id(this.invoice.sourceManager).name;
          this.canCheckComplete = false;
          this.canEditInvoice = false;
          this.navParams.get('callback')(this.invoice);
        }
      })
      .catch((err: Error) => { })
  }
}
