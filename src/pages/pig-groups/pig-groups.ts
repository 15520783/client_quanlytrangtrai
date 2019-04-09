import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Menu, Platform, MenuController, InfiniteScroll } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { PigGroupsProvider } from '../../providers/pig-groups/pig-groups';
import { Utils } from '../../common/utils';
import { group, house } from '../../common/entity';
import { KEY } from '../../common/const';
import { FilterProvider } from '../../providers/filter/filter';
import { HousesProvider } from '../../providers/houses/houses';

@IonicPage()
@Component({
  selector: 'page-pig-groups',
  templateUrl: 'pig-groups.html',
})
export class PigGroupsPage {
  @ViewChild('menuFilter') menuFilter: Menu;
  @ViewChild('content') content: Content;

  customAlertOptions: any = {
    translucent: true,
    cssClass: 'ion-alert'
  };

  public page_Idx: number = 1;
  public page_Total: number = 0;
  public rows: Array<group> = [];
  public cols: any = [];
  public filter_default: any = ["group_code", "avg_birthday", "quantity", "health_status", "origin_avg_weight", "origin_sum_weight"];
  protected visible_items: Array<group> = [];
  protected houses: Array<house> = [];

  public origin_sum_weight = { lower: 0, upper: 1000 };
  public origin_avg_weight = { lower: 0, upper: 7 };

  public genderFilter = [];
  public houseFilter = [];

  protected searchControl: FormControl = new FormControl();
  protected searchTerm: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public pigGroupProvider: PigGroupsProvider,
    public filterProvider: FilterProvider,
    public houseProvider: HousesProvider,
    public util: Utils,
    public platform: Platform,
    public menuCtrl: MenuController
  ) {
    this.houseProvider.getAllHouses().then((data: Array<house>) => {
      this.houses = data;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PigGroupsPage');
    this.getAllGroups();
  }


  ionViewWillEnter() {
    console.log('ionViewWillEnter PigGroupsPage');
  }

  public getAllGroups() {
    if (!this.pigGroupProvider.groups.length) {
      this.util.showLoading('Đang tải dữ liệu');
      this.pigGroupProvider.getAllGroups()
        .then((data: Array<group>) => {
          if (data.length) {
            this.util.setKey(KEY.GROUPS, data)
              .then(() => {
                this.pigGroupProvider.groups = data;
                this.util.closeLoading().then(() => {
                  this.setFilteredItems();
                });
              })
              .catch((err) => {
                this.pigGroupProvider.groups = data;
                console.log('err_storage_pigs', err);
                this.util.closeLoading().then(() => {
                  this.setFilteredItems();
                });
              })
          }
        })
        .catch((err) => {
          console.log('err_pig_provider', err);
          this.util.getKey(KEY.GROUPS)
            .then((data: Array<group>) => {
              this.pigGroupProvider.groups = data;
              this.util.closeLoading().then(() => {
                this.setFilteredItems();
              });
            })
            .catch((err) => {
              console.log('err_get_storage_pig', err);
              this.pigGroupProvider.groups = [];
            })
          this.util.showToast('Dữ liệu chưa được cập nhật. Vui lòng kiểm tra kết nối.');
        })
    } else {
      this.setFilteredItems();
    }
  }

  public setFilteredItems() {
    this.content.scrollToTop().then(()=>{
      this.rows = this.filterItems(this.searchTerm);
      this.page_Total = this.rows.length % 50 === 0 ? parseInt(this.rows.length / 50 + '') : parseInt(this.rows.length / 50 + 1 + '');
      this.page_Idx = 1;
      this.visible_items = this.rows.slice(0, 50);
    });
  }

  public filterItems(searchItem) {
    this.filterProvider.input = this.pigGroupProvider.groups;
    this.filterProvider.searchWithInclude.gender = this.genderFilter;
    this.filterProvider.searchWithInclude.house_id = this.houseFilter;
    this.filterProvider.searchText = searchItem;
    this.filterProvider.searchWithText = this.filter_default;

    this.filterProvider.searchWithRange = {
      origin_sum_weight : { min: this.origin_sum_weight.lower, max: this.origin_sum_weight.upper },
      origin_avg_weight : { min: this.origin_avg_weight.lower, max: this.origin_avg_weight.upper }
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

  openFilter() {
    this.menuFilter.enable(true);
    this.menuFilter.open();
  }

  closeFilter() {
    this.menuCtrl.close();
  }
}
