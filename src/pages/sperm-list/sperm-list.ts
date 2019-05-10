import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Backdrop } from 'ionic-angular';
import { sperms } from '../../common/entity';
import { FormControl } from '@angular/forms';
import { FilterProvider } from '../../providers/filter/filter';
import { CONFIG } from '../../common/const';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { Utils } from '../../common/utils';
import { ActivitiesProvider } from '../../providers/activities/activities';
import { SpermInputPage } from '../sperm_input/sperm_input';

@IonicPage()
@Component({
  selector: 'page-sperm-list',
  templateUrl: 'sperm-list.html',
})
export class SpermListPage {

  public sperms: Array<sperms> = [];
  public breed: any = {};
  public houses: any = {};

  public mainAttribute = "breedName";
  public attributes = [
    { name: "pigCode", label: 'Mã heo' },
    { name: "houseName", label: 'Nhà' },
    { name: "dateDisplay", label: 'Ngày lấy tinh' },
    { name: "spermCount", label: 'Số lần lấy' },
    { name: "volume", label: 'Lượng tinh', unit: '(ml)' },
    { name: "doses", label: 'Số liều', unit: '' },
    { name: "used", label: 'Lượng tinh đã dùng', unit: '(ml)' },
    { name: "activity", label: 'Hoạt lực', unit: '%' },
    { name: "c", label: 'Nồng độ', unit: '(Triệu/ml)' },
    { name: "lifeAvg", label: 'Tỉ lệ sống trung bình', unit: '%' },
    { name: "dieAvg", label: 'Tỉ lệ chết trung bình', unit: '%' },
    { name: "faddiness", label: 'Tỉ lệ bất thường', unit: '%' },
  ];

  public placeholderSearch: string = 'Tìm kiếm heo'
  public filter_default: Array<string> = ["breedName", "pigCode"];

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
    public activitiesProvider: ActivitiesProvider,
    public util: Utils
  ) {
    // this.breed = this.deployData.get_object_list_key_of_breeds();
    // this.houses = this.deployData.get_object_list_key_of_house();

    this.getSpermList()
      .then((data) => {
        this.setFilteredItems();
      });
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

    this.filterProvider.input = this.sperms;
    this.filterProvider.searchText = searchItem;
    this.filterProvider.searchWithText = this.filter_default;
    this.filterProvider.searchWithRange = {}
    return this.filterProvider.filter().sort((a: sperms, b: sperms) =>
      (new Date(a.date) > new Date(b.date)) ? -1 : 1
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

  getSpermList() {
    // this.util.showLoading(MESSAGE[CONFIG.LANGUAGE_DEFAULT].LOADING_DATA);
    this.util.openBackDrop();
    return this.activitiesProvider.getAllSperms()
      .then((sperms: Array<sperms>) => {
        if (sperms && sperms.length) {
          this.sperms = sperms;
          this.initialSperms();
        }
        this.util.closeBackDrop();
      })
      .catch((err: Error) => {
        this.util.closeBackDrop();
      })
  }

  initialSperms() {
    this.sperms.forEach((sperm) => {
      sperm['breedName'] = sperm.pig['breed'].name;
      sperm['pigCode'] = sperm.pig.pigCode;
      sperm['houseName'] = sperm.pig['house'].name;
      sperm['dateDisplay'] = this.util.convertDate(sperm.date);
    })
  };


  callback = data => {
    this.activitiesProvider.updateSperm(data)
      .then((updatedSperm: sperms) => {
        if (updatedSperm) {
          let idx = this.sperms.findIndex(_breeding => _breeding.id == updatedSperm.id);
          if (idx > -1) {
            this.sperms[idx] = updatedSperm;
            this.initialSperms();
            this.setFilteredItems();
          }
        }
        this.navCtrl.pop();
      })
      .catch((err: Error) => { })
  };

  edit(sperm: sperms) {
    this.navCtrl.push(SpermInputPage, {
      updateMode: true,
      sperm: sperm,
      callback: this.callback
    })
  }

  remove(sperm: sperms) {
    this.activitiesProvider.deleteSperm(sperm)
      .then((isOK) => {
        if (isOK) {
          this.sperms.splice(
            this.sperms.findIndex(_breeding => _breeding.id == sperm.id), 1
          );
          this.setFilteredItems();
        }
      })
      .catch((err: Error) => { })
  }
}
