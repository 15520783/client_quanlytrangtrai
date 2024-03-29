import { Component, Input, ViewChild } from '@angular/core';
import { Content, Events, Menu, MenuController, NavController, NavParams, Platform } from 'ionic-angular';

import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { FilterProvider } from '../../providers/filter/filter';
import { FormControl } from '@angular/forms';
import { InvoiceInputUtilComponent } from '../invoice-input-util/invoice-input-util';
import { InvoicesProvider } from '../../providers/invoices/invoices';
import { MedicineInvoiceDetailPage } from '../../pages/medicine-invoice-detail/medicine-invoice-detail';
import { MedicineInvoiceRole } from '../../role-input/medicineInvoice';
import { UserProvider } from '../../providers/user/user';
import { Utils } from '../../common/utils';
import { VARIABLE } from '../../common/const';
import { invoicesProduct } from '../../common/entity';

@Component({
  selector: 'medicine-invoices',
  templateUrl: 'medicine-invoices.html'
})
export class MedicineInvoicesComponent {
  @ViewChild('menuFilter') menuFilter: Menu;
  @ViewChild('contentMedicineInvoice') content: Content;

  @Input() invoices: Array<invoicesProduct> = [];
  public roleInput: any;


  public mainAttribute = "invoiceNo";
  public attributes = [
    { name: "sourceName", label: 'Nguồn cung cấp' },
    { name: "destinationName", label: 'Nơi nhận' },
    { name: "importDateDisplay", label: 'Ngày nhập' },
    { name: "price", label: 'Tổng giá', unit:' vnd ' },
    { name: "statusName", label: 'Trạng thái', usingBadge: true },
    { name: "createBy", label: 'Người lập' }
  ];

  public placeholderSearch: string = 'Tìm kiếm chứng từ'
  public filter_default: Array<string> = ["invoiceNo", "sourceName", "destinationName", "importDateDisplay", "price", "createBy"];

  public page_Idx: number = 1;
  public page_Total: number = 0;
  public rows: Array<any> = [];

  protected searchControl: FormControl = new FormControl();
  protected searchTerm: string = '';

  public visible_items: Array<any> = [];

  public partners_util;
  public farms_util;

  public sourceFilter: Array<any> = [];
  public destinationFilter: Array<any> = [];

  constructor(
    public platform: Platform,
    public filterProvider: FilterProvider,
    public util: Utils,
    public navCtrl: NavController,
    public events: Events,
    public deployData: DeployDataProvider,
    public invoiceProvider: InvoicesProvider,
    public navParams: NavParams,
    public userProvider: UserProvider,
    public menuCtrl: MenuController,
  ) {
    if (this.navParams.data.invoice) {
      this.invoices = this.navParams.data.invoice;
      this.setFilteredItems();
    }
    this.partners_util = this.deployData.get_object_list_key_of_partner();
    this.farms_util = this.deployData.get_object_list_key_of_farm();
    this.sourceFilter = this.deployData.get_farm_list_for_select();
    this.destinationFilter = this.deployData.get_customer_list_for_select();

    this.roleInput = new MedicineInvoiceRole(this.deployData, this.userProvider, this.invoiceProvider);
    this.events.subscribe('invoicesReload', () => {
      this.setFilteredItems();
    })
  }

  public setFilteredItems() {
    // this.content.scrollToTop().then(() => {
    setTimeout(() => {
      this.rows = this.filterItems(this.searchTerm);
      this.page_Total = this.rows.length % 50 === 0 ? parseInt(this.rows.length / 50 + '') : parseInt(this.rows.length / 50 + 1 + '');
      this.page_Idx = 1;
      this.visible_items = this.rows.slice(0, 50);
      document.getElementById('content').scrollTop = 0;
    }, 200);
    // });
  }

  public filterItems(searchItem) {
    this.invoices.forEach((invoice) => {
      invoice['sourceName'] = this.partners_util[invoice.source.id].name;
      invoice['destinationName'] = this.farms_util[invoice.destination.id].name;
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
    return this.filterProvider.filter().sort((a: invoicesProduct, b: invoicesProduct) =>
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
        this.input_medicine(data);
      }
    }

    this.roleInput.clear();
    this.roleInput.object.invoiceNo = VARIABLE.GENERNAL_INVOICE_ID.MEDICINE_IMPORT + Date.now();
    this.roleInput.object.importDate = new Date().toISOString();

    this.navCtrl.push(InvoiceInputUtilComponent,
      {
        insertMode: true,
        roleInput: this.roleInput,
        callback: callback
      }
    )

  }

  input_medicine(item) {
    let callback = (invoice: invoicesProduct) => {
      if (invoice) {
        let idx = this.invoices.findIndex(_invoice => _invoice.id == invoice.id);
        if (idx > -1) {
          this.invoices[idx] = invoice;
          this.setFilteredItems();
          // this.navCtrl.pop();
        }
      }
    }

    this.navCtrl.push(MedicineInvoiceDetailPage, { invoice: item, callback: callback });

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
