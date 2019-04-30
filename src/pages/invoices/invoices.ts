import { Component, ViewChild, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Slides, Slide } from 'ionic-angular';
import { InvoicesProvider } from '../../providers/invoices/invoices';


@IonicPage()
@Component({
  selector: 'page-invoices',
  templateUrl: 'invoices.html',
})
export class InvoicesPage {
  @ViewChild('slider') slider: Slides;

  public list_invoice_type;
  public list_keys;

  public internalPigInvoices: any;
  public externalPigInvoices: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public renderer: Renderer,
    public invoicesProvider: InvoicesProvider
  ) {
    this.internalPigInvoices = this.invoicesProvider.invoices.invoicesPigs.filter((invoices) => {
      return invoices.invoiceType == 1 ? true : false;
    });

    this.externalPigInvoices = this.invoicesProvider.invoices.invoicesPigs.filter((invoices) => {
      return invoices.invoiceType == 2 ? true : false;
    })

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
    console.log('ionViewDidLoad InvoicesPage');
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


}
