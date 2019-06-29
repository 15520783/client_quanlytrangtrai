import { Component, Renderer, ViewChild } from '@angular/core';
import { Events, IonicPage, NavController, NavParams, Platform, Slides } from 'ionic-angular';

import { ExportInternalPigInvoiceComponent } from '../../components/export-internal-pig-invoice/export-internal-pig-invoice';
import { ExternalPigInvoicesComponent } from '../../components/external-pig-invoices/external-pig-invoices';
import { FoodInvoicesComponent } from '../../components/food-invoices/food-invoices';
import { InternalPigInvoicesComponent } from '../../components/internal-pig-invoices/internal-pig-invoices';
import { InvoicesProvider } from '../../providers/invoices/invoices';
import { MedicineInvoicesComponent } from '../../components/medicine-invoices/medicine-invoices';
import { SalePigInvoicesComponent } from '../../components/sale-pig-invoices/sale-pig-invoices';
import { UserProvider } from '../../providers/user/user';
import { Utils } from '../../common/utils';
import { VARIABLE } from '../../common/const';

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
  public saleInvoices: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public renderer: Renderer,
    public invoicesProvider: InvoicesProvider,
    public util: Utils,
    public events: Events,
    public userProvider: UserProvider
  ) {

    this.events.subscribe('invoicesPage:sync', () => {
      this.getInvoices();
    });

    let role = this.userProvider.rolePermission;
    if (role.ROLE_quan_ly_chung_tu_nhap_heo_trong_he_thong != null) {
      this.list_invoice_type.internalPigInvoice = {
        title: 'Chứng từ nhập heo trong hệ thống',
        invoices: [],
        component: InternalPigInvoicesComponent,
      }
    }
    if (role.ROLE_quan_ly_chung_tu_nhap_heo_ngoai_he_thong != null) {
      this.list_invoice_type.externalPigInvoice = {
        title: 'Chứng từ nhập heo ngoài hệ thống',
        invoices: [],
        component: ExternalPigInvoicesComponent
      }
    }
    if (role.ROLE_quan_ly_chung_tu_xuat_ban_heo != null) {
      this.list_invoice_type.salePigInvoice = {
        title: 'Chứng từ xuất bán heo',
        invoices: [],
        component: SalePigInvoicesComponent,
      }
    }
    if (role.ROLE_quan_ly_chung_tu_xuat_heo_trong_he_thong != null) {
      this.list_invoice_type.exportInternalPigInvoice = {
        title: 'Chứng từ xuất heo trong hệ thống',
        invoices: [],
        component: ExportInternalPigInvoiceComponent,
      }
    }
    if (role.ROLE_quan_ly_chung_tu_nhap_cam != null) {
      this.list_invoice_type.foodInvoice = {
        title: 'Chứng từ nhập cám',
        invoices: [],
        component: FoodInvoicesComponent,
      }
    }
    if (role.ROLE_quan_ly_chung_tu_nhap_thuoc != null) {
      this.list_invoice_type.medicineInvoice = {
        title: 'Chứng từ nhập thuốc',
        invoices: [],
        component: MedicineInvoicesComponent,
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
              return invoices.invoiceType == VARIABLE.INVOICE_PIG_TYPE.INTERNAL_IMPORT ? true : false;
            });
            this.externalPigInvoices = data.invoicesPigs.filter((invoices) => {
              return invoices.invoiceType == VARIABLE.INVOICE_PIG_TYPE.EXTERNAL_IMPORT ? true : false;
            })
            this.exportInternalPigInvoice = data.invoicesPigs.filter((invoices) => {
              return invoices.invoiceType == VARIABLE.INVOICE_PIG_TYPE.INTERNAL_EXPORT ? true : false;
            })
            this.saleInvoices = data.invoicesPigs.filter((invoices) => {
              return invoices.invoiceType == VARIABLE.INVOICE_PIG_TYPE.SALING_EXPORT ? true : false;
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
        this.list_invoice_type.salePigInvoice.invoices = this.saleInvoices;
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
