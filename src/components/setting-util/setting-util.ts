import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Content } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { FilterProvider } from '../../providers/filter/filter';


@Component({
  selector: 'setting-util',
  templateUrl: 'setting-util.html'
})
export class SettingUtilComponent {

  @ViewChild('content') content: Content;
  @Input() data: Array<any> = [];
  @Input() selectMode: boolean = false;
  @Input() mainAttribute: string;
  @Input() attributes: Array<{name:string,label:string}> = [];
  @Input() placeholderSearch: string = ''
  @Input() filter_default: Array<string> = [];
  @Input() addButtonLabel:string = 'Thêm';
  @Input() editButtonLabel:string = 'Sửa';
  @Input() removeButtonLabel:string = 'Xóa';


  @Input() options: {
    data: Array<any>,
    selectMode: boolean,
    mainAttribute: string,
    attributes: Array<{name:string,label:string}>,
    placeholderSearch: string,
    filter_default: Array<string>,
    addButtonLabel:string
  }

  @Output() clickAddButton  = new EventEmitter(); 
  @Output() clickEditButton  = new EventEmitter(); 
  @Output() clickRemoveButton  = new EventEmitter(); 

  public page_Idx: number = 1;
  public page_Total: number = 0;
  public rows: Array<any> = [];

  protected searchControl: FormControl = new FormControl();
  protected searchTerm: string = '';

  public visible_items: Array<any> = [];

  constructor(
    public filterProvider: FilterProvider,
  ) {
    console.log('Hello SettingUtilComponent Component');
  }

  ngAfterViewInit(): void {
    this.options.mainAttribute ? this.mainAttribute = this.options.mainAttribute : this.mainAttribute;
    this.options.data.length ? this.data = this.options.data : this.data;
    this.options.placeholderSearch ? this.placeholderSearch = this.options.placeholderSearch : this.placeholderSearch;
    this.options.attributes.length ? this.attributes = this.options.attributes : this.attributes;
    this.options.filter_default.length ? this.filter_default = this.options.filter_default : this.filter_default;
    this.options.addButtonLabel ? this.addButtonLabel = this.options.addButtonLabel : this.addButtonLabel;
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
    this.filterProvider.input = this.data;
    // this.filterProvider.searchWithInclude.gender = this.genderFilter;/
    // this.filterProvider.searchWithInclude.house_id = this.houseFilter;
    this.filterProvider.searchText = searchItem;
    this.filterProvider.searchWithText = this.filter_default;

    this.filterProvider.searchWithRange = {
      // origin_sum_weight : { min: this.origin_sum_weight.lower, max: this.origin_sum_weight.upper },
      // origin_avg_weight : { min: this.origin_avg_weight.lower, max: this.origin_avg_weight.upper }
    }
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

  add(){
    this.clickAddButton.emit(true);
  }

  edit(item){
    this.clickEditButton.emit({data:item});
  }

  remove(item){
    this.clickRemoveButton.emit({data:item});
  }
}
