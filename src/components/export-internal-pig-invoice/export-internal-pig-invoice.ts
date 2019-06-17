import { Component, Input, ViewChild } from '@angular/core';
import { Content, Events, Menu, MenuController, NavController, NavParams, Platform } from 'ionic-angular';

import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { ExportInternalPigInvoiceDetailPage } from '../../pages/export-internal-pig-invoice-detail/export-internal-pig-invoice-detail';
import { ExportInternalPigInvoiceRole } from '../../role-input/export-InternalPigInvoice';
import { FilterProvider } from '../../providers/filter/filter';
import { FormControl } from '@angular/forms';
import { InvoiceInputUtilComponent } from '../invoice-input-util/invoice-input-util';
import { InvoicesProvider } from '../../providers/invoices/invoices';
import { UserProvider } from '../../providers/user/user';
import { Utils } from '../../common/utils';
import { VARIABLE } from '../../common/const';
import { invoicesPig } from '../../common/entity';

@Component({
  selector: 'export-internal-pig-invoice',
  templateUrl: 'export-internal-pig-invoice.html'
})
export class ExportInternalPigInvoiceComponent {
  @ViewChild('menuFilter') menuFilter: Menu;

  @ViewChild('contentExternalInvoice') content: Content;
  @Input() invoices: Array<invoicesPig> = [];
  public roleInput: any;

  public sourceFilter: Array<any> = [];
  public destinationFilter: Array<any> = [];

  public mainAttribute = "invoiceNo";
  public attributes = [
    { name: "sourceName", label: 'Nguồn cung cấp' },
    { name: "destinationName", label: 'Nơi nhận' },
    { name: "exportDateDisplay", label: 'Ngày nhập' },
    { name: "quantity", label: 'Tổng số heo' },
    { name: "totalWeight", label: 'Tổng trọng lượng' },
    { name: "statusName", label: 'Trạng thái', usingBadge: true },
    { name: "createBy", label: 'Người lập' }
  ];

  public placeholderSearch: string = 'Tìm kiếm chứng từ'
  public filter_default: Array<string> = ["invoiceNo", "sourceName", "destinationName", "exportDateDisplay", "quantity", "totalWeight", "statusName","createBy"];

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
    public platform: Platform,
    public menuCtrl: MenuController,
    public userProvider: UserProvider
  ) {
    if (this.navParams.data.invoice) {
      this.invoices = this.navParams.data.invoice;
      this.setFilteredItems();
    }

    this.sourceFilter = this.deployData.get_farm_list_for_select();
    this.destinationFilter = this.deployData.get_all_farm_for_select();

    this.roleInput = new ExportInternalPigInvoiceRole(this.deployData, this.invoiceProvider);
    this.farms_util = this.deployData.get_object_list_key_of_farm();

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
    this.invoices.forEach((invoice: invoicesPig) => {
      invoice['sourceName'] = this.farms_util[invoice.sourceId].name;
      invoice['destinationName'] = this.farms_util[invoice.destinationId].name;
      invoice['exportDateDisplay'] = this.util.convertDate(invoice.exportDate);
      invoice['createBy'] = invoice.employee?invoice.employee.name:'';
      switch (invoice.status) {
        case VARIABLE.INVOICE_STATUS.PROCCESSING: {
          invoice['statusName'] = 'Đang xử lí'; break;
        }
        case VARIABLE.INVOICE_STATUS.FORWARDING: {
          invoice['statusName'] = 'Đang chuyển heo'; break;
        }
        case VARIABLE.INVOICE_STATUS.COMPLETE: {
          invoice['statusName'] = 'Đã hoàn tất'; break;
        }
      }

      switch(invoice.status){
        case VARIABLE.INVOICE_STATUS.COMPLETE:{
          invoice['color'] = 'secondary';
          break;
        }

        case VARIABLE.INVOICE_STATUS.PROCCESSING:{
          invoice['color'] = 'main';
          break;
        }

        case VARIABLE.INVOICE_STATUS.FORWARDING:{
          invoice['color'] = 'warning';
          break;
        }

        default:{
          invoice['color'] = 'danger';
          break;
        }
      }
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
  }

  input_pig(item) {

    let callback = (invoice: invoicesPig) => {
      if (invoice) {
        let idx = this.invoices.findIndex(_invoice => _invoice.id == invoice.id);
        if (idx > -1) {
          this.invoices[idx] = invoice;
          this.setFilteredItems();
        }
      }
    }

    let callbackRemove = invoice => {
      if (invoice) {
        let idx = this.invoices.findIndex(Obj => Obj.id == invoice.id);
        if (idx > -1)
          this.invoices.splice(idx, 1);
        this.setFilteredItems();
      }
    }

    this.navCtrl.push(ExportInternalPigInvoiceDetailPage, { invoice: item, callback: callback, callbackRemove: callbackRemove });
  }


  openFilter() {
    this.menuFilter.enable(true);
    this.menuFilter.open();
  }

  closeFilter() {
    this.menuCtrl.close();
  }

  filterSource(sourceId) {
    if (sourceId)
      this.filterProvider.searchWithInclude.sourceId = [sourceId];
    else
      this.filterProvider.searchWithInclude.sourceId = [];
    this.setFilteredItems();
  }

  filterDestination(destinationId) {
    if (destinationId)
      this.filterProvider.searchWithInclude.destinationId = [destinationId];
    else
      this.filterProvider.searchWithInclude.destinationId = [];
    this.setFilteredItems();
  }

  customAlertOptions: any = {
    translucent: true,
    cssClass: 'ion-popover'
  };
}
