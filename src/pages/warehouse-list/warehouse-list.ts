import { Component, Input, ViewChild } from '@angular/core';
import { Content, IonicPage, ModalController, NavController, NavParams, Platform, ViewController } from 'ionic-angular';
import { house, warehouse } from '../../common/entity';

import { CONFIG } from '../../common/const';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { FilterProvider } from '../../providers/filter/filter';
import { FormControl } from '@angular/forms';
import { MedicineWarehouseInformationPage } from '../medicine-warehouse-information/medicine-warehouse-information';
import { WarehouseInformationPage } from '../warehouse-information/warehouse-information';

@IonicPage()
@Component({
  selector: 'page-warehouse-list',
  templateUrl: 'warehouse-list.html',
})
export class WarehouseListPage {
  @ViewChild('content') content: Content;

  @Input() data: Array<warehouse> = [];
  @Input() selectMode: boolean = false;
  @Input() viewMode: boolean = false;
  @Input() warehouseType: 'food' | 'medicine' = 'food';
  @Input() title: string = 'Danh sách kho';

  @Input() set setData(data) {
    this.data = data;
    this.setFilteredItems();
  }

  public mainAttribute = "name";
  public attributes = [
    { name: "typeName", label: 'Loại kho' },
    { name: "managerName", label: 'Người quản lý' },
    { name: "description", label: 'Mô tả' },
    { name: "farmName", label: 'Trang trại' }
  ];

  public placeholderSearch: string = 'Tìm kiếm thông tin kho'
  public filter_default: Array<string> = ["name", "typeName", "managerName", "description", "houseName", "sectionName", "farmName"];

  public page_Idx: number = 1;
  public page_Total: number = 0;
  public rows: Array<any> = [];

  protected searchControl: FormControl = new FormControl();
  protected searchTerm: string = '';

  public visible_items: Array<any> = [];

  constructor(
    public platform: Platform,
    public navParams: NavParams,
    public filterProvider: FilterProvider,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public deployData: DeployDataProvider
  ) {
    if (this.navParams.data) {
      this.data = this.navParams.data.pigs;
      this.selectMode = this.navParams.data.selectMode;
      this.viewMode = this.navParams.data.viewMode;
    }
  }

  ngAfterViewInit(): void {
    this.setFilteredItems();
  }



  public setFilteredItems() {
    setTimeout(() => {
      this.rows = this.filterItems(this.searchTerm);
      this.page_Total = this.rows.length % CONFIG.PAGE_SITE === 0 ? parseInt(this.rows.length / CONFIG.PAGE_SITE + '') : parseInt(this.rows.length / CONFIG.PAGE_SITE + 1 + '');
      this.page_Idx = 1;
      this.visible_items = this.rows.slice(0, CONFIG.PAGE_SITE);
      if (document.getElementById('content'))
        document.getElementById('content').scrollTop = 0;
    }, 200);
  }

  public filterItems(searchItem) {
    this.data.forEach((warehouse: warehouse) => {
      warehouse['typeName'] = warehouse.type ? warehouse.type.name : '';
      warehouse['managerName'] = warehouse.manager.name;
      warehouse['houseName'] = warehouse.manager.farm.name;
    })
    this.filterProvider.input = this.data;
    this.filterProvider.searchText = searchItem;
    this.filterProvider.searchWithText = this.filter_default;

    return this.filterProvider.filter();
  }

  loadData(infiniteScroll) {
    setTimeout(() => {
      let start = 50 * this.page_Idx + 1;
      let end = start + 50;
      this.page_Idx++;
      this.visible_items.push.apply(this.visible_items, this.rows.slice(start, end));
      infiniteScroll.complete();
    }, 500);
  }

  select(warehouse) {
    if (this.selectMode) {
      this.viewCtrl.dismiss(warehouse);
    } else {
      this.viewDeltail(warehouse);
    }
  }

  viewDeltail(data) {

    if (this.warehouseType == 'food')
      this.navCtrl.push(WarehouseInformationPage, { warehouse: data});
    else
      this.navCtrl.push(MedicineWarehouseInformationPage, { warehouse: data })
  }

  scrollToTop() {
    this.content.scrollToTop();
  }
}
