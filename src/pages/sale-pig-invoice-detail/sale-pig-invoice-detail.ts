import { CONFIG, KEY, MESSAGE, VARIABLE } from '../../common/const';
import { Component, ViewChild } from '@angular/core';
import { Events, IonicPage, ModalController, NavController, NavParams, Slides, ViewController } from 'ionic-angular';
import { invoicePigDetail, pig } from '../../common/entity';

import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { InputPigToInternalInvoicePage } from '../input-pig-to-internal-invoice/input-pig-to-internal-invoice';
import { InvoiceInputUtilComponent } from '../../components/invoice-input-util/invoice-input-util';
import { InvoicesProvider } from '../../providers/invoices/invoices';
import { PigListComponent } from '../../components/pig-list/pig-list';
import { PigsProvider } from '../../providers/pigs/pigs';
import { SalePigInvoiceRole } from '../../role-input/salePigInvoice';
import { SettingsProvider } from '../../providers/settings/settings';
import { UserProvider } from '../../providers/user/user';
import { Utils } from '../../common/utils';
import { invoicesPig } from '../../common/entity';

@IonicPage()
@Component({
  selector: 'page-sale-pig-invoice-detail',
  templateUrl: 'sale-pig-invoice-detail.html',
})
export class SalePigInvoiceDetailPage {
  @ViewChild('slider') slider: Slides;

  public tab = "0";

