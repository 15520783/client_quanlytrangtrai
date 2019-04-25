import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Menu, Content, LoadingController, MenuController, Platform, ModalController } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { PigsProvider } from '../../providers/pigs/pigs';
import { HousesProvider } from '../../providers/houses/houses';
import { pig, house, group } from '../../common/entity';
import { Utils } from '../../common/utils';
import { KEY } from '../../common/const';
import { VARIABLE } from '../../common/const'
import { PigViewPage } from '../../tabs/pig-view/pig-view';
import { FilterProvider } from '../../providers/filter/filter';
import { PigInputPage } from '../pig-input/pig-input';


@IonicPage()
@Component({
  selector: 'page-pigs',
  templateUrl: 'pigs.html',
})
export class PigsPage {

  @ViewChild('menuFilter') menuFilter: Menu;
  @ViewChild('content') content: Content;

  public breeds = {
    1:{name:'Landrace'},
    2:{name:'Landrace'},
    3:{name:'Yorkshire'},
    4:{name:'Yorkshire'},
    5:{name:'Duroc'},
    6:{name:'Duroc'},
    7:{name:'Pietrain'},
    8:{name:'Pietrain'},
    9:{name:'Berkshire'},
    10:{name:'Berkshire'},
    11:{name:'Hamshire'},
    12:{name:'Hamshire'},
    13:{name:'Heo nái VT75'},
    14:{name:'Heo nái VT76'},
    15:{name:'Heo nái VT77'},
    16:{name:'Heo nái VT78'},
    17:{name:'Heo nái VT89'},
    18:{name:'Heo nọc VT37'},
    19:{name:'Heo thịt VT92'},
    20:{name:'CP909'},
    22:{name:'Heo nọc VT47'},
    23:{name:'Heo nọc VT57'},
    24:{name:'Heo nọc VT67'},
  }

  public health_status = {
    1:{name:'Tốt'},
    2:{name:'Vấn đề(chưa rõ)'},
    3:{name:'Vấn đề(chưa rõ)'},
    4:{name:'Vấn đề(chưa rõ)'},
    5:{name:'Ốm'},
    6:{name:'Tái viêm'},
    7:{name:'Xù lông, thở bụng.'},
    8:{name:'Đau chân'},
    9:{name:'Viêm khớp'},
    10:{name:'Ké chân'},
    11:{name:'Đau mắt'},
    12:{name:'Viêm rốn'},
    13:{name:'Sa ruột (Hernia cà)'},
    14:{name:'Thiến sót'},
    15:{name:'Năm móng'},
    16:{name:'không đạt trọng lượng'},
    17:{name:'Ghẻ'},
    19:{name:'Ho'},
    20:{name:'Tiêu chảy'},
    21:{name:'Còi cọc'},
  }
  

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
    public util: Utils
  ) {
    this.houseProvider.getAllHouses()
    .then((data: any) => {
      this.houses = data;
    })
    .catch((err)=>{console.log(err)});

  }

  getRender(idx) {
    return VARIABLE.gender[idx].name;
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter PigsPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PigsPage');
    this.getAllPigs();
  }


  convertDate(date: any) {
    return this.util.convertDate(date);
  }

  public getAllPigs() {
    if (!this.pigProvider.pigs.length) {
      this.util.showLoading('Đang tải dữ liệu');
      this.pigProvider.getPigs()
        .then((data: Array<pig>) => {
          if (data.length) {
            this.util.setKey(KEY.PIGS, data)
              .then(() => {
                this.pigProvider.pigs = data;
                this.util.closeLoading().then(() => {
                  this.setFilteredItems();
                });
              })
              .catch((err) => {
                this.pigProvider.pigs = data;
                console.log('err_storage_pigs', err);
                this.util.closeLoading().then(() => {
                  this.setFilteredItems();
                });
              })
          }
        })
        .catch((err) => {
          console.log('err_pig_provider', err);
          this.util.getKey(KEY.PIGS)
            .then((data: Array<pig>) => {
              this.pigProvider.pigs = data;
              this.util.closeLoading().then(() => {
                this.setFilteredItems();
              });
            })
            .catch((err) => {
              console.log('err_get_storage_pig', err);
              this.pigProvider.pigs = [];
            })
          this.util.showToast('Dữ liệu chưa được cập nhật. Vui lòng kiểm tra kết nối.');
        })
    } else {
      this.rows = this.filterItems(this.searchTerm);
      this.page_Total = this.rows.length % 50 === 0 ? parseInt(this.rows.length / 50 + '') : parseInt(this.rows.length / 50 + 1 + '');
      this.page_Idx = 1;
      this.visible_items = this.rows.slice(0, 50);
    }
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
    this.filterProvider.input = this.pigProvider.pigs;
    this.filterProvider.searchWithInclude.gender = this.genderFilter;
    this.filterProvider.searchWithInclude.house_id = this.houseFilter;
    this.filterProvider.searchText = searchItem;
    this.filterProvider.searchWithText = this.filter_default;
    this.filterProvider.searchWithRange = {
      originWeight : { min: this.dualValue2.lower, max: this.dualValue2.upper }
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
    // this.navCtrl.push(PigViewPage,{data:pig});
    const modal = this.modalCtrl.create(
      PigViewPage, pig, {
        cssClass: 'ion-modal'
      }
    )
    modal.present();
  }

  addNewPig(){
    this.navCtrl.push(PigInputPage);
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
