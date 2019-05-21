import { Component, ViewChild, Input } from '@angular/core';
import { FilterProvider } from '../../providers/filter/filter';
import { NavController, Events, NavParams, Platform, Content } from 'ionic-angular';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { InvoicesProvider } from '../../providers/invoices/invoices';
import { Utils } from '../../common/utils';
import { invoicesPig } from '../../common/entity';
import { FormControl } from '@angular/forms';
import { ExportInternalPigInvoiceRole } from '../../role-input/export-InternalPigInvoice';
import { VARIABLE } from '../../common/const';
import { InvoiceInputUtilComponent } from '../invoice-input-util/invoice-input-util';


@Component({
  selector: 'export-internal-pig-invoice',
  templateUrl: 'export-internal-pig-invoice.html'
})
export class ExportInternalPigInvoiceComponent {

  @ViewChild('contentExternalInvoice') content: Content;
  @Input() invoices: Array<invoicesPig> = [];
  public roleInput: any;

  public mainAttribute = "invoiceNo";
  public attributes = [
    { name: "sourceName", label: 'Nguồn cung cấp' },
    { name: "destinationName", label: 'Nơi nhận' },
    { name: "importDateDisplay", label: 'Ngày nhập' },
    { name: "quantity", label: 'Tổng số heo' },
    { name: "totalWeight", label: 'Tổng trọng lượng' },
    { name: "statusName", label: 'Trạng thái' },
  ];

  public placeholderSearch: string = 'Tìm kiếm chứng từ'
  public filter_default: Array<string> = ["invoiceNo", "sourceName", "destinationName", "importDateDisplay", "quantity", "totalWeight", "statusName"];

  public page_Idx: number = 1;
  public page_Total: number = 0;
  public rows: Array<any> = [];

  protected searchControl: FormControl = new FormControl();
  protected searchTerm: string = '';

  public visible_items: Array<any> = [];

  public farms_util = {};

  constructor(
    public filterProvider: FilterProvider,
    public util: Utils,
    public navCtrl: NavController,
    public events: Events,
    public deployData: DeployDataProvider,
    public invoiceProvider: InvoicesProvider,
    public navParams: NavParams,
    public platform: Platform
  ) {
    if (this.navParams.data.invoice) {
      this.invoices = this.navParams.data.invoice;
      this.setFilteredItems();
    }

    this.roleInput = new ExportInternalPigInvoiceRole(this.deployData, this.invoiceProvider);
    this.farms_util = this.deployData.get_object_list_key_of_farm()

    this.events.subscribe('invoicesReload', () => {
      this.setFilteredItems();
    })
  }

  public setFilteredItems() {
    setTimeout(() => {
      this.rows = this.filterItems(this.searchTerm);
      this.page_Total = this.rows.length % 50 === 0 ? parseInt(this.rows.length / 50 + '') : parseInt(this.rows.length / 50 + 1 + '');
      this.page_Idx = 1;
      this.visible_items = this.rows.slice(0, 50);
      if (document.getElementById('content'))
        document.getElementById('content').scrollTop = 0;
    }, 200);
  }

  public filterItems(searchItem) {
    this.invoices.forEach((invoice) => {
      invoice['sourceName'] = this.farms_util[invoice.sourceId].name;
      invoice['destinationName'] = this.farms_util[invoice.destinationId].name;
      invoice['importDateDisplay'] = this.util.convertDate(invoice.importDate);
      invoice['statusName'] = VARIABLE.INVOICE_STATUS.PROCCESSING == invoice.status
        ? 'Đang xử lí' : (VARIABLE.INVOICE_STATUS.COMPLETE == invoice.status ? 'Hoàn tất' : 'Chưa xác định');
    })
      ;
    this.filterProvider.input = this.invoices;
    this.filterProvider.searchText = searchItem;
    this.filterProvider.searchWithText = this.filter_default;

    this.filterProvider.searchWithRange = {}
    return this.filterProvider.filter().sort((a: invoicesPig, b: invoicesPig) =>
      (new Date(a.importDate) > new Date(b.importDate)) ? -1 : 1
    );
  }

  loadData(infiniteScroll) {
    setTimeout(() => {
      let start = 50 * this.page_Idx + 1;
      let end = start + 50;
      this.page_Idx++;

      this.visible_items.push.apply(this.visible_items, this.rows.slice(start, end));
      infiniteScroll.complete();
    }, 800);
  }


  add() {
    let callback = data => {
      if (data) {
        this.invoices.push(data);
        this.setFilteredItems();
        this.navCtrl.pop();
      }
    }

    this.roleInput.clear();
    this.roleInput.object.invoiceNo = VARIABLE.GENERNAL_INVOICE_ID.INTERNAL_EXPORT + Date.now();
    this.navCtrl.push(InvoiceInputUtilComponent,
      {
        insertMode: true,
        roleInput: this.roleInput,
        callback: callback
      }
    )

    // this.events.unsubscribe('callback');
    // this.events.subscribe('callback', (data) => {
    //   console.log('TEST', data);
    //   if (data) {
    //     this.invoices.push(data);
    //     this.setFilteredItems();
    //     this.events.unsubscribe('callback');
    //   }
    // })
  }
}
