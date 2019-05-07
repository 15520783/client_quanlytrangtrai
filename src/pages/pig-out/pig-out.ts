import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { pig } from '../../common/entity';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { FormControl } from '@angular/forms';
import { FilterProvider } from '../../providers/filter/filter';


@IonicPage()
@Component({
  selector: 'page-pig-out',
  templateUrl: 'pig-out.html',
})
export class PigOutPage {

  @Input() title: string = 'Danh sách heo trong khu';
  @Input() pigs: Array<pig> = [];
  @Input() sectionTypeId: string = '1';

  public mainAttribute = "pigCode";
  public attributes = [
    { name: "breedId", label: 'Giống' },
    { name: "houseId", label: 'Nhà' },
    { name: "gender", label: 'Giới tính' },
    { name: "birthday", label: 'Ngày sinh' }
  ];

  public placeholderSearch: string = 'Tìm kiếm heo'
  public filter_default: Array<string> = ["pigCode", "breedId", "houseId", "gender", "birthday"];

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
    public filterProvider: FilterProvider
  ) {
    
    this.events.subscribe('activities:PigOut', () => {
      this.pigs = this.deployData.get_pigs_pig_of_section(this.sectionTypeId);
      console.log(this.pigs);
      this.setFilteredItems();
    })
  }

  ionViewDidLoad() {

    this.sectionTypeId = this.navParams.data.sectionType.id;
    this.pigs = this.deployData.get_pigs_pig_of_section(this.sectionTypeId);
    console.log(this.pigs);
    this.setFilteredItems();
  }

  public setFilteredItems() {
    // this.content.scrollToTop().then(() => {
    setTimeout(() => {
      this.rows = this.filterItems(this.searchTerm);
      this.page_Total = this.rows.length % 50 === 0 ? parseInt(this.rows.length / 50 + '') : parseInt(this.rows.length / 50 + 1 + '');
      this.page_Idx = 1;
      this.visible_items = this.rows.slice(0, 50);
      if (document.getElementById('content'))
        document.getElementById('content').scrollTop = 0;
    }, 200);
    // })
  }

  public filterItems(searchItem) {
    // this.pigs.forEach((pig) => {
    //   invoice['sourceName'] = this.partners_util[invoice.sourceId].name;
    //   invoice['destinationName'] = this.farms_util[invoice.destinationId].name;
    //   invoice['importDateDisplay'] = this.util.convertDate(invoice.importDate);
    // })
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
}
