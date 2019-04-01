import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Menu, Content, LoadingController, MenuController, Platform, ModalController } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { PigsProvider } from '../../providers/pigs/pigs';
import { HousesProvider } from '../../providers/houses/houses';
import { pig, house } from '../../common/entity';
import { Utils } from '../../common/utils';
import { KEY } from '../../common/const';
import { VARIABLE } from '../../common/const'
import { PigViewPage } from '../../tabs/pig-view/pig-view';


@IonicPage()
@Component({
  selector: 'page-pigs',
  templateUrl: 'pigs.html',
})
export class PigsPage {

  @ViewChild('menuFilter') menuFilter: Menu;
  @ViewChild('content') content: Content;

  public page_Idx: number = 0;
  public page_Total: number = 0;
  public rows: Array<pig> = [];
  public cols: any = [];
  public filter_default: any = [];
  public dualValue2 = { lower: 0, upper: 500 };

  public genderFilter = [];
  public houseFilter = [];

  filterChange() {
    console.log(this.genderFilter);
  }

  // protected pigs: Array<pig> = [];
  protected searchControl: FormControl = new FormControl();
  protected searchTerm: string = '';
  protected visible_items: Array<pig> = [];
  protected houses: Array<house> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public pigProvider: PigsProvider,
    public houseProvider: HousesProvider,
    public menuCtrl: MenuController,
    public modalCtrl: ModalController,
    public platform: Platform,
    public util: Utils
  ) {
    // this.houseProvider.getAllHouses().then((data: any) => {
    //   this.houses = data;
    // })
  }

  getRender(idx){
    return VARIABLE.gender[idx].name;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PigsPage');
    this.getAllPigs();
  }

  init() {
    this.rows = this.pigProvider.pigs;
    this.page_Total = this.rows.length % 50 === 0 ? parseInt(this.rows.length / 50 + '') : parseInt(this.rows.length / 50 + 1 + '');
    this.visible_items = this.rows.slice(0, 50);

    this.filter_default = ["pig_code", "birthday", "gender", "heath_point"];
    this.filter_default.forEach(e => {
      this.cols.push({
        field: e.toString(),
        value: e.toString()
      })
    })

    this.util.closeLoading().then(() => {
      this.setFilteredItems();
    });
  }

  convertDate(date: any) {
    return this.util.convertDate(date);
  }

  public getAllPigs() {
    this.util.showLoading({
      content: 'Đang tải dữ liệu',
      spinner: 'bubbles',
      cssClass: 'ion-loading'
    });
    this.pigProvider.getPigs()
      .then((data: Array<pig>) => {
        if (data.length) {
          this.util.setKey(KEY.PIGS, data)
            .then(() => {
              this.pigProvider.pigs = data;
              this.init();
            })
            .catch((err) => {
              this.pigProvider.pigs = data;
              console.log('err_storage_pigs', err);
              this.init();
            })
        }
      })
      .catch((err) => {
        console.log('err_pig_provider', err);
        this.util.getKey(KEY.PIGS)
          .then((data: Array<pig>) => {
            this.pigProvider.pigs = data;
            this.init();
          })
          .catch((err) => {
            console.log('err_get_storage_pig', err);
            this.pigProvider.pigs = [];
            this.init();
          })
      })
  }

  public setFilteredItems() {
    this.rows = this.filterItems(this.searchTerm);
    this.page_Idx = 0;
    this.page_Total = this.rows.length % 50 === 0 ? parseInt(this.rows.length / 50 + '') : parseInt(this.rows.length / 50 + 1 + '');
    this.visible_items = this.rows.slice(0, 50);
    this.content.scrollToTop();
  }

  public filterItems(searchItem) {
    this.pigProvider.input = this.pigProvider.pigs;
    this.pigProvider.searchWithInclude.gender = this.genderFilter;
    this.pigProvider.searchWithInclude.house_id = this.houseFilter;
    this.pigProvider.searchText = searchItem;
    this.pigProvider.searchWithText = this.filter_default;
    this.pigProvider.searchWithRange.origin_weight = { min: this.dualValue2.lower, max: this.dualValue2.upper };
    return this.pigProvider.filter();
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
    if (this.page_Idx < this.page_Total) {
      setTimeout(() => {
        this.page_Idx++;
        let start = 50 * this.page_Idx + 1;
        let end = start + 50;
        this.visible_items.push.apply(this.visible_items, this.rows.slice(start, end));
        infiniteScroll.complete();
      }, 500);
    } else {
      infiniteScroll.disabled = true;
    }

  }


  viewDeltail(pig) {
    // this.navCtrl.push(PigViewPage,{data:pig});
    const modal = this.modalCtrl.create(
      PigViewPage, pig, {
        cssClass: 'ion-modal'
      }
    )
    modal.present();
  }


  // scan() {
  //   this.scanner.scan()
  //     .then((result: any) => {
  //       console.log(result);
  //       if (result) {
  //         console.log('result', result);
  //         let idx = this.pigs.findIndex(object => object.pig_code === result.text);
  //         if (idx > -1)
  //           this.viewDeltail(this.pigs[idx]);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log('err scan', err)
  //     })
  // }
}
