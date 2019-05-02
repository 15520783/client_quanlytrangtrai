import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { invoicesPig, invoicePigDetail, pig, round, breeds, footType, healthStatus, pregnancyStatus, priceCodes } from '../../common/entity';
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

  public invoice: invoicesPig;
  public details: Array<invoicePigDetail> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public invoiceProvider: InvoicesProvider,
    public deployData: DeployDataProvider,
    public util: Utils,
    public events: Events,
    public pigProvider: PigsProvider
  ) {
    if (this.navParams.data.invoice) {
      this.invoice = this.navParams.data.invoice;
      this.invoice.importDate = this.util.convertDate(this.invoice.importDate);
      this.invoice.updatedAt = this.util.convertDate(this.invoice.updatedAt);
      this.invoice['destination'] = this.deployData.get_farm_by_id(this.invoice.destinationId);
      this.invoice['source'] = this.deployData.get_partner_by_id(this.invoice.sourceId);
      this.util.showLoading('Đang tải dữ liệu');
      this.invoiceProvider.getPigInvoiceDetail(this.navParams.data.invoice.id)
        .then((details: any) => {
          if (this.details.length) {
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
  }

  ionViewDidLoad() {

  }


  input_pig() {
    this.navCtrl.push(PigInputPage);

    this.events.subscribe('createPig', (pig: pig) => {
      let pig_temp = pig;
      pig['house'] = this.deployData.get_house_by_id(pig.houseId);
      pig['round'] = { id: 0 };
      pig['breed'] = this.deployData.get_breed_by_id(pig.breedId);
      pig['foot'] = this.deployData.get_foot_by_id(pig.footTypeId);
      pig['healthStatus'] = this.deployData.get_healthstatus_by_id(pig.healthStatusId);
      pig['pregnancyStatus'] = this.deployData.get_pregnancystatus_by_id(pig.pregnancyStatusId)
      pig['priceCode'] = this.deployData.get_pricecode_by_id(pig.priceCodeId)

      this.util.showLoading('Đang xử lí dữ liệu')
      this.pigProvider.createPig(pig)
        .then((data) => {
          if (data) {
            pig_temp.id = data.id;
            this.pigProvider.pigs.push(pig_temp);
            this.util.setKey(KEY.PIGS, this.pigProvider.pigs).then(() => {
              this.util.closeLoading().then(() => {
                this.util.showToastSuccess('Dữ liệu cập nhật thành công');
                this.events.unsubscribe('createPig');
                this.events.publish('OK');
              })
            });
          }
        })
        .catch((err: Error) => {
          console.log(err);
          this.util.closeLoading().then(() => {
            this.util.showToast('Cập nhật thất bại.ERROR: ' + err.message);
          })
        })
    })
  }
}
