import { Component, ViewChild, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Slides, Events } from 'ionic-angular';
import { InvoicesProvider } from '../../providers/invoices/invoices';
import { Utils } from '../../common/utils';
import { VARIABLE } from '../../common/const';
import { InternalPigInvoicesComponent } from '../../components/internal-pig-invoices/internal-pig-invoices';
import { ExternalPigInvoicesComponent } from '../../components/external-pig-invoices/external-pig-invoices';
import { FoodInvoicesComponent } from '../../components/food-invoices/food-invoices';
import { MedicineInvoicesComponent } from '../../components/medicine-invoices/medicine-invoices';
import { ExportInternalPigInvoiceComponent } from '../../components/export-internal-pig-invoice/export-internal-pig-invoice';


@IonicPage()
@Component({
  selector: 'page-invoices',
  templateUrl: 'invoices.html',
})
export class InvoicesPage {
  @ViewChild('slider') slider: Slides;

  public list_invoice_type: any = {};
  public list_keys;

  public internalPigInvoices: any = [];
  public externalPigInvoices: any = [];
  public foodInvoices: any = [];
  public medicineInvoices: any = [];
  public exportInternalPigInvoice: any = [];

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
        title: 'Chứng từ nhập heo trong hệ thống',
        invoices: [],
        component: InternalPigInvoicesComponent
      },
      externalPigInvoice: {
        title: 'Chứng từ nhập heo ngoài hệ thống',
        invoices: [],
        component: ExternalPigInvoicesComponent
      },
      salePigInvoice: {
        title: 'Chứng từ xuất bán heo',
        invoices: [],
        component: ExternalPigInvoicesComponent
      },
      exportInternalPigInvoice: {
        title: 'Chứng từ xuất heo trong hệ thống',
        invoices: [],
        component: ExportInternalPigInvoiceComponent
      },
      foodInvoice: {
        title: 'Chứng từ nhập cám',
        invoices: [],
        component: FoodInvoicesComponent
      },
      medicineInvoice: {
        title: 'Chứng từ nhập thuốc',
        invoices: [],
        component: MedicineInvoicesComponent
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
    this.util.openBackDrop();
    this.invoicesProvider.getAllInvoices()
      .then((data: any) => {
        if (data) {
          this.invoicesProvider.invoices = data;
          if (data.invoicesPigs.length) {
            this.internalPigInvoices = data.invoicesPigs.filter((invoices) => {
              return invoices.invoiceType == 1 ? true : false;
            });
            this.externalPigInvoices = data.invoicesPigs.filter((invoices) => {
              return invoices.invoiceType == VARIABLE.INVOICE_PIG_TYPE.EXTERNAL_IMPORT ? true : false;
            })
            this.exportInternalPigInvoice = data.invoicesPigs.filter((invoices) => {
              return invoices.invoiceType == VARIABLE.INVOICE_PIG_TYPE.INTERNAL_EXPORT ? true : false;
            })
            this.foodInvoices = data.invoicesProducts.filter((invoices) => {
              return invoices.invoiceType === VARIABLE.INVOICE_PRODUCT_TYPE.FOOD ? true : false;
            })
            this.medicineInvoices = data.invoicesProducts.filter((invoices) => {
              return invoices.invoiceType === VARIABLE.INVOICE_PRODUCT_TYPE.MEDICINE ? true : false;
            })
          }
        }
        this.list_invoice_type.externalPigInvoice.invoices = this.externalPigInvoices;
        this.list_invoice_type.internalPigInvoice.invoices = this.internalPigInvoices;
        this.list_invoice_type.exportInternalPigInvoice.invoices = this.exportInternalPigInvoice;
        this.list_invoice_type.foodInvoice.invoices = this.foodInvoices;
        this.list_invoice_type.medicineInvoice.invoices = this.medicineInvoices;
        this.util.closeBackDrop();
      }).then(() => {
        this.events.publish('invoicesReload');
      })
      .catch((err: Error) => {
        console.log(err);
        this.util.closeBackDrop().then(() => {
          this.util.showToast('Dữ liệu chưa được tải về. Vui lòng kiểm tra lại kết nối.')
        })
      })
  }


  openPage(item) {
    this.navCtrl.push(item.component, { invoice: item.invoices });
  }
}
