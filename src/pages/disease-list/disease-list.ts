import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  MenuController, ViewController, Platform } from 'ionic-angular';
import { diseases } from '../../common/entity';
import { FormControl } from '@angular/forms';
import { FilterProvider } from '../../providers/filter/filter';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { Utils } from '../../common/utils';
import { CONFIG } from '../../common/const';
import { SettingsProvider } from '../../providers/settings/settings';


@IonicPage()
@Component({
  selector: 'page-disease-list',
  templateUrl: 'disease-list.html',
})
export class DiseaseListPage {

  public isSelectMode: boolean = false;

  public diseases: Array<diseases> = [];

  public sectionType: any = {};

  public titleHeader:string;

  public mainAttribute = "name";
  public attributes = [
    { name: "agent", label: 'Tác nhân' },
    { name: "symptom", label: 'Triệu chứng' },
    { name: "diagnose", label: 'Chuẩn đoán' },
    { name: "treatment", label: 'Điều trị' },
    { name: "note", label: 'Ghi chú' },
    { name: "description", label: 'Mô tả' },
    { name: "tiLe", label: 'Tỷ lệ' }
  ];

  public placeholderSearch: string = 'Tìm kiếm bệnh'
  public filter_default: Array<string> = ["name", "agent", "symptom", "diagnose", "treatment", "note", "description", 'tiLe'];

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
    if(this.navParams.data.titleHeader){
      this.titleHeader = this.navParams.data.titleHeader;
    }

    if (this.navParams.data.selectMode) {
      this.isSelectMode = true;
    }
    if (this.navParams.data.diseases) {
      this.diseases = this.navParams.data.diseases;
    }
  }

  select(item) {
    if (this.isSelectMode) {
      this.viewCtrl.dismiss(item);
    }
  }

  ionViewDidLoad() {
    this.setFilteredItems();
  }

  public setFilteredItems() {
    setTimeout(() => {
      this.rows = this.filterItems(this.searchTerm);
      console.log(this.filterItems(this.searchTerm));
      this.page_Total = this.rows.length % CONFIG.PAGE_SITE === 0 ? parseInt(this.rows.length / CONFIG.PAGE_SITE + '') : parseInt(this.rows.length / CONFIG.PAGE_SITE + 1 + '');
      this.page_Idx = 1;
      this.visible_items = this.rows.slice(0, CONFIG.PAGE_SITE);
      if (document.getElementById('content'))
        document.getElementById('content').scrollTop = 0;
    }, 200);
  }


  public filterItems(searchItem) {
    this.filterProvider.input = this.diseases;
    this.filterProvider.searchText = searchItem;
    this.filterProvider.searchWithText = this.filter_default;
    this.filterProvider.searchWithRange = {}
    return this.filterProvider.filter().sort((a, b) => {
      return a.tiLe > b.tiLe ? -1 : 1;
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

  
}
