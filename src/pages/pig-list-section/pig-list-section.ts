import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Platform } from 'ionic-angular';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { FormControl } from '@angular/forms';
import { FilterProvider } from '../../providers/filter/filter';
import { Utils } from '../../common/utils';
import { VARIABLE } from '../../common/const';
import { PigViewPage } from '../../tabs/pig-view/pig-view';
import { pig } from '../../common/entity';


@IonicPage()
@Component({
  selector: 'pig-list-section',
  templateUrl: 'pig-list-section.html',
})
export class PigListSectionPage {

  @Input() title: string = 'Danh sách heo trong khu';
  @Input() pigs: Array<pig> = [];
  @Input() sectionTypeId: string = '';
  @Input() statusFilter: any = [];

  public breed: any = {};
  public gender: any = {};
  public houses: any = {};
  public status: any = {};

  public mainAttribute = "pigCode";
  public attributes = [
    { name: "breedName", label: 'Giống' },
    { name: "houseName", label: 'Nhà' },
    { name: "genderName", label: 'Giới tính' },
    { name: "birthdayDisplay", label: 'Ngày sinh' },
    { name: "statusName", label: 'Trạng thái' }
  ];

  public placeholderSearch: string = 'Tìm kiếm heo'
  public filter_default: Array<string> = ["pigCode", "breedName", "houseName", "genderName", "birthdayDisplay", "statusName"];

  public page_Idx: number = 1;
  public page_Total: number = 0;
  public rows: Array<any> = [];

  protected searchControl: FormControl = new FormControl();
  protected searchTerm: string = '';

  public visible_items: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public deployData: DeployDataProvider,
    public events: Events,
    public filterProvider: FilterProvider,
    public util: Utils,
    public platform: Platform
  ) {

    this.breed = this.deployData.get_object_list_key_of_breeds();
    this.houses = this.deployData.get_object_list_key_of_house();
    this.status = this.deployData.get_object_list_key_of_status();

    VARIABLE.gender.forEach(gender => {
      this.gender[gender.value] = gender;
    })

    // this.events.subscribe('activities:PigOut', () => {
    //   this.pigs = this.deployData.get_pigs_of_section(this.sectionTypeId);
    //   console.log(this.pigs);
    //   this.setFilteredItems();
    // })
  }

  ionViewDidLoad() {
    this.sectionTypeId = this.navParams.data.sectionType.id;
    if (this.navParams.data) {
      this.pigs = this.navParams.data.getPigs(this.deployData);
      if (this.navParams.data.statusFilter) {
        this.statusFilter = this.navParams.data.statusFilter;
      }
    }
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
    this.pigs.forEach((pig) => {
      pig['breedName'] = this.breed[pig.breedId] ? this.breed[pig.breedId].name : '';
      pig['houseName'] = this.houses[pig.houseId] ? this.houses[pig.houseId].name : '';
      pig['statusName'] = this.status[pig.statusId] ? this.status[pig.statusId].name : '';
      pig['statusCode'] = this.status[pig.statusId] ? (this.status[pig.statusId].code).toString() : '';
      pig['birthdayDisplay'] = this.util.convertDate(pig.birthday);
      pig['genderName'] = this.gender[pig.gender] ? this.gender[pig.gender].name : '';
    })
    this.filterProvider.input = this.pigs;
    this.filterProvider.searchText = searchItem;
    this.filterProvider.searchWithText = this.filter_default;
    this.filterProvider.searchWithRange = {}
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

  viewDetail(pig) {
    this.navCtrl.push(PigViewPage, pig);
  }

  pigChange(new_vers: pig, old_vers: pig) {
    old_vers = new_vers;
    old_vers['breedName'] = this.breed[old_vers.breedId] ? this.breed[old_vers.breedId].name : '';
    old_vers['houseName'] = this.houses[old_vers.houseId] ? this.houses[old_vers.houseId].name : '';
    old_vers['statusName'] = this.status[old_vers.statusId] ? this.status[old_vers.statusId].name : '';
    old_vers['statusCode'] = this.status[old_vers.statusId] ? (this.status[old_vers.statusId].code).toString() : '';
    old_vers['birthdayDisplay'] = this.util.convertDate(old_vers.birthday);
    old_vers['genderName'] = this.gender[old_vers.gender] ? this.gender[old_vers.gender].name : '';
  }
}
