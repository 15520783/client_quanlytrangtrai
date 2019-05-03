import { Component, ViewChild, Input } from '@angular/core';
import { Content, NavController, Events } from 'ionic-angular';
import { invoicesPig, } from '../../common/entity';
import { FormControl } from '@angular/forms';
import { FilterProvider } from '../../providers/filter/filter';
import { Utils } from '../../common/utils';
import { InternalPigInvoiceRole } from '../../role-input/internalPigInvoice';
import { InvoicesProvider } from '../../providers/invoices/invoices';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { InvoiceInputUtilComponent } from '../invoice-input-util/invoice-input-util';

@Component({
  selector: 'internal-pig-invoices',
  templateUrl: 'internal-pig-invoices.html'
})
export class InternalPigInvoicesComponent {

  @ViewChild('content') content: Content;
  @Input() invoices: Array<invoicesPig> = [];
  public roleInput: any;

  public mainAttribute = "invoiceNo";
  public attributes =  [
    { name: "sourceName", label: 'Nguồn cung cấp' },
    { name: "destinationName", label: 'Nơi nhận' },
    { name: "importDateDisplay", label: 'Ngày nhập' },
    { name: "quantity", label: 'Tổng số heo' }
  ];
  public placeholderSearch: string = 'Tìm kiếm chứng từ'
  public filter_default: Array<string> = ["invoiceNo", "sourceName", "destinationName", "importDateDisplay", "quantity"];

  public page_Idx: number = 1;
  public page_Total: number = 0;
  public rows: Array<any> = [];

  protected searchControl: FormControl = new FormControl();
  protected searchTerm: string = '';

  public visible_items: Array<any> = [];

  constructor(
    public filterProvider: FilterProvider,
    public invoiceProvider: InvoicesProvider,
    public deployData: DeployDataProvider,
    public util: Utils,
    public navCtrl: NavController,
    public events: Events
  ) {
    this.roleInput = new InternalPigInvoiceRole(deployData, invoiceProvider);
    this.events.subscribe('invoicesReload',()=>{
      console.log(this.invoices);
      this.setFilteredItems();
    })
  }

  ngAfterViewInit(): void {
    let partners_util = this.deployData.get_object_list_key_of_partner();
    let farms_util = this.deployData.get_object_list_key_of_farm();
    if(this.invoices.length){
      this.invoices.forEach((invoice)=>{
        invoice['sourceName'] = partners_util[invoice.sourceId].name;
        invoice['destinationName'] = farms_util[invoice.destinationId].name;
        invoice['importDateDisplay'] = this.util.convertDate(invoice.importDate);
      })
    }
    this.setFilteredItems();
  }



  public setFilteredItems() {
    this.content.scrollToTop().then(() => {
      this.rows = this.filterItems(this.searchTerm);
      this.page_Total = this.rows.length % 50 === 0 ? parseInt(this.rows.length / 50 + '') : parseInt(this.rows.length / 50 + 1 + '');
      this.page_Idx = 1;
      this.visible_items = this.rows.slice(0, 50);
    });
  }

  public filterItems(searchItem) {
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
}
