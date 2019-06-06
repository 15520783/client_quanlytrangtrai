import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ViewController, Slides } from 'ionic-angular';
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
  @ViewChild('slider') slider: Slides;

  public tab = "0";

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
}
