import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

import { ActivitiesProvider } from '../../providers/activities/activities';
import { BirthChildDetailPage } from '../birth-child-detail/birth-child-detail';
import { BirthInputPage } from '../birth-input/birth-input';
import { Component } from '@angular/core';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { FilterProvider } from '../../providers/filter/filter';
import { FormControl } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';
import { Utils } from '../../common/utils';
import { births } from '../../common/entity';

@IonicPage()
@Component({
  selector: 'page-birth-list',
  templateUrl: 'birth-list.html',
})
export class BirthListPage {

  public births: Array<births> = [];
  public sectionType: any;
  public farmId: string;

  public mainAttribute = "pigCode";
  public attributes = [
    { name: "breedName", label: 'Giống' },
    { name: "farmName", label: 'Trang trại' },
    { name: "sectionName", label: 'Khu' },
    { name: "houseName", label: 'Nhà' },
    { name: "dateMating", label: 'Ngày phối' },
    { name: "dateBirth", label: 'Ngày sinh' },
    { name: "parities", label: 'Lứa đẻ' },
    { name: "fetalWeight", label: 'Trọng lượng bào thai', unit: '(kg)' },
    { name: "borning", label: 'Số con sinh ra' },
    { name: "dieBeforeBorning", label: 'Chết trong khi sinh' },
    { name: "dieBorning", label: 'Chết khi sinh' },
    { name: "dieBlack", label: 'Chết đen' },
    { name: "defect", label: 'Dị tật' },
    { name: "smallRemove", label: 'Nhỏ loại' },
    { name: "selected", label: 'Chọn nuôi' },
  ];

  public placeholderSearch: string = 'Tìm kiếm ghi nhận heo đẻ'
  public filter_default: Array<string> = ["pigCode", "breedName", "farmName", "sectionName", "houseName", "statusName", "birthdayDisplay", "description"];

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
    public util: Utils,
    public activitiesProvider: ActivitiesProvider,
    public userProvider: UserProvider,
    public deployProvider: DeployDataProvider,
    public platform: Platform
  ) {
    if (this.navParams.data.farmId) {
      this.farmId = this.navParams.data.farmId;
    }

    if (this.navParams.data.sectionType) {
      this.sectionType = this.navParams.data.sectionType;
    }

    if (this.navParams.data.births) {
      this.births = this.navParams.data.births;
      if (this.farmId) {
        this.births = this.births.filter((birth: births) => {
          return birth.mating.mother.house.section.farm.id == this.farmId ? true : false;
        })
      }
      this.setFilteredItems();
    } else {
      this.getBirthList()
        .then((data) => {
          this.setFilteredItems();
        });
    }
  }

  ionViewDidLoad() {
    this.setFilteredItems();
  }

  public setFilteredItems() {
    setTimeout(() => {
      this.rows = this.filterItems(this.searchTerm);
      this.page_Total = this.rows.length % 50 === 0 ? parseInt(this.rows.length / 50 + '') : parseInt(this.rows.length / 50 + 1 + '');
      this.page_Idx = 1;
      this.visible_items = this.rows.slice(0, 50);
      if (document.getElementById('content'))
        document.getElementById('content').scrollTop = 0;
    }, 200);
  }

  public filterItems(searchItem) {
    this.initialBirth();
    this.filterProvider.input = this.births;
    this.filterProvider.searchText = searchItem;
    this.filterProvider.searchWithText = this.filter_default;
    this.filterProvider.searchWithRange = {}
    return this.filterProvider.filter().sort((a: births, b: births) =>
      (new Date(a.createdAt) > new Date(b.createdAt)) ? -1 : 1
    );;
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

  initialBirth() {
    this.births.forEach((birth) => {
      birth['breedName'] = birth.mating.mother.breed.name + ' ' + birth.mating.mother.breed.symbol;
      birth['pigCode'] = birth.mating.mother.pigCode;
      birth['farmName'] = birth.mating.mother.house.section.farm.name;
      birth['sectionName'] = birth.mating.mother.house.section.name;
      birth['houseName'] = birth.mating.mother.house.name;
      birth['dateMating'] = this.util.convertDate(birth.mating.date);
      birth['dateBirth'] = this.util.convertDate(birth.date);
    })
  }

  getBirthList() {
    this.util.openBackDrop();
    return this.activitiesProvider.getAllBirths()
      .then((births: Array<births>) => {
        if (births && births.length) {
          this.births = births;
          if (this.navParams.data.farmId) {
            this.births = this.births.filter((birth: births) => {
              return birth.mating.mother.house.section.farm.id == this.navParams.data.farmId ? true : false;
            })
          }
        }
        this.util.closeBackDrop();
        return births;
      })
      .catch((err: Error) => {
        this.util.closeBackDrop();
      })
  }
  /**
   * Xem danh sách đàn heo con
   * @param item 
   */
  viewDetail(item) {
    let callback = (data:any) =>{
      if(data){
        this.getBirthList()
        .then((data) => {
          this.setFilteredItems();
        });
      }
    }

    this.navCtrl.push(BirthChildDetailPage, { birth: item ,callback:callback});
  }

  /**
   * Cập nhật thông tin heo đẻ
   * @param item 
   */
  edit(item: births) {
    let callback = (birth: births) => {
      if (birth) {
        item = birth;
        this.setFilteredItems();
      }
    }
    this.navCtrl.push(BirthInputPage, {
      birth: item,
      callback: callback,
      updateMode: true
    })
  }
}