  public invoice: invoicesPig;
  public details: Array<invoicePigDetail> = [];
  public pigs: any;
  public house: any;
  public healStatus: any;
  public breeds:any;
  public gender:any;

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
    public settingProvider: SettingsProvider,
    public modalCtrl: ModalController,
    public userProvider: UserProvider
  ) {
    if (this.navParams.data.invoice) {
      this.invoice = this.navParams.data.invoice;
      this.invoice['source'] = this.deployData.get_farm_by_id(this.invoice.sourceId);
      this.invoice['destination'] = this.deployData.get_customer_by_id(this.invoice.destinationId);
      this.invoice['exportDateDisplay'] = this.util.convertDate(this.invoice.exportDate);
      this.invoice['updatedAtDisplay'] = this.util.convertDate(this.invoice.updatedAt);
    }

    this.pigs = this.deployData.get_object_list_key_of_pig();
    this.house = this.deployData.get_object_list_key_of_house();
    this.healStatus = this.deployData.get_object_list_key_of_healthStatus();
    this.breeds = this.deployData.get_object_list_key_of_breeds();
    this.gender = VARIABLE.GENDER;

    if (this.invoice.status != VARIABLE.INVOICE_STATUS.COMPLETE) {
      this.canCheckComplete = true;
      this.canEditInvoice = true;
    }
  }

  ionViewDidLoad() {
    this.getDetails();
  }

  getDetails() {
    this.util.openBackDrop();
    this.invoiceProvider.getPigInvoiceDetail(this.navParams.data.invoice.id)
      .then((details: any) => {
        this.details = details;
        if (details.length) {
          this.invoice = this.details[0].invoice;
          this.invoice['source'] = this.deployData.get_farm_by_id(this.invoice.sourceId);
          this.invoice['destination'] = this.deployData.get_customer_by_id(this.invoice.destinationId);
          this.invoice['exportDateDisplay'] = this.util.convertDate(this.invoice.exportDate);
          this.invoice['updatedAtDisplay'] = this.util.convertDate(this.invoice.updatedAt);
          this.navParams.data.callbackUpdate(this.invoice);
        }
        this.util.closeBackDrop()
      })
      .catch((err: Error) => {
        this.util.closeBackDrop().then(() => {
          this.util.showToast('Dữ liệu chưa được tải về. Vui lòng kiểm tra kết nối');
        })
      })
  }

  getInvoice() {
    this.util.openBackDrop();
    this.invoiceProvider.getInvoicePigById(this.invoice.id)
      .then((invoice: invoicesPig) => {
        if (invoice) {
          this.invoice = invoice;
          this.invoice['source'] = this.deployData.get_farm_by_id(this.invoice.sourceId);
          this.invoice['destination'] = this.deployData.get_customer_by_id(this.invoice.destinationId);
          this.invoice['exportDateDisplay'] = this.util.convertDate(this.invoice.exportDate);
          this.invoice['updatedAtDisplay'] = this.util.convertDate(this.invoice.updatedAt);
          this.navParams.data.callbackUpdate(this.invoice);
        }
        this.util.closeBackDrop();
      })
      .catch(err => {
        this.util.closeBackDrop();
        console.log(err);
        return err;
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
        this.invoice['source'] = this.deployData.get_farm_by_id(this.invoice.sourceId);
        this.invoice['destination'] = this.deployData.get_customer_by_id(this.invoice.destinationId);
        this.invoice['exportDateDisplay'] = this.util.convertDate(this.invoice.exportDate);
        this.invoice['updatedAtDisplay'] = this.util.convertDate(this.invoice.updatedAt);
        this.navParams.get('callbackUpdate')(this.invoice);
        this.navCtrl.pop();
      }
    }

    let roleInput = new SalePigInvoiceRole(this.deployData, this.userProvider, this.invoiceProvider);
    roleInput.object = this.util.deepClone(this.invoice);
    roleInput.object.exportDate = new Date(roleInput.object.exportDate).toISOString();
    this.navCtrl.push(InvoiceInputUtilComponent,
      {
        editMode: true,
        roleInput: roleInput,
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

    let pigs_Param: Array<pig> = [];
    this.details.forEach((e: invoicePigDetail) => {
      let item = this.deployData.get_pig_object_to_send_request(this.pigs[e.objectId]);
      pigs_Param.push(item);
    })

    this.invoiceProvider.updatePigInvoice(invoice)
      .then((updatedInvoice: invoicesPig) => {
        if (updatedInvoice) {
          this.invoice = updatedInvoice;
          this.invoice['source'] = this.deployData.get_farm_by_id(this.invoice.sourceId);
          this.invoice['destination'] = this.deployData.get_customer_by_id(this.invoice.destinationId);
          this.canCheckComplete = false;
          this.canEditInvoice = false;
          this.navParams.get('callbackUpdate')(this.invoice);
        }

        return this.pigProvider.updateSoldStatusForPigs(pigs_Param)
          .then((updated_pigs: Array<pig>) => {
            if (updated_pigs) {
              this.util.getKey(KEY.PIGS).then((pigs: Array<pig>) => {
                updated_pigs.forEach(e => {
                  let idx = pigs.findIndex(_pig => _pig.id == e.id);
                  if (idx > -1) {
                    pigs[idx] = e;
                  }
                })
                this.pigProvider.pigs = pigs;
                this.util.setKey(KEY.PIGS, pigs);
              })
            }
          })
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
          this.navParams.get('callbackRemove')(this.invoice);
          this.navCtrl.pop();
        }
      })
      .catch((err: Error) => { })
  }



  /**
   * Nhập heo vào chứng từ
   */
  input_pig() {
    let statusPig = this.deployData.get_object_list_key_of_status();
    let houses = this.deployData.get_object_list_key_of_house();

    this.util.openBackDrop();
    this.pigProvider.getPigs()
      .then(() => {
        let salePigs = this.pigProvider.pigs.filter((pig) => {
          return (statusPig[pig.statusId] &&
            statusPig[pig.statusId].code != VARIABLE.STATUS_PIG.WAIT_FOR_TRANSFER &&
            statusPig[pig.statusId].code != VARIABLE.STATUS_PIG.WAIT_FOR_SALE &&
            statusPig[pig.statusId].code != VARIABLE.STATUS_PIG.WAIT_FOR_MATING &&
            statusPig[pig.statusId].code != VARIABLE.STATUS_PIG.MATING &&
            statusPig[pig.statusId].code != VARIABLE.STATUS_PIG.UNKNOW &&
            houses[pig.houseId].section.farm.id == this.invoice.sourceId) ? true : false;
        });
        this.util.closeBackDrop();
        let modal = this.modalCtrl.create(PigListComponent, { pigs: salePigs, selectMode: true, title: 'Danh sách heo có thể xuất bán' });
        modal.onDidDismiss((pig: pig) => {
          if (pig) {
            pig = this.deployData.get_pig_object_to_send_request(pig);
            this.invoiceProvider.createPigInvoiceDetail({
              pigs: pig,
              invoicesPig: this.invoice
            })
              .then((response) => {
                if (response && response.pigs && response.invoicePigDetail) {
                  this.pigProvider.updatedPig(response.pigs);
                  this.getDetails();
                }
              })
              .catch((err: Error) => { })
          }
        })
        modal.present();
      })
      .catch((err) => {
        console.log(err);
        this.util.closeBackDrop().then(() => {
          this.util.showToast(MESSAGE[CONFIG.LANGUAGE_DEFAULT].ERROR_OCCUR)
        });
      })
  }


  /**
   * Xóa heo khỏi chứng từ
   * @param invoiceDetail 
   */
  removePigInvoicesDetail(invoiceDetail: invoicePigDetail) {
    this.invoiceProvider.removePigInvoiceDetail(invoiceDetail)
      .then((isOK_detail) => {
        if (isOK_detail) {
            let statusSaleWaiting = this.deployData.get_status_by_id(this.pigs[invoiceDetail.objectId].statusId);
            let pig = this.util.deepClone(this.pigs[invoiceDetail.objectId]);
            pig.statusId = statusSaleWaiting.previousStatus;
            this.pigs[invoiceDetail.objectId] = pig;
            this.pigProvider.updatedPig(pig);
            this.getInvoice();
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
