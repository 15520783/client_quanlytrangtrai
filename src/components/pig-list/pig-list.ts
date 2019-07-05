import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Content, ModalController, NavController, NavParams, Platform, ViewController } from 'ionic-angular';
import { house, pig } from '../../common/entity';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { FilterProvider } from '../../providers/filter/filter';
import { FormControl } from '@angular/forms';
import { HousesProvider } from '../../providers/houses/houses';
import { PigViewPage } from '../../tabs/pig-view/pig-view';
import { Utils } from '../../common/utils';
import { VARIABLE } from '../../common/const';

@Component({
  selector: 'pig-list',
  templateUrl: 'pig-list.html'
})
export class PigListComponent {

  @ViewChild('content') content: Content;

  @Output() closeMenuEvent = new EventEmitter();
  @Input() title: string = '';
  @Input() data: Array<pig> = [];
  @Input() selectMode: boolean = false;
  @Input() viewMode: boolean = false;
  @Input() canEdit: boolean = false;
  @Input() FooterButtons: Array<{
    label: string,
    color: string,
    callback: any
  }> = [];

  public houses_util: any = {};

  showFilter = false;
  public page_Idx: number = 1;
  public page_Total: number = 0;
  public rows: Array<pig> = [];
  public cols: any = [];
  public filter_default: any = ["pigCode", "birthday", "gender", "healthPoint", "originWeight"];
  public dualValue2 = { lower: 0, upper: 500 };

  public genderFilter = [];
  public houseFilter = [];

  public genders: any;
  public breeds: any = {};

  customAlertOptions: any = {
    translucent: true,
    cssClass: 'ion-alert'
  };

  protected searchControl: FormControl = new FormControl();
  protected searchTerm: string = '';
  protected visible_items: Array<pig> = [];
  protected houses: Array<house> = [];
  protected statusPig: any = {};

  constructor(
    public platform: Platform,
    public houseProvider: HousesProvider,
    public navParams: NavParams,
    public filterProvider: FilterProvider,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public deployData: DeployDataProvider,
    public util: Utils,
    public scanner: BarcodeScanner
  ) {
    this.houses_util = this.deployData.get_object_list_key_of_house();
    this.genders = VARIABLE.GENDER;
    this.breeds = this.deployData.get_object_list_key_of_breeds();
    this.statusPig = this.deployData.get_object_list_key_of_status();

    if (this.navParams.data) {
      this.data = this.navParams.data.pigs;
      this.selectMode = this.navParams.data.selectMode;
      this.viewMode = this.navParams.data.viewMode;
    }
    if (this.navParams.data.FooterButtons) {
      this.FooterButtons = this.navParams.data.FooterButtons;
    }
    if (this.navParams.data.canEdit) {
      this.canEdit = this.navParams.data.canEdit;
    }

    if (this.navParams.data.title) {
      this.title = this.navParams.data.title;
    }

    this.houses = this.houseProvider.houses;
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
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
    this.filterProvider.searchWithInclude.gender = this.genderFilter;
    this.filterProvider.searchWithInclude.house_id = this.houseFilter;
    this.filterProvider.searchText = searchItem;
    this.filterProvider.searchWithText = this.filter_default;
    this.filterProvider.searchWithRange = {
      originWeight: { min: this.dualValue2.lower, max: this.dualValue2.upper }
    }
    return this.filterProvider.filter().sort((a:pig,b:pig)=>{
      return a.id > b.id ? -1 : 1;
    });
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

  select(pig) {
    if (this.selectMode) {
      this.viewCtrl.dismiss(pig);
    } else if (!this.viewMode) {
      this.viewDeltail(pig);
    }
  }


  viewDeltail(pig) {
    this.navCtrl.push(PigViewPage, { data: pig });
  }

  scrollToTop() {
    this.content.scrollToTop();
  }

  closeMenu() {
    this.closeMenuEvent.emit({ close: true });
  }


  changeActivePig(item) {
    item.notActive = !item.notActive;
    let idx = this.data.findIndex(_pig => _pig.id == item.id);
    if (idx > -1) {
      this.data['notActive'] = item.notActive;
    }
  }

  scan() {
    if (this.platform.is('android') || this.platform.is('ios')) {
      this.scanner.scan()
        .then((result: any) => {
          if (result.text) {
            this.util.openBackDrop();
            let target = JSON.parse(result.text);
            if (target.type == VARIABLE.OBJECT_BARCODE_TYPE.PIG) {
              let idx = this.data.findIndex(pig => pig.pigCode == target.id);
              if (idx > -1) {
                this.visible_items = [this.data[idx]];
                this.select(this.data[idx]);
              } else {
                this.util.showToastInform('Không tìm thấy đối tượng');
              }
              this.util.closeBackDrop();
            } else {
              this.util.closeBackDrop();
              this.util.showToastInform('Không tìm thấy đối tượng');
            }
          } else {
            this.util.showToastInform('Không tìm thấy đối tượng');
          }
        })
        .catch((err: Error) => {
          console.log(err);
          // this.util.closeBackDrop();
          this.util.showToastInform('Không tìm thấy đối tượng');
        })
    }
  }
}
