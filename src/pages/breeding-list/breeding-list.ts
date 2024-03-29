import { Events, IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { breedings, mating, matingDetails } from '../../common/entity';

import { ActivitiesProvider } from '../../providers/activities/activities';
import { BreedingInputPage } from '../breeding-input/breeding-input';
import { Component } from '@angular/core';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { FilterProvider } from '../../providers/filter/filter';
import { FormControl } from '@angular/forms';
import { MatingInputPage } from '../mating-input/mating-input';
import { PigsProvider } from '../../providers/pigs/pigs';
import { UserProvider } from '../../providers/user/user';
import { Utils } from '../../common/utils';
import { VARIABLE } from '../../common/const';

@IonicPage()
@Component({
  selector: 'page-breeding-list',
  templateUrl: 'breeding-list.html',
})
export class BreedingListPage {
  public viewMode: boolean = false;
  public breedings: Array<breedings> = [];
  public breedingTypes: any = {};
  public sectionType: any;

  public mainAttribute = "pigCode";
  public attributes = [
    { name: "breedName", label: 'Giống' },
    { name: "farmName", label: 'Trang trại' },
    { name: "sectionName", label: 'Khu' },
    { name: "houseName", label: 'Nhà' },
    { name: "dateDisplay", label: 'Ngày lên giống' },
    { name: "statusName", label: 'Hiện trạng' },
    { name: "breedingCount", label: 'Lần lên giống' },
    { name: "typeBreedingName", label: 'Loại lên giống' },
    { name: "breedingNextDisplay", label: 'Ngày lên giống tiếp theo' },
    { name: "matingEstimateDisplay", label: 'Dự kiến phối' },
    { name: "matingRealDisplay", label: 'Ngày phối thực tế' },
    { name: "description", label: 'Ghi chú' },
  ];

  public placeholderSearch: string = 'Tìm kiếm ghi nhận lên giống'
  public filter_default: Array<string> = ["pigCode", "breedName", "farmName", "sectionName", "houseName", "statusName", "birthdayDisplay", "description"];

  public page_Idx: number = 1;
  public page_Total: number = 0;
  public rows: Array<any> = [];

  protected searchControl: FormControl = new FormControl();
  protected searchTerm: string = '';

  public visible_items: Array<any> = [];

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public filterProvider: FilterProvider,
    public deployData: DeployDataProvider,
    public activitiesProvider: ActivitiesProvider,
    public userProvider: UserProvider,
    public events: Events,
    public pigProvider: PigsProvider,
    public util: Utils) {
    console.log(this.navParams.data);
    this.breedingTypes = this.deployData.get_object_list_key_of_breedingTypes();
    if (this.navParams.data.sectionType) {
      this.sectionType = this.navParams.data.sectionType;
    }
    if (this.navParams.data.viewMode) {
      this.viewMode = true;
    }

    if (this.navParams.data.breedings) {
      this.breedings = this.navParams.data.breedings;
      if (this.navParams.data.farmId) {
        this.breedings = this.breedings.filter((breeding: breedings) => {
          return breeding.pig.house.section.farm.id == this.navParams.data.farmId ? true : false;
        })
      }
      this.setFilteredItems();
    } else {
      this.getBreedingList()
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
    this.initialBreedings();
    this.filterProvider.input = this.breedings;
    this.filterProvider.searchText = searchItem;
    this.filterProvider.searchWithText = this.filter_default;
    this.filterProvider.searchWithRange = {}
    return this.filterProvider.filter().sort((a: breedings, b: breedings) =>
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

  getBreedingList() {
    this.util.openBackDrop();
    return this.activitiesProvider.getAllBreedings()
      .then((breedings: Array<breedings>) => {
        if (breedings && breedings.length) {
          this.breedings = this.deployData.get_breedings_of_section(this.sectionType.id, breedings);
          if (this.navParams.data.farmId) {
            this.breedings = this.breedings.filter((breeding: breedings) => {
              return breeding.pig.house.section.farm.id == this.navParams.data.farmId ? true : false;
            })
          }
        }
        this.util.closeBackDrop();
        return breedings;
      })
      .catch((err: Error) => {
        this.util.closeBackDrop();
      })
  }

  initialBreedings() {
    this.breedings.forEach((breeding) => {
      breeding['breedName'] = breeding.pig['breed'].name + ' ' + breeding.pig['breed'].symbol;
      breeding['pigCode'] = breeding.pig.pigCode;
      breeding['farmName'] = breeding.pig.house.section.farm.name;
      breeding['sectionName'] = breeding.pig.house.section.name;
      breeding['houseName'] = breeding.pig['house'].name;
      breeding['dateDisplay'] = this.util.convertDate(breeding.date);
      breeding['breedingNextDisplay'] = breeding.breedingNext ? this.util.convertDate(breeding.breedingNext) : 'Chưa xác định';
      breeding['matingEstimateDisplay'] = breeding.matingEstimate ? this.util.convertDate(breeding.matingEstimate) : 'Chưa xác định';
      breeding['matingRealDisplay'] = breeding.matingReal ? this.util.convertDate(breeding.matingReal) : 'Chưa phối';
      breeding['statusName'] = breeding.pig.status.description;
      breeding['typeBreedingName'] = this.breedingTypes[breeding.typeId].name;
      breeding['canMating'] = this.sectionType.id == VARIABLE.SECTION_TYPE[3].value ? true : false;
    })
  }

  callback = data => {
    this.activitiesProvider.updateBreeding(data)
      .then((updatedBreeding: breedings) => {
        if (updatedBreeding) {
          let idx = this.breedings.findIndex(_breeding => _breeding.id == updatedBreeding.id);
          if (idx > -1) {
            this.breedings[idx] = updatedBreeding;
            this.setFilteredItems();
          }
        }
        this.navCtrl.pop();
      })
      .catch((err: Error) => { })
  };

  edit(breeding: breedings) {
    this.navCtrl.push(BreedingInputPage, {
      updateMode: true,
      breeding: breeding,
      callback: this.callback
    })
  }

  remove(breeding: breedings) {
    this.activitiesProvider.deleteBreeding(breeding)
      .then((isOK) => {
        if (isOK) {
          this.breedings.splice(
            this.breedings.findIndex(_breeding => _breeding.id == breeding.id), 1
          );
          this.setFilteredItems();
        }
      }).then((isOK) => {
        let pig = this.deployData.get_pig_by_id(breeding.pig.id);
        let statusPig = this.deployData.get_status_by_id(pig.statusId);
        pig.statusId = statusPig.previousStatus;
        this.pigProvider.updatedPig(pig);
      })
      .catch((err: Error) => { })
  }


  /**
   * Thêm thông tin phối giống
   */
  mating_input(item: breedings) {
    let callback = (data: { mating: mating, matingDetail: Array<matingDetails> }) => {

      data.mating.mother = this.deployData.get_pig_by_id(data.mating.motherId);
      if (data.mating.typeId == VARIABLE.MATING_TYPE.SPERM.value) {
        if (data.matingDetail[1].sperm) {
          data.mating.status = VARIABLE.MATING_STATUS.COMPLETE.codeName;
        } else {
          data.matingDetail.splice(1, 1);
          data.mating.status = VARIABLE.MATING_STATUS.PROCESSING.codeName;
        }
      } else {
        data.mating.status = VARIABLE.MATING_STATUS.COMPLETE.codeName;
        data.mating.fatherId = this.deployData.get_pig_by_id(data.mating.fatherId).id;
        data.matingDetail = [];
      }

      data['breeding'] = this.util.deepClone(item);
      data['breeding'].matingReal = data.mating.date;

      this.activitiesProvider.createMating({
        mating: data.mating,
        matingDetail: data.matingDetail,
        breeding: data['breeding']
      })
        .then((newMating: { mating: mating, matingDetail: Array<matingDetails>, breeding: breedings }) => {
          if (newMating) {
            let idx = this.breedings.findIndex(_breeding => _breeding.id == newMating.breeding.id);
            if (idx > -1) {
              this.breedings[idx] = newMating.breeding;
              this.setFilteredItems();
            }
            this.navCtrl.pop();
            pig.statusId = newMating.mating.mother.status.id;
            this.pigProvider.updatedPig(pig);
          }
        })
        .catch((err: Error) => {
          console.log(err);
          return err;
        })
    }

    let pig = this.deployData.get_pig_by_id(item.pig.id);
    if (pig) {
      this.navCtrl.push(MatingInputPage, {
        pig: pig,
        callback: callback,
        farmId: this.navParams.data.farmId
      });
    } else {
      this.util.showToast('Không tìm thấy heo nái trong ghi nhận lên giống');
    }
  }
}
