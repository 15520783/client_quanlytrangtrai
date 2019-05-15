import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { mating } from '../../common/entity';
import { FormControl } from '@angular/forms';
import { FilterProvider } from '../../providers/filter/filter';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { ActivitiesProvider } from '../../providers/activities/activities';
import { PigsProvider } from '../../providers/pigs/pigs';
import { Utils } from '../../common/utils';

@IonicPage()
@Component({
  selector: 'page-mating-list',
  templateUrl: 'mating-list.html',
})
export class MatingListPage {

  public matings: Array<mating> = [];
  public sectionType: any;

  public mainAttribute = "dateDisplay";
  public attributes = [
    { name: "pigCodeMother", label: 'Mã heo nái' },
    { name: "breedMotherName", label: 'Giống heo nái' },
    { name: "pigCodeFather", label: 'Mã heo nọc' },
    { name: "breedFatherName", label: 'Giống heo nọc' },
    { name: "farmName", label: 'Trang trại' },
    { name: "sectionName", label: 'Khu' },
    { name: "houseName", label: 'Nhà' },
    { name: "statusName", label: 'Hiện trạng' },
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

    this.getMatingList()
      .then((data) => {
        this.setFilteredItems();
      });
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

    this.filterProvider.input = this.matings;
    this.filterProvider.searchText = searchItem;
    this.filterProvider.searchWithText = this.filter_default;
    this.filterProvider.searchWithRange = {}
    return this.filterProvider.filter().sort((a: mating, b: mating) =>
      (new Date(a.date) > new Date(b.date)) ? -1 : 1
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


  getMatingList(){
    this.util.openBackDrop();
    return this.activitiesProvider.getAllMatings()
      .then((matings: Array<mating>) => {
        if (matings && matings.length) {
          this.matings = this.deployData.get_matings_of_section(this.sectionType.id, matings);
          this.initialMatings();
        }
        this.util.closeBackDrop();
        return matings;
      })
      .catch((err: Error) => {
        this.util.closeBackDrop();
      })
  }

  initialMatings(){
    this.matings.forEach((mating) => {
      mating['pigCodeMother'] = mating.mother.pigCode;
      mating['breedMotherName'] = mating.mother.breed.name;
      mating['pigCodeFather'] = mating.father.pigCode;
      mating['breedFatherName'] = mating.father.breed.name;
      mating['farmName'] = mating.mother.house.section.farm.name;
      mating['sectionName'] = mating.mother.house.section.name;
      mating['houseName'] = mating.mother['house'].name;
      mating['dateDisplay'] = this.util.convertDate(mating.date);
      mating['birthEstimateDisplay'] = mating.birthEstimate ? this.util.convertDate(mating.birthEstimate) : 'Chưa xác định';
      mating['statusName'] = mating.status;
    })
  }
}
