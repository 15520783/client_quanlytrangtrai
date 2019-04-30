import { Component, ViewChild, Input } from '@angular/core';
import { Content } from 'ionic-angular';
import { invoicesPig } from '../../common/entity';
import { FormControl } from '@angular/forms';
import { FilterProvider } from '../../providers/filter/filter';
import { Utils } from '../../common/utils';

@Component({
  selector: 'internal-pig-invoices',
  templateUrl: 'internal-pig-invoices.html'
})
export class InternalPigInvoicesComponent {

  @ViewChild('content') content: Content;
  @Input() invoices: Array<invoicesPig> = [];
  public mainAttribute = "invoiceNo";
  public attributes =  [
    { name: "sourceManagerName", label: 'Nguồn cung cấp' },
    { name: "destinationManagerName", label: 'Nơi nhận' },
    { name: "exportDate", label: 'Ngày xuất' },
    { name: "quantity", label: 'Tổng số heo' }
  ];
  public placeholderSearch: string = 'Tìm kiếm chứng từ'
  public filter_default: Array<string> = ["invoiceNo", "sourceManagerName","destinationManagerName","exportDate","quantity"];
  
  public page_Idx: number = 1;
  public page_Total: number = 0;
  public rows: Array<any> = [];

  protected searchControl: FormControl = new FormControl();
  protected searchTerm: string = '';

  public visible_items: Array<any> = [];
  
  constructor(
    public filterProvider: FilterProvider,
    public util: Utils,
  ) {
    console.log('Hello InternalPigInvoicesComponent Component');
  }

  ngAfterViewInit(): void {
    this.setFilteredItems();
    console.log(this.invoices);
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
}
