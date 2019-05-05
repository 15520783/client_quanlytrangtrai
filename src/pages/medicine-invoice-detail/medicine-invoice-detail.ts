import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ViewController } from 'ionic-angular';
import { invoicesProduct } from '../../common/entity';
import { medicineWarehouse } from '../../common/entity';
import { InvoicesProvider } from '../../providers/invoices/invoices';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { Utils } from '../../common/utils';
import { MedicineWarehouseInputPage } from '../medicine-warehouse-input/medicine-warehouse-input';



@IonicPage()
@Component({
  selector: 'page-medicine-invoice-detail',
  templateUrl: 'medicine-invoice-detail.html',
})
export class MedicineInvoiceDetailPage {

  public invoice: invoicesProduct;
  public details: Array<medicineWarehouse> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public invoiceProvider: InvoicesProvider,
    public deployData: DeployDataProvider,
    public util: Utils,
    public events: Events,
    public viewCtrl: ViewController
  ) {
    if (this.navParams.data.invoice) {
      this.invoice = this.navParams.data.invoice;
      this.invoice['destination'] = this.deployData.get_farm_by_id(this.invoice.destination.id);
      this.invoice['source'] = this.deployData.get_partner_by_id(this.invoice.source.id);
    }
  }

  ionViewDidLoad() {
    this.util.showLoading('Đang tải dữ liệu');
    this.invoiceProvider.getMedicineWarehouse(this.navParams.data.invoice.id)
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

  input_medicine() {
    this.navCtrl.push(MedicineWarehouseInputPage, { invoice: this.invoice });

    this.events.subscribe('createMedicineWarehouse',(medicineWarehouse)=>{
      medicineWarehouse = this.deployData.get_medicine_object_to_send_request(medicineWarehouse);
      this.invoiceProvider.createMedicineWarehouse(medicineWarehouse)
      .then((new_medicineWarehouse:medicineWarehouse)=>{
        if(new_medicineWarehouse){
          this.details.push(new_medicineWarehouse);
          this.events.unsubscribe('createMedicineWarehouse');
          this.events.publish('OK');
        }
      })
      .catch((err:Error)=>{})
    })
  }

  removeInvoice() {
    // this.invoiceProvider.removeProductInvoice(this.invoice)
    //   .then((isOK) => {
    //     if (isOK) {
    //       this.viewCtrl.dismiss().then(() => {
    //         this.events.publish('removeInvoiceEvent', this.invoice);
    //       });
    //     }
    //   })
    //   .catch((err: Error) => {})
  }

}
