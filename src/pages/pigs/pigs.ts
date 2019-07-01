import { CONFIG, KEY, MESSAGE } from '../../common/const';
import { Component, ViewChild } from '@angular/core';
import { Content, Events, IonicPage, LoadingController, Menu, MenuController, ModalController, NavController, NavParams, Platform } from 'ionic-angular';
import { house, pig } from '../../common/entity';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { FilterProvider } from '../../providers/filter/filter';
import { FormControl } from '@angular/forms';
import { HousesProvider } from '../../providers/houses/houses';
import { PigInputPage } from '../pig-input/pig-input';
import { PigSummaryPage } from '../pig-summary/pig-summary';
import { PigsProvider } from '../../providers/pigs/pigs';
import { UserProvider } from '../../providers/user/user';
import { Utils } from '../../common/utils';
import { VARIABLE } from '../../common/const'

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
  public farmFilters: Array<any> = [];

  public page_Idx: number = 1;
  public page_Total: number = 0;
  public rows: Array<pig> = [];
  public cols: any = [];
  public filter_default: any = ["pigCode", "birthday", "gender", "healthPoint", "originWeight", "breedName"];
  public dualValue2 = { lower: 0, upper: 500 };

  public genderFilter = [];
  public houseFilter = [];
  public farmFilter = [];
  public sectionFilter = [];

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
    public events: Events,
    public userProvider: UserProvider
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

    this.farmFilters = this.deployData.get_farm_list_for_select();
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
            })
        }
        this.util.closeBackDrop();
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
    pigs.forEach(pig => {
      if (!this.house[pig.houseId]) {
        console.log(pig);
      }
      pig.farmId = this.house[pig.houseId] ? this.house[pig.houseId].section.farm.id : '';
      pig.sectionId = this.house[pig.houseId] ? this.house[pig.houseId].section.id : '';
      pig.breedName = this.breeds[pig.breedId] ? this.breeds[pig.breedId].name + ' ' + this.breeds[pig.breedId].symbol : '';
    });
    this.filterProvider.input = pigs;
    this.filterProvider.searchWithInclude.gender = this.genderFilter;
    this.filterProvider.searchWithInclude.farmId = this.farmFilter;
    this.filterProvider.searchWithInclude.sectionId = this.sectionFilter;
    this.filterProvider.searchWithInclude.houseId = this.houseFilter;
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
    let callbackUpdate = (pig: pig) => {
      if (pig) {
        console.log(pig);
        this.setFilteredItems();
      }
    }

    let callbackRemove = (pig: pig) => {
      if (pig) {
        this.setFilteredItems();
        this.navCtrl.pop();
      }
    }

    if (this.userProvider.rolePermission.ROLE_xem_thong_tin_heo != null) {
      this.navCtrl.push(PigSummaryPage, { pig: pig, callbackUpdate: callbackUpdate, callbackRemove: callbackRemove });
    }
  }

  /**
   * Tạo mới heo
   */
  addNewPig() {
    let callback = (pig: pig) => {
      if (pig) {
        let idx = this.pigProvider.pigs.findIndex(_pig => _pig.pigCode == pig.pigCode);
        if (idx > -1) {
          this.util.showToast('Số tai heo đã tồn tại trong hệ thống. Vui lòng kiểm tra lại')
        } else {
          let pigParam = this.deployData.get_pig_object_to_send_request(pig);
          this.pigProvider.createPig(pigParam)
            .then((newPig: pig) => {
              if (newPig) {
                this.pigProvider.updatedPig(newPig);
                this.setFilteredItems();
              }
              this.navCtrl.pop();
            })
            .catch((err) => {
              console.log(err);
              return err;
            })
        }
      }
    }
    this.navCtrl.push(PigInputPage, { callback: callback });
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
                  });
                } else {
                  this.util.showToastInform('Không tìm thấy đối tượng');
                }
                this.util.closeBackDrop();
              })
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
          this.util.showToastInform('Không tìm thấy đối tượng');
        })
    }
  }

  sync() {
    this.events.publish('sync', true);
  }

  public filterSections: Array<any> = [];
  public filterHouses: Array<any> = [];

  filterFarm(farmId) {
    this.filterSections = this.deployData.get_sections_of_farm(farmId);
    this.filterSections.forEach((e) => {
      e['value'] = e.id;
    })
    this.farmFilter = farmId ? [farmId] : [];
    this.sectionFilter = [];
    this.houseFilter = [];
    this.setFilteredItems();
  }

  filterSection(sectionId) {
    this.filterHouses = this.deployData.get_houses_of_section(sectionId);
    this.filterHouses.forEach((e) => {
      e['value'] = e.id;
    })
    this.sectionFilter = sectionId ? [sectionId] : [];
    this.houseFilter = [];
    this.setFilteredItems();
  }

  filterHouse(houseId) {
    this.houseFilter = houseId ? [houseId] : [];
    this.setFilteredItems();
  }

  // filterFarm(farmId) {
  //   if (farmId)
  //     this.filterProvider.searchWithInclude.farmId = [farmId];
  //   else
  //     this.filterProvider.searchWithInclude.farmId = [];
  //   this.setFilteredItems();
  // }
}
