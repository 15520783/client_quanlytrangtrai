import { Component, ViewChild, Input } from '@angular/core';
import { Content, NavController, Events } from 'ionic-angular';
import { invoicesProduct } from '../../common/entity';
import { FormControl } from '@angular/forms';
import { FilterProvider } from '../../providers/filter/filter';
import { Utils } from '../../common/utils';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { InvoicesProvider } from '../../providers/invoices/invoices';
import { InvoiceInputUtilComponent } from '../invoice-input-util/invoice-input-util';
import { FoodInvoiceRole } from '../../role-input/foodInvoice';
import { FoodInvoiceDetailPage } from '../../pages/food-invoice-detail/food-invoice-detail';

@Component({
  selector: 'food-invoices',
  templateUrl: 'food-invoices.html'
})
export class FoodInvoicesComponent {
  @ViewChild('contentFoodInvoice') content: Content;
  @Input() invoices: Array<invoicesProduct> = [];
  public roleInput: any;


  public mainAttribute = "invoiceNo";
  public attributes = [
    { name: "sourceName", label: 'Nguồn cung cấp' },
    { name: "destinationName", label: 'Nơi nhận' },
    { name: "importDateDisplay", label: 'Ngày nhập' },
    { name: "price", label: 'Tổng giá' }
  ];

  public placeholderSearch: string = 'Tìm kiếm chứng từ'
  public filter_default: Array<string> = ["invoiceNo", "sourceName", "destinationName", "importDateDisplay", "price"];

  public page_Idx: number = 1;
  public page_Total: number = 0;
  public rows: Array<any> = [];

  protected searchControl: FormControl = new FormControl();
  protected searchTerm: string = '';

  public visible_items: Array<any> = [];

  constructor(
    public filterProvider: FilterProvider,
    public util: Utils,
    public navCtrl: NavController,
    public events: Events,
    public deployData: DeployDataProvider,
    public invoiceProvider: InvoicesProvider
  ) {

    this.roleInput = new FoodInvoiceRole(this.deployData, this.invoiceProvider);
    this.events.subscribe('invoicesReload', () => {
      this.setFilteredItems();
    })
  }

  public partners_util = this.deployData.get_object_list_key_of_partner();
  public farms_util = this.deployData.get_object_list_key_of_farm();



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
    })
    this.filterProvider.input = this.invoices;
    this.filterProvider.searchText = searchItem;
    this.filterProvider.searchWithText = this.filter_default;

    this.filterProvider.searchWithRange = {}
    return this.filterProvider.filter();
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
    this.roleInput.clear();
    this.navCtrl.push(InvoiceInputUtilComponent,
      {
        insertMode: true,
        roleInput: this.roleInput
      }
    )

    this.events.subscribe('callback', (data) => {
      if (data) {
        this.invoices.push(data);
        this.setFilteredItems();
        this.events.unsubscribe('callback');
      }
    })
  }

  input_food(item){
    this.navCtrl.push(FoodInvoiceDetailPage,{invoice:item});

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
}
