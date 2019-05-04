import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ViewController } from 'ionic-angular';
import { invoicesProduct, foodWareHouse } from '../../common/entity';
import { InvoicesProvider } from '../../providers/invoices/invoices';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { Utils } from '../../common/utils';
import { FoodWarehouseInputPage } from '../food-warehouse-input/food-warehouse-input';

@IonicPage()
@Component({
  selector: 'page-food-invoice-detail',
  templateUrl: 'food-invoice-detail.html',
})
export class FoodInvoiceDetailPage {

  public invoice: invoicesProduct;
  public details: Array<foodWareHouse> = [];

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
    // this.util.showLoading('Đang tải dữ liệu');
    // this.invoiceProvider.getPigInvoiceDetail(this.navParams.data.invoice.id)
    //   .then((details: any) => {
    //     if (details.length) {
    //       this.details = details;
    //     }
    //     this.details.forEach(e => {
    //       console.log(this.pigs[e.objectId]);
    //     });
    //     this.util.closeLoading();
    //   })
    //   .catch((err: Error) => {
    //     console.log(err);
    //     this.util.closeLoading().then(() => {
    //       this.util.showToast('Dữ liệu chưa được tải về. Vui lòng kiểm tra kết nối');
    //     })
    //   })
  }

  input_food() {
    this.navCtrl.push(FoodWarehouseInputPage, { invoice: this.invoice });

    this.events.subscribe('createFoodWarehouse',(foodWarehouse)=>{
      foodWarehouse = this.deployData.get_foodWarehouse_object_to_send_request(foodWarehouse);
      console.log(foodWarehouse);
      this.util.showLoading('Đang xử lí dữ liệu');
      this.invoiceProvider.createFoodWareHouse(foodWarehouse)
      .then((foodhouse:foodWareHouse)=>{
        if(foodhouse){
          this.details.push(foodhouse);
          this.util.showToastSuccess('Dữ liệu cập nhật thành công');
          this.events.unsubscribe('createFoodWarehouse');
          this.events.publish('OK');
        }
        this.util.closeLoading();
      })
      .catch((err:Error)=>{
        console.log(err);
        this.util.closeLoading().then(()=>{
          this.util.showToast('Cập nhật thất bại.ERROR: ' + err.message);
        })
      })
    })
  }

  removeInvoice() {
    this.util.showLoading('Đang tiến hành xử lí dữ liệu')
    this.invoiceProvider.removeProductInvoice(this.invoice)
      .then((isOK) => {
        if (isOK) {
          this.util.showToastSuccess('Dữ liệu đã cập nhật thành công');
          this.viewCtrl.dismiss().then(() => {
            this.events.publish('removeInvoiceEvent', this.invoice);
          });
        }
        this.util.closeLoading();
      })
      .catch((err: Error) => {
        console.log(err);
        this.util.closeLoading().then(() => {
          this.util.showToast('Dữ liệu cập nhật thất bại. Vui lòng kiểm tra lại kết nối.');
        })
      })
  }
}
