import { Component, ViewChild, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Slides, Slide } from 'ionic-angular';
import { invoicesPig } from '../../common/entity';


@IonicPage()
@Component({
  selector: 'page-invoices',
  templateUrl: 'invoices.html',
})
export class InvoicesPage {
  @ViewChild('slider') slider: Slides;

  public list_invoice_type;
  public list_keys;

  public invoices = [
    {
      invoiceNo:'001',
      sourceManagerName:'ABC',
      destinationManagerName:'EDF',
      exportDate:'30/04/2019',
      quantity:500
    }
  ]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform:Platform,
    public renderer:Renderer
  ) {
    this.list_invoice_type = {
      // {
      //   id: 1,
      //   name: "Chứng từ nhập heo trong hệ thống"
      // },
      internalPigInvoice: {
        title: 'Chứng từ nhập heo trong hệ thống',
        placeholderSearch: 'Tìm kiếm chứng từ',
        filter_default: ["invoiceNo", "sourceManagerName","destinationManagerName","exportDate","quantity"],
        attributes: [
          { name: "sourceManagerName", label: 'Nguồn cung cấp' },
          { name: "destinationManagerName", label: 'Nơi nhận' },
          { name: "exportDate", label: 'Ngày xuất' },
          { name: "quantity", label: 'Tổng số heo' },
        ],
        mainAttribute: 'invoiceNo',
        data: this.invoices,
        roleInput:{},        
      },
      externalPigInvoice: {
        title: 'Chứng từ nhập heo ngoài hệ thống',
        placeholderSearch: 'Tìm kiếm chứng từ',
        filter_default: ["invoiceNo", "sourceManagerName","destinationManagerName","importDate","quantity"],
        attributes: [
          { name: "sourceManagerName", label: 'Nguồn cung cấp' },
          { name: "destinationManagerName", label: 'Nơi nhận' },
          { name: "importDate", label: 'Ngày nhập' },
          { name: "quantity", label: 'Tổng số heo theo chứng từ' },
        ],
        mainAttribute: 'invoice_no',
        data: this.invoices,
        roleInput:{},        
      },
      // {
      //   id: 2,
      //   name: "Chứng từ nhập heo ngoài hệ thống",
      // },
      // {
      //   id: 3,
      //   name: "Chứng từ nhập cám",
      // },
      // {
      //   id: 4,
      //   name: "Chứng từ nhập thuốc",
      // }
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
