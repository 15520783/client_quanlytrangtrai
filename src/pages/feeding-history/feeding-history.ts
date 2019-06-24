import { CONFIG, MESSAGE } from '../../common/const';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { feeds, foodWareHouse } from '../../common/entity';

import { Component } from '@angular/core';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { FilterProvider } from '../../providers/filter/filter';
import { FormControl } from '@angular/forms';
import { Utils } from '../../common/utils';
import { WarehousesProvider } from '../../providers/warehouses/warehouses';

@IonicPage()
@Component({
  selector: 'page-feeding-history',
  templateUrl: 'feeding-history.html',
})
export class FeedingHistoryPage {

  public foodWarehouse:foodWareHouse = new foodWareHouse();
  public feeds: Array<feeds> = [];

  public mainAttribute = "pigCode";
  public attributes = [
    { name: "pigCode", label: 'Mã heo' },
    { name: "farmName", label: 'Trang trại' },
    { name: "sectionName", label: 'Khu' },
    { name: "houseName", label: 'Nhà' },
    { name: "dateDisplay", label: 'Ngày cho ăn' },
    { name: "foodName", label: 'Tên cám' },
    { name: "quantity", label: 'Khối lượng' },
    { name: "unitName", label: 'Đơn vị' },
    { name: "employeeName", label: 'Người xuất cám' },
    { name: "description", label: 'Mô tả' },
  ];

  public placeholderSearch: string = 'Tìm kiếm ghi nhận sử dụng cám'
  public filter_default: Array<string> = ["pigCode"];

  public page_Idx: number = 1;
  public page_Total: number = 0;
  public rows: Array<any> = [];

  protected searchControl: FormControl = new FormControl();
  protected searchTerm: string = '';

  public visible_items: Array<any> = [];
  public unit_util:any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public warehouseProvider:WarehousesProvider,
    public util:Utils,
    public filterProvider: FilterProvider,
    public deployData:DeployDataProvider,
    public platform:Platform
  ) {
    this.unit_util = this.deployData.get_object_list_key_of_foodUnit();

    if(this.navParams.data.foodWareHouse){
      this.foodWarehouse = this.navParams.data.foodWareHouse;
    }

    this.getAllFeeds();
  }

  ionViewDidLoad() {

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
    let feeds = this.util.deepClone(this.feeds);
    feeds.forEach((feed:feeds) => {
      feed['pigCode'] = feed.pig.pigCode;
      feed['farmName'] = feed.pig.house.section.farm.name;
      feed['sectionName'] = feed.pig.house.section.name;
      feed['houseName'] = feed.pig.house.name;
      feed['dateDisplay'] = this.util.convertDate(feed.date);
      feed['foodName'] = feed.foodWarehouse.food.name;
      feed['unitName'] = this.unit_util[feed.unit].name;
      feed['employeeName'] = feed.employee.name;
    });
    this.filterProvider.input = feeds;
    this.filterProvider.searchText = searchItem;
    this.filterProvider.searchWithText = this.filter_default;
    this.filterProvider.searchWithRange = {};
    return this.filterProvider.filter().sort((a: feeds, b: feeds) =>
      (new Date(a.createdAt) > new Date(b.createdAt)) ? -1 : 1
    );
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

  getAllFeeds(){
    this.util.openBackDrop();
    this.warehouseProvider.getAllFeedSOfFoodWarehouse(this.foodWarehouse.id)
    .then((feeds:Array<feeds>)=>{
      if(feeds && feeds.length){
        this.feeds = feeds;
        this.setFilteredItems();
      }
      this.util.closeBackDrop();
    })
    .catch((err)=>{
      console.log(err);
      this.util.closeBackDrop();
      this.util.showToast(MESSAGE.vi.ERROR_OCCUR);
    })
  }

  
}
