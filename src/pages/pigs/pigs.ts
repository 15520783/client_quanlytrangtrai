import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Menu, Content, LoadingController, MenuController, Platform, ModalController, Events } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { PigsProvider } from '../../providers/pigs/pigs';
import { HousesProvider } from '../../providers/houses/houses';
import { pig, house } from '../../common/entity';
import { Utils } from '../../common/utils';
import { KEY, MESSAGE, CONFIG } from '../../common/const';
import { VARIABLE } from '../../common/const'
import { FilterProvider } from '../../providers/filter/filter';
import { PigInputPage } from '../pig-input/pig-input';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { PigSummaryPage } from '../pig-summary/pig-summary';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';


@IonicPage()
@Component({
  selector: 'page-pigs',
  templateUrl: 'pigs.html',
})
export class PigsPage {

  @ViewChild('menuFilter') menuFilter: Menu;
  @ViewChild('content') content: Content;

  public house = {};
  public breeds = {};
  public health_status = {};
  public status = {};
  public gender: any = [];


  public page_Idx: number = 1;
  public page_Total: number = 0;
  public rows: Array<pig> = [];
  public cols: any = [];
  public filter_default: any = ["pigCode", "birthday", "gender", "healthPoint", "originWeight"];
  public dualValue2 = { lower: 0, upper: 500 };

  public genderFilter = [];
  public houseFilter = [];

  protected searchControl: FormControl = new FormControl();
  protected searchTerm: string = '';
  protected visible_items: Array<pig> = [];
  protected houses: Array<house> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public pigProvider: PigsProvider,
    public filterProvider: FilterProvider,
    public houseProvider: HousesProvider,
    public menuCtrl: MenuController,
    public modalCtrl: ModalController,
    public platform: Platform,
    public util: Utils,
    public deployData: DeployDataProvider,
    public scanner: BarcodeScanner,
    public events: Events
  ) {
    this.init();
    this.houseProvider.getAllHouses()
      .then((data: any) => {
        this.houses = data;
      })
      .catch((err) => { console.log(err) });
  }

  init() {
    this.breeds = this.deployData.get_object_list_key_of_breeds();
    this.health_status = this.deployData.get_object_list_key_of_healthStatus();
    this.house = this.deployData.get_object_list_key_of_house();
    this.status = this.deployData.get_object_list_key_of_status();
    this.gender = VARIABLE.gender;
  }

  getRender(idx) {
    return VARIABLE.gender[idx].name;
  }

  ionViewDidLoad() {
    this.getAllPigs();
  }

  convertDate(date: any) {
    return this.util.convertDate(date);
  }

  public getAllPigs() {
    // if (!this.pigProvider.pigs.length) {
    this.util.openBackDrop();
    this.pigProvider.getPigs()
      .then((data: Array<pig>) => {
        if (data.length) {
          this.util.setKey(KEY.PIGS, data)
            .then(() => {
              this.pigProvider.pigs = data;
              this.setFilteredItems();
              this.util.closeBackDrop();
            })
        }
      })
      .catch((err) => {
        console.log('err_pig_provider', err);
        this.util.getKey(KEY.PIGS)
          .then((data: Array<pig>) => {
            if (data) {
              this.pigProvider.pigs = data;
            } else {
              this.pigProvider.pigs = [];
            }
            this.util.closeBackDrop().then(() => {
              this.setFilteredItems();
            });
          })
        this.util.showToast(MESSAGE[CONFIG.LANGUAGE_DEFAULT].ERROR_OCCUR);
      })
    // } else {
    //   this.rows = this.filterItems(this.searchTerm);
    //   this.page_Total = this.rows.length % 50 === 0 ? parseInt(this.rows.length / 50 + '') : parseInt(this.rows.length / 50 + 1 + '');
    //   this.page_Idx = 1;
    //   this.visible_items = this.rows.slice(0, 50);
    // }
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
    let pigs = this.util.deepClone(this.pigProvider.pigs);
    this.filterProvider.input = pigs;
    this.filterProvider.searchWithInclude.gender = this.genderFilter;
    this.filterProvider.searchWithInclude.house_id = this.houseFilter;
    this.filterProvider.searchText = searchItem;
    this.filterProvider.searchWithText = this.filter_default;
    this.filterProvider.searchWithRange = {
      originWeight: { min: this.dualValue2.lower, max: this.dualValue2.upper }
    }
    return this.filterProvider.filter();
  }


  openFilter() {
    this.menuFilter.enable(true);
    this.menuFilter.open();
  }

  closeFilter() {
    this.menuCtrl.close();
  }

  customAlertOptions: any = {
    translucent: true,
    cssClass: 'ion-alert'
  };

  loadData(infiniteScroll) {
    setTimeout(() => {
      let start = 50 * this.page_Idx + 1;
      let end = start + 50;
      this.page_Idx++;
      this.visible_items.push.apply(this.visible_items, this.rows.slice(start, end));
      infiniteScroll.complete();
    }, 500);
  }


  viewDeltail(pig) {
    this.navCtrl.push(PigSummaryPage, { pig: pig });
  }

  addNewPig() {
    this.navCtrl.push(PigInputPage);
  }


  scan() {
    if (this.platform.is('android') || this.platform.is('ios')) {
      this.scanner.scan()
        .then((result: any) => {
          if (result.text) {
            this.util.openBackDrop();
            let target = JSON.parse(result.text);
            if (target.type == VARIABLE.OBJECT_BARCODE_TYPE.PIG) {
              this.util.getKey(KEY.PIGS).then((pigs: Array<pig>) => {
                let idx = pigs.findIndex(pig => pig.pigCode == target.id);
                if (idx > -1) {
                  this.navCtrl.push(PigSummaryPage, { pig: pigs[idx] }).then(() => {
                    this.util.closeBackDrop();
                  });
                } else {
                  this.util.showToastInform('Không tìm thấy đối tượng');
                }
              })
            } else {
              this.util.showToastInform('Không tìm thấy đối tượng');
            }
          } else {
            this.util.showToastInform('Không tìm thấy đối tượng');
          }
        })
        .catch((err: Error) => {
          console.log(err);
          this.util.closeBackDrop();
          this.util.showToastInform('Không tìm thấy đối tượng');
        })
    }
  }

  sync() {
    this.events.publish('sync', true);
  }
}
