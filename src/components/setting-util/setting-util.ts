import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Content, NavController, Events, NavParams } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { FilterProvider } from '../../providers/filter/filter';
import { SettingInputUtilComponent } from '../setting-input-util/setting-input-util';
import { Utils } from '../../common/utils';
import { KEY } from '../../common/const';
import { SettingsProvider } from '../../providers/settings/settings';


@Component({
  selector: 'setting-util',
  templateUrl: 'setting-util.html'
})
export class SettingUtilComponent {

  @ViewChild('contentSetting') content: Content;
  @Input() data: Array<any> = [];
  @Input() selectMode: boolean = false;
  @Input() mainAttribute: string;
  @Input() attributes: Array<{ name: string, label: string }> = [];
  @Input() placeholderSearch: string = ''
  @Input() filter_default: Array<string> = [];
  @Input() addButtonLabel: string = 'Thêm';
  @Input() editButtonLabel: string = 'Sửa';
  @Input() removeButtonLabel: string = 'Xóa';
  @Input() roleInput: any;

  @Input() options: {
    data: Array<any>,
    selectMode: boolean,
    mainAttribute: string,
    attributes: Array<{ name: string, label: string }>,
    placeholderSearch: string,
    filter_default: Array<string>,
    addButtonLabel: string,
    roleInput: any;
  }

  @Output() clickAddButton = new EventEmitter();
  @Output() clickEditButton = new EventEmitter();
  @Output() clickRemoveButton = new EventEmitter();

  public page_Idx: number = 1;
  public page_Total: number = 0;
  public rows: Array<any> = [];

  protected searchControl: FormControl = new FormControl();
  protected searchTerm: string = '';

  public visible_items: Array<any> = [];

  constructor(
    public filterProvider: FilterProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public util: Utils,
    public settingProvider: SettingsProvider
  ) {
    if(this.navParams.data.options){
      this.options = this.navParams.data.options;
    }
  }

  ngAfterViewInit(): void {
    this.init();
  }

  init() {
    this.options.mainAttribute ? this.mainAttribute = this.options.mainAttribute : this.mainAttribute;
    this.options.data.length ? this.data = this.options.data : this.data;
    this.options.placeholderSearch ? this.placeholderSearch = this.options.placeholderSearch : this.placeholderSearch;
    this.options.attributes.length ? this.attributes = this.options.attributes : this.attributes;
    this.options.filter_default.length ? this.filter_default = this.options.filter_default : this.filter_default;
    this.options.addButtonLabel ? this.addButtonLabel = this.options.addButtonLabel : this.addButtonLabel;
    this.options.roleInput ? this.roleInput = this.options.roleInput : this.roleInput;
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

  add() {
    this.roleInput.clear();
    this.navCtrl.push(SettingInputUtilComponent,
      {
        insertMode: true,
        roleInput: this.roleInput
      }
    )

    this.events.subscribe('callback', (data) => {
      if (data) {
        this.data = data;
        this.setFilteredItems();
        this.events.unsubscribe('callback');
      }
    })
  }


  edit(item) {
    this.roleInput.object = item;
    this.navCtrl.push(SettingInputUtilComponent,
      {
        editMode: true,
        roleInput: this.roleInput,
      }
    )
    this.events.subscribe('callback', (data) => {
      if (data) {
        this.data = data;
        this.setFilteredItems();
        this.roleInput.clear();
        this.events.unsubscribe('callback');
      }
    })
  }

  remove(item) {
    this.roleInput.delete(item)
      .then((res: any) => {
        if (res) {
          this.util.getKey(KEY.SETTINGS).then((setting) => {
            if (setting) {
              let idx = setting[this.roleInput.keySettingStorage].findIndex(obj => obj.id == item.id);
              setting[this.roleInput.keySettingStorage].splice(idx, 1);
              this.util.setKey(KEY.SETTINGS, setting).then(() => {
                this.settingProvider.setting = setting;
                this.data = setting[this.roleInput.keySettingStorage];
                this.setFilteredItems();
              })
            }
          })
        }
      })
      .catch((err:Error)=>{})
  }
}
