import { Component, Input, ViewChild } from '@angular/core';
import { Content, Events, Menu, MenuController, NavController, NavParams, Platform } from 'ionic-angular';

import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { FilterProvider } from '../../providers/filter/filter';
import { FormControl } from '@angular/forms';
import { ForwardingPigInvoiceListPage } from '../../pages/forwarding-pig-invoice-list/forwarding-pig-invoice-list';
import { InternalPigInvoiceDetailPage } from '../../pages/internal-pig-invoice-detail/internal-pig-invoice-detail';
import { InternalPigInvoiceRole } from '../../role-input/internalPigInvoice';
import { InvoiceInputUtilComponent } from '../invoice-input-util/invoice-input-util';
import { InvoicesProvider } from '../../providers/invoices/invoices';
import { UserProvider } from '../../providers/user/user';
import { Utils } from '../../common/utils';
import { VARIABLE } from '../../common/const';
import { invoicesPig, } from '../../common/entity';

@Component({
  selector: 'internal-pig-invoices',
  templateUrl: 'internal-pig-invoices.html'
})
export class InternalPigInvoicesComponent {

  @ViewChild('contentInternalInvoice') content: Content;
  @ViewChild('menuFilter') menuFilter: Menu;

  @Input() invoices: Array<invoicesPig> = [];
  public roleInput: any;

  public sourceFilter: Array<any> = [];
  public destinationFilter: Array<any> = [];

  public mainAttribute = "invoiceNo";
  public attributes = [
    { name: "sourceName", label: 'Nguồn cung cấp' },
    { name: "destinationName", label: 'Nơi nhận' },
    { name: "importDateDisplay", label: 'Ngày nhập' },
    { name: "quantity", label: 'Tổng số heo' , unit:' con '},
    { name: "totalWeight", label: 'Tổng khối lượng' , unit:' kg '},
    { name: "statusName", label: 'Trạng thái', usingBadge: true },
    { name: "createBy", label: 'Người lập' }
  ];
  public placeholderSearch: string = 'Tìm kiếm chứng từ'
  public filter_default: Array<string> = ["invoiceNo", "sourceName", "destinationName", "importDateDisplay", "statusName", "quantity", "createBy"];

  public page_Idx: number = 1;
  public page_Total: number = 0;
  public rows: Array<any> = [];

  protected searchControl: FormControl = new FormControl();
  protected searchTerm: string = '';

  public visible_items: Array<any> = [];

  public partners_util = {};
  public farms_util = {};
  public employees: Array<any> = [];

  constructor(
    public filterProvider: FilterProvider,
    public invoiceProvider: InvoicesProvider,
    public deployData: DeployDataProvider,
    public util: Utils,
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public menuCtrl: MenuController,
    public userProvider: UserProvider,
    public platform: Platform
  ) {
    if (this.navParams.data.invoice) {
      this.invoices = this.navParams.data.invoice;
      this.setFilteredItems();
    }
    this.roleInput = new InternalPigInvoiceRole(deployData, invoiceProvider);
    this.partners_util = this.deployData.get_object_list_key_of_partner();
    this.farms_util = this.deployData.get_object_list_key_of_farm();

    this.sourceFilter = this.deployData.get_all_farm_for_select();
    this.destinationFilter = this.deployData.get_farm_list_for_select();
  }

  ngAfterContentInit(): void {
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
      invoice['sourceName'] = this.farms_util[invoice.sourceId] ? this.farms_util[invoice.sourceId].name : '';
      invoice['destinationName'] = this.farms_util[invoice.destinationId] ? this.farms_util[invoice.destinationId].name : '';
      invoice['importDateDisplay'] = this.util.convertDate(invoice.importDate);
      invoice['createBy'] = invoice.employee ? invoice.employee.name : '';
      invoice['statusName'] = VARIABLE.INVOICE_STATUS.PROCCESSING == invoice.status
        ? 'Đang xử lí' : (VARIABLE.INVOICE_STATUS.COMPLETE == invoice.status ? 'Hoàn tất' : 'Chưa xác định');

      switch (invoice.status) {
        case VARIABLE.INVOICE_STATUS.COMPLETE: {
          invoice['color'] = 'secondary';
          break;
        }

        case VARIABLE.INVOICE_STATUS.PROCCESSING: {
          invoice['color'] = 'main';
          break;
        }

        case VARIABLE.INVOICE_STATUS.FORWARDING: {
          invoice['color'] = 'warning';
          break;
        }

        default: {
          invoice['color'] = 'danger';
          break;
        }
      }
    })
    this.filterProvider.input = this.invoices;
    this.filterProvider.searchText = searchItem;
    this.filterProvider.searchWithText = this.filter_default;

    this.filterProvider.searchWithRange = {}
    return this.filterProvider.filter().sort((a: invoicesPig, b: invoicesPig) =>
      (new Date(a.createdAt) > new Date(b.createdAt)) ? -1 : 1
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
        this.input_pig(data);
      }
    }

    this.roleInput.clear();
    this.roleInput.object.invoiceNo = VARIABLE.GENERNAL_INVOICE_ID.INTERNAL_IMPORT + Date.now();
    this.roleInput.object.importDate = new Date().toISOString();
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

    this.navCtrl.push(InternalPigInvoiceDetailPage, { invoice: item, callback: callback });

    this.events.subscribe('removeInvoiceEvent', (invoice) => {
      if (invoice) {
        let idx = this.invoices.findIndex(Obj => Obj.id == invoice.id);
        if (idx > -1)
          this.invoices.splice(idx, 1);
        this.setFilteredItems();
        this.events.unsubscribe('removeInvoiceEvent');
      }
    })
  }

  /**
   * Xem danh sách chứng từ chuyển heo đến trang trại
   */
  viewListForwarding() {
    let callback = (invoice: invoicesPig) => {
      if (invoice) {
        this.invoices.push(invoice);
        this.setFilteredItems();
      }
    }
    this.navCtrl.push(ForwardingPigInvoiceListPage, { callback: callback });
  }


  openFilter() {
    this.menuFilter.enable(true);
    this.menuFilter.open();
  }

  closeFilter() {
    this.menuCtrl.close();
  }


  customAlertOptions: any = {
    translucent: true,
    cssClass: 'ion-alert'
  };

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
}
