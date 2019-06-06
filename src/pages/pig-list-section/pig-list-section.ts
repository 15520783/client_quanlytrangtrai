import { Component, Input, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Platform, Menu, MenuController } from 'ionic-angular';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { FormControl } from '@angular/forms';
import { FilterProvider } from '../../providers/filter/filter';
import { Utils } from '../../common/utils';
import { VARIABLE, MESSAGE, CONFIG } from '../../common/const';
import { PigViewPage } from '../../tabs/pig-view/pig-view';
import { pig } from '../../common/entity';
import { PigSummaryPage } from '../pig-summary/pig-summary';
import { PigsProvider } from '../../providers/pigs/pigs';


@IonicPage()
@Component({
  selector: 'pig-list-section',
  templateUrl: 'pig-list-section.html',
})
export class PigListSectionPage {
  @ViewChild('menuFilter') menuFilter: Menu;

  @Input() title: string = 'Danh sách heo trong khu';
  @Input() pigs: Array<pig> = [];
  @Input() sectionTypeId: string = '';
  @Input() statusFilter: any = [];

  public breed: any = {};
  public breedFilter: any = [];
  public farmFilter: any = [];
  public sectionFilter: any = [];
  public houseFilter: any = [];
  public gender: any = {};
  public houses: any = {};
  public status: any = {};

  public mainAttribute = "pigCode";
  public attributes = [
    { name: "breedName", label: 'Giống' },
    { name: "farmName", label: 'Trang trại' },
    { name: "houseName", label: 'Nhà' },
    { name: "sectionName", label: 'Khu' },
    { name: "genderName", label: 'Giới tính' },
    { name: "birthdayDisplay", label: 'Ngày sinh' },
    { name: "statusName", label: 'Trạng thái' }
  ];

  public placeholderSearch: string = 'Tìm kiếm heo'
  public filter_default: Array<string> = ["pigCode", "breedName", "houseName", "genderName", "birthdayDisplay", "statusName"];

  public page_Idx: number = 1;
  public page_Total: number = 0;
  public rows: Array<any> = [];
  public filterProvider = new FilterProvider(this.util);

  protected searchControl: FormControl = new FormControl();
  protected searchTerm: string = '';

  public visible_items: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public deployData: DeployDataProvider,
    public events: Events,
    public menuCtrl: MenuController,
    public util: Utils,
    public platform: Platform,
    public pigProvider: PigsProvider
  ) {

    this.breed = this.deployData.get_object_list_key_of_breeds();
    this.houses = this.deployData.get_object_list_key_of_house();
    this.status = this.deployData.get_object_list_key_of_status();
    this.breedFilter = this.deployData.get_breed_list_for_select();
    this.farmFilter = this.deployData.get_farm_list_for_select();

    VARIABLE.gender.forEach(gender => {
      this.gender[gender.value] = gender;
    })

    this.sectionTypeId = this.navParams.data.sectionType.id;
    this.util.openBackDrop();
    this.pigProvider.getPigs().then((data) => {
      if (this.navParams.data) {
        this.pigs = this.navParams.data.getPigs(this.deployData);
        if (this.navParams.data.statusFilter) {
          this.statusFilter = this.navParams.data.statusFilter;
        }
      }
      this.setFilteredItems();
      this.util.closeBackDrop();
    })
    .catch((err)=>{
      this.util.closeBackDrop().then((sth)=>{
        this.util.showToast(MESSAGE[CONFIG.LANGUAGE_DEFAULT].ERROR_OCCUR)
      })
    })
  }

  ionViewDidLoad() {

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
      pig['breedName'] = this.breed[pig.breedId] ? this.breed[pig.breedId].name + ' ' + this.breed[pig.breedId].symbol : '';
      pig['sectionName'] = this.houses[pig.houseId] ? this.houses[pig.houseId].section.name : '';
      pig['houseName'] = this.houses[pig.houseId] ? this.houses[pig.houseId].name : '';
      pig['farmName'] = this.houses[pig.houseId].section.farm ? this.houses[pig.houseId].section.farm.name : '';
      pig['statusName'] = this.status[pig.statusId] ? this.status[pig.statusId].name : '';
      pig['statusCode'] = this.status[pig.statusId] ? (this.status[pig.statusId].code).toString() : '';
      pig['birthdayDisplay'] = this.util.convertDate(pig.birthday);
      pig['genderName'] = this.gender[pig.gender] ? this.gender[pig.gender].name : '';
      pig['farmId'] = this.houses[pig.houseId].section.farm ? this.houses[pig.houseId].section.farm.id : '';
      pig['sectionId'] = this.houses[pig.houseId].section ? this.houses[pig.houseId].section.id : '';
      pig['houseId'] = this.houses[pig.houseId] ? this.houses[pig.houseId].id : '';

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
    if (this.houses[old_vers.houseId].section.typeId == this.sectionTypeId) {
      let idx = this.pigs.findIndex(_pig => _pig.id == old_vers.id);
      if (idx > -1) {
        this.pigs[idx] = old_vers;
        this.setFilteredItems();
      }
    }
    else {
      this.pigs.splice(
        this.pigs.findIndex(_pig => _pig.id == old_vers.id), 1
      );
      this.setFilteredItems();
    }
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


  filterBreed(breedId) {
    if (breedId)
      this.filterProvider.searchWithInclude.breedId = [breedId];
    else
      this.filterProvider.searchWithInclude.breedId = [];
    this.setFilteredItems();
  }

  filterFarm(farmId) {
    if (farmId) {
      this.filterProvider.searchWithInclude.farmId = [farmId];
      this.sectionFilter = this.deployData.get_sections_by_sectionType_of_farm(farmId, this.sectionTypeId);
      this.sectionFilter.forEach(section => {
        section.value = section.id;
      })
      console.log(this.sectionFilter);
    }
    else
      this.filterProvider.searchWithInclude.farmId = [];
    this.setFilteredItems();
  }

  filterSection(sectionId) {
    if (sectionId) {
      this.filterProvider.searchWithInclude.sectionId = [sectionId];
      this.houseFilter = this.deployData.get_houses_of_section(sectionId);
      this.houseFilter.forEach(house => {
        house.value = house.id;
      });
    }
    else
      this.filterProvider.searchWithInclude.sectionId = [];
    this.setFilteredItems();
  }

  filterHouse(houseId) {
    if (houseId) {
      this.filterProvider.searchWithInclude.houseId = [houseId];
    }
    else
      this.filterProvider.searchWithInclude.houseId = [];
    this.setFilteredItems();
  }


  viewInfo(item) {

    this.events.subscribe('pig-list-section:PigChange', (pig: pig) => {
      if (pig) {
        // let EditPig = this.deployData.get_pig_by_id(pig.id);
        this.pigChange(pig, item);
      }
    })

    this.navCtrl.push(PigSummaryPage, { pig: item });
  }
}
