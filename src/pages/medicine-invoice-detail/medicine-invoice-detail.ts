import { Component, ViewChild } from '@angular/core';
import { Events, IonicPage, NavController, NavParams, Slides, ViewController } from 'ionic-angular';

import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { InvoiceInputUtilComponent } from '../../components/invoice-input-util/invoice-input-util';
import { InvoicesProvider } from '../../providers/invoices/invoices';
import { MedicineInvoiceRole } from '../../role-input/medicineInvoice';
import { MedicineWarehouseInputPage } from '../medicine-warehouse-input/medicine-warehouse-input';
import { UserProvider } from '../../providers/user/user';
import { Utils } from '../../common/utils';
import { VARIABLE } from '../../common/const';
import { invoicesProduct } from '../../common/entity';
import { medicineWarehouse } from '../../common/entity';

@IonicPage()
@Component({
  selector: 'page-medicine-invoice-detail',
  templateUrl: 'medicine-invoice-detail.html',
})
export class MedicineInvoiceDetailPage {
  @ViewChild('slider') slider: Slides;

  public tab = "0";

  public invoice: invoicesProduct;
  public details: Array<medicineWarehouse> = [];

  canCheckComplete: boolean = false;
  canEditInvoice: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public invoiceProvider: InvoicesProvider,
    public deployData: DeployDataProvider,
    public util: Utils,
    public events: Events,
    public viewCtrl: ViewController,
    public userProvider:UserProvider
  ) {
    if (this.navParams.data.invoice) {
      this.invoice = this.navParams.data.invoice;
      this.invoice['destination'] = this.deployData.get_farm_by_id(this.invoice.destination.id);
      this.invoice['source'] = this.deployData.get_partner_by_id(this.invoice.source.id);
    }

    if (this.invoice.status != VARIABLE.INVOICE_STATUS.COMPLETE) {
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
    this.invoiceProvider.getMedicineWarehouse(this.navParams.data.invoice.id)
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

  input_medicine() {
    let callback = (medicineWarehouse: medicineWarehouse) => {
      medicineWarehouse = this.deployData.get_medicine_object_to_send_request(medicineWarehouse);
      this.invoiceProvider.createMedicineWarehouse(medicineWarehouse)
        .then((new_medicineWarehouse: medicineWarehouse) => {
          if (new_medicineWarehouse) {
            this.details.push(new_medicineWarehouse);
          }
          this.navCtrl.pop();
        })
        .catch((err: Error) => { })
    }
    this.navCtrl.push(MedicineWarehouseInputPage, { invoice: this.invoice, callback: callback });
  }

  removeInvoice() {
    this.invoiceProvider.removeProductInvoice(this.invoice)
      .then((isOK) => {
        if (isOK) {
          this.viewCtrl.dismiss().then(() => {
            this.events.publish('removeInvoiceEvent', this.invoice);
          });
        }
      })
      .catch((err: Error) => { })
  }


  edit(item) {
    let callback = (medicineWarehouse: medicineWarehouse) => {
      medicineWarehouse = this.deployData.get_medicine_object_to_send_request(medicineWarehouse);
      this.invoiceProvider.updateMedicineWarehouse(medicineWarehouse)
        .then((updated_medicineWarehouse: medicineWarehouse) => {
          if (updated_medicineWarehouse) {
            item = updated_medicineWarehouse;
          }
          this.navCtrl.pop();
        })
        .catch((err: Error) => { })
    }
    this.navCtrl.push(MedicineWarehouseInputPage, { medicineWarehouse: item, callback: callback })
  }

  
  /**
   * Chỉnh sửa chứng từ
   */
  editInvoice() {
    let callback = data =>{
      if (data) {
        this.invoice = data;
        // this.invoice['destination'] = this.deployData.get_farm_by_id(this.invoice.destination.id);
        // this.invoice['source'] = this.deployData.get_partner_by_id(this.invoice.source.id);
        this.navParams.get('callback')(this.invoice);
        this.navCtrl.pop();
      }
    }

    let roleInput = new MedicineInvoiceRole(this.deployData, this.invoiceProvider);
    roleInput.object = this.util.deepClone(this.invoice);
    roleInput.object.sourceId = roleInput.object.source.id;
    roleInput.object.destinationId = roleInput.object.destination.id;
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
    let invoice: invoicesProduct = this.util.deepClone(this.invoice);
    invoice.status = VARIABLE.INVOICE_STATUS.COMPLETE;
    this.invoiceProvider.updateProductInvoice(invoice)
      .then((updatedInvoice: invoicesProduct) => {
        if (updatedInvoice) {
          this.invoice = updatedInvoice;
          // this.invoice['destination'] = this.deployData.get_farm_by_id(this.invoice.destinationId);
          // this.invoice['source'] = this.deployData.get_partner_by_id(this.invoice.sourceId);
          this.canCheckComplete = false;
          this.canEditInvoice = false;
          this.navParams.get('callback')(this.invoice);
        }
      })
      .catch((err: Error) => { })
  }

  removeInvoicesDetail(item){

  }
}
