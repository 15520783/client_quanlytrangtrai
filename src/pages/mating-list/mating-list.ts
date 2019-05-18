import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { mating, matingDetails, pig, births } from '../../common/entity';
import { FormControl } from '@angular/forms';
import { FilterProvider } from '../../providers/filter/filter';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { ActivitiesProvider } from '../../providers/activities/activities';
import { PigsProvider } from '../../providers/pigs/pigs';
import { Utils } from '../../common/utils';
import { MatingInputPage } from '../mating-input/mating-input';
import { VARIABLE } from '../../common/const';
import { BirthInputPage } from '../birth-input/birth-input';

@IonicPage()
@Component({
  selector: 'page-mating-list',
  templateUrl: 'mating-list.html',
})
export class MatingListPage {

  public matings: Array<mating> = [];
  public matingDetails: any = {};
  public sectionType: any;
  public statusMating: any;
  public breeds: any = {};
  public section: any;

  public mainAttribute = "dateDisplay";
  public attributes = [
    { name: "pigCodeMother", label: 'Mã heo nái' },
    { name: "breedMotherName", label: 'Giống heo nái' },
    { name: "pigCodeFather", label: 'Mã heo nọc' },
    { name: "breedFatherName", label: 'Giống heo nọc' },
    { name: "farmName", label: 'Trang trại' },
    { name: "sectionName", label: 'Khu' },
    { name: "houseName", label: 'Nhà' },
    { name: "statusName", label: 'Hiện trạng', usingBadge: true },
    { name: "birthEstimateDisplay", label: 'Dự kiến sinh' },
    { name: "description", label: 'Ghi chú' },
  ];

  public placeholderSearch: string = 'Tìm kiếm ghi nhận lên giống'
  public filter_default: Array<string> = ["pigCodeMother", "pigCodeFather", "breedMotherName", "breedFatherName", "farmName", "statusName", "birthdayDisplay", "description"];

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
    public pigProvider: PigsProvider,
    public util: Utils
  ) {
    if (this.navParams.data.sectionType) {
      this.sectionType = this.navParams.data.sectionType;
    }
    this.init();

    if (this.navParams.data.matings) {
      this.matings = this.navParams.data.matings;
      this.setFilteredItems();
    } else {
      this.getMatingList()
        .then((data: any) => {
          if (data) {
            data.matingDetails.forEach(matingDetail => {
              if (!this.matingDetails[matingDetail.mating.id]) {
                this.matingDetails[matingDetail.mating.id] = [];
              }
              this.matingDetails[matingDetail.mating.id].push(matingDetail);
            });
          }
          this.setFilteredItems();
        });
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MatingListPage');
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
    this.initialMatings();
    this.filterProvider.input = this.matings;
    this.filterProvider.searchText = searchItem;
    this.filterProvider.searchWithText = this.filter_default;
    this.filterProvider.searchWithRange = {}
    return this.filterProvider.filter().sort((a: mating, b: mating) =>
      (a.id > b.id) ? -1 : 1
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


  getMatingList() {
    this.util.openBackDrop();
    return this.activitiesProvider.getAllMatings()
      .then((data: ({ matings: Array<mating>, matingDetails: Array<matingDetails> })) => {
        if (data.matings && data.matings.length) {
          if (this.sectionType.id == VARIABLE.SECTION_TYPE[3].id) {
            this.matings = data.matings;
          } else {
            this.matings = data.matings.filter((mating) => {
              return mating.mother.house.section.typeId == this.sectionType.id ? true : false;
            })
          }
          // this.initialMatings();
        }
        this.util.closeBackDrop();
        return data;
      })
      .catch((err: Error) => {
        this.util.closeBackDrop();
      })
  }

  initialMatings() {
    this.matings.forEach((mating) => {
      mating['pigCodeMother'] = mating.mother.pigCode;
      mating['breedMotherName'] = mating.mother.breed.name;
      if (mating.type == VARIABLE.MATING_TYPE.IMMEDIATE.codeName) {
        let pigFather = this.deployData.get_pig_by_id(mating.fatherId);
        mating['pigCodeFather'] = pigFather.pigCode;
        mating['breedFatherName'] = this.breeds[pigFather.breedId].name;
      }
      else if (mating.type == VARIABLE.MATING_TYPE.SPERM.codeName) {
        mating['pigCodeFather'] = '';
        mating['breedFatherName'] = this.breeds[mating.fatherId].name;
      }

      mating['farmName'] = mating.mother.house.section.farm.name;
      mating['sectionName'] = mating.mother.house.section.name;
      mating['houseName'] = mating.mother['house'].name;
      mating['dateDisplay'] = this.util.convertDate(mating.date);
      mating['birthEstimateDisplay'] = mating.birthEstimate ? this.util.convertDate(mating.birthEstimate) : 'Chưa xác định';
      mating['statusName'] = mating.status;
    })
  }

  init() {
    this.statusMating = VARIABLE.MATING_STATUS;
    this.section = VARIABLE.SECTION_TYPE;
    this.breeds = this.deployData.get_object_list_key_of_breeds();
  }

  edit(item) {
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

      this.activitiesProvider.updateMating(data)
        .then((newMating: { mating: mating, matingDetail: Array<matingDetails> }) => {
          if (newMating) {
            this.navCtrl.pop();
            /**Update pig in local storage */
            let pig = this.deployData.get_pig_by_id(newMating.mating.mother.id)
            pig.statusId = newMating.mating.mother.status.id;
            this.pigProvider.updatedPig(pig);
            /**Renew in mating list */
            let idx = this.matings.findIndex(_mating => _mating.id == newMating.mating.id);
            if (idx > -1) {
              this.matings[idx] = newMating.mating;
              this.matingDetails[item.id] = newMating.matingDetail;
              this.setFilteredItems();
            }
          }
        })
        .catch((err: Error) => {
          console.log(err);
          return err;
        })
    }
    this.navCtrl.push(MatingInputPage, { pig: item.mother, mating: item, matingDetails: this.matingDetails[item.id], callback: callback });
  }


  birth_input(item: mating) {
    let callback = (newBirth: births) => {
      if (newBirth) {
        console.log(newBirth);
        item.status = VARIABLE.MATING_STATUS.BORNED.codeName;
      }
    };
    this.navCtrl.push(BirthInputPage, { mating: item, callback: callback });
  }


  markedAbortion(item: mating) {
    let mating: mating = this.util.deepClone(item);
    mating.status = VARIABLE.MATING_STATUS.ABORTION.codeName;
    this.activitiesProvider.updateMatingObj(mating)
      .then((updateMating: mating) => {
        if (updateMating) {
          item.status = updateMating.status;
          let pigUpdate: pig = this.util.deepClone(item.mother);
          let abortionStatus = this.deployData.get_status_pig_by_status_code(VARIABLE.STATUS_PIG.ABORTION);
          pigUpdate.statusId = abortionStatus.id;
          this.pigProvider.updatedPig(pigUpdate);
        }
      })
      .catch((err: Error) => { })
  }

  remove(item) {
    this.activitiesProvider.deleteMating(item)
      .then((isOk) => {
        if (isOk) {
          let idx = this.matings.findIndex(_mating => _mating.id == item.id);
          if (idx > -1) {
            this.matings.splice(idx, 1);
            this.setFilteredItems();
          }
        }
      })
      .catch((err: Error) => {
        console.log(err);
      })
  }
}
