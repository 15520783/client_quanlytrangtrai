import { Component, ViewChild, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Slides, Slide, Events } from 'ionic-angular';
import { InvoicesProvider } from '../../providers/invoices/invoices';
import { Utils } from '../../common/utils';
import { VARIABLE } from '../../common/const';


@IonicPage()
@Component({
  selector: 'page-invoices',
  templateUrl: 'invoices.html',
})
export class InvoicesPage {
  @ViewChild('slider') slider: Slides;

  public list_invoice_type;
  public list_keys;

  public internalPigInvoices: any = [];
  public externalPigInvoices: any = [];
  public foodInvoices: any = [];
  public medicineInvoices: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public renderer: Renderer,
    public invoicesProvider: InvoicesProvider,
    public util: Utils,
    public events: Events
  ) {


    this.list_invoice_type = {
      internalPigInvoice: {
        title: 'Chứng từ nhập heo trong hệ thống'
      },
      externalPigInvoice: {
        title: 'Chứng từ nhập heo ngoài hệ thống'
      },
      foodInvoice: {
        title: 'Chứng từ nhập cám'
      },
      medicineInvoice: {
        title: 'Chứng từ nhập thuốc'
      }
    }

    this.list_keys = Object.keys(this.list_invoice_type);
  }

  ionViewDidLoad() {
    this.getInvoices();
  }

  ngAfterViewInit() {
    if (this.slider)
      this.slider.autoHeight = true;

    let element: any = document.getElementsByClassName('setting-util-component');
    for (let i = 0; i < element.length; i++) {
      this.renderer.setElementStyle(element[i], 'height', 90 + 'vH');
    }
  }

  scrollToView(idx: number) {
    this.slider.slideTo(idx);
  }



  getInvoices() {
    this.util.showLoading('Đang tải dữ liệu');
    this.invoicesProvider.getAllInvoices()
      .then((data: any) => {
        if (data) {
          this.invoicesProvider.invoices = data;
          if (data.invoicesPigs.length) {
            this.internalPigInvoices = data.invoicesPigs.filter((invoices) => {
              return invoices.invoiceType == 1 ? true : false;
            });
            this.externalPigInvoices = data.invoicesPigs.filter((invoices) => {
              return invoices.invoiceType == 2 ? true : false;
            })
            this.foodInvoices = data.invoicesProducts.filter((invoices) => {
              return invoices.type === VARIABLE.INVOICE_PRODUCT_TYPE.FOOD ? true : false;
            })
            this.medicineInvoices = data.invoicesProducts.filter((invoices) => {
              return invoices.type === VARIABLE.INVOICE_PRODUCT_TYPE.MEDICINE ? true : false;
            })
          }
        }
        this.util.closeLoading();
      }).then(()=>{
        this.events.publish('invoicesReload');
      })
      .catch((err: Error) => {
        console.log(err);
        this.util.closeLoading().then(() => {
          this.util.showToast('Dữ liệu chưa được tải về. Vui lòng kiểm tra lại kết nối.')
        })
      })
  }
}
