import { IonicPage, MenuController, NavController, NavParams, Platform, ViewController } from 'ionic-angular';

import { CONFIG } from '../../common/const';
import { Component } from '@angular/core';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { FilterProvider } from '../../providers/filter/filter';
import { FormControl } from '@angular/forms';
import { SettingsProvider } from '../../providers/settings/settings';
import { Utils } from '../../common/utils';
import { medicines } from '../../common/entity';

@IonicPage()
@Component({
  selector: 'page-medicine-list',
  templateUrl: 'medicine-list.html',
})
export class MedicineListPage {

  public isSelectMode: boolean = false;

  public medicines: Array<medicines> = [];

  public sectionType: any = {};


  public mainAttribute = "name";
  public attributes = [
    { name: "medicineCode", label: 'Mã thuốc' },
    { name: "typeName", label: 'Loại thuốc' },
    { name: "name", label: 'Tên thuốc' },
    { name: "useFor", label: 'Tác dụng' },
    { name: "guide", label: 'Hướng dẫn' },
    { name: "description", label: 'Mô tả' }
  ];

  public placeholderSearch: string = 'Tìm kiếm bệnh'
  public filter_default: Array<string> = ["medicineCode", "typeName", "name", "useFor", "guide", "description"];

  public page_Idx: number = 1;
  public page_Total: number = 0;
  public rows: Array<any> = [];

  protected searchControl: FormControl = new FormControl();
  protected searchTerm: string = '';

  public visible_items: Array<any> = [];


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public filterProvider: FilterProvider,
    public deployData: DeployDataProvider,
    public util: Utils,
    public menuCtrl: MenuController,
    public viewCtrl: ViewController,
    public platform: Platform,
    public settingProvider: SettingsProvider,
  ) {
    if (this.navParams.data.selectMode) {
      this.isSelectMode = true;
    }
    if (this.navParams.data.medicines) {
      this.medicines = this.navParams.data.medicines;
    }
  }

  ionViewDidLoad() {
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
    this.filterProvider.input = this.medicines;
    this.filterProvider.searchText = searchItem;
    this.filterProvider.searchWithText = this.filter_default;
    this.filterProvider.searchWithRange = {}
    return this.filterProvider.filter().sort((a, b) => {
      return a.advised > b.advised ? -1 : 1;
    });
  }

  loadData(infiniteScroll) {
    setTimeout(() => {
      let start = CONFIG.PAGE_SITE * this.page_Idx + 1;
      let end = start + CONFIG.PAGE_SITE;
      this.page_Idx++;

      this.visible_items.push.apply(this.visible_items, this.rows.slice(start, end));
      infiniteScroll.complete();
    }, CONFIG.LOADING_MORE_TIME);
  }

  select(item) {
    if (this.isSelectMode) {
      if (!item.used)
        this.viewCtrl.dismiss(item);
    }
  }
}
