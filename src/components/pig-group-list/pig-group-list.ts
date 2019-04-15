import { Component, Input } from '@angular/core';
import { group } from '../../common/entity';
import { house } from '../../common/entity';
import { FormControl } from '@angular/forms';
import { PigGroupInformationPage } from '../../pages/pig-group-information/pig-group-information';
import { FilterProvider } from '../../providers/filter/filter';
import { PigGroupsProvider } from '../../providers/pig-groups/pig-groups';
import { ModalController, Content } from 'ionic-angular';

/**
 * Generated class for the PigGroupListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pig-group-list',
  templateUrl: 'pig-group-list.html'
})
export class PigGroupListComponent {

  @Input() data: Array<group> = [];
  @Input() content: Content;

  showFilter = false;

  public page_Idx: number = 1;
  public page_Total: number = 0;
  public rows: Array<group> = [];
  public cols: any = [];
  public filter_default: any = ["group_code", "avg_birthday", "quantity", "health_status", "origin_avg_weight", "origin_sum_weight"];
  protected visible_items: Array<group> = [];
  // protected houses: Array<house> = [];

  public origin_sum_weight = { lower: 0, upper: 1000 };
  public origin_avg_weight = { lower: 0, upper: 7 };

  public genderFilter = [];
  public houseFilter = [];

  customAlertOptions: any = {
    translucent: true,
    cssClass: 'ion-alert'
  };

  protected searchControl: FormControl = new FormControl();
  protected searchTerm: string = '';

  constructor(
    public filterProvider: FilterProvider,
    public pigGroupProvider: PigGroupsProvider,
    public modalCtrl: ModalController
  ) {
    console.log('Hello PigGroupListComponent Component');

  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.setFilteredItems();
  }

  public setFilteredItems() {
    this.content.scrollToTop().then(()=>{
      this.rows = this.filterItems(this.searchTerm);
      this.page_Total = this.rows.length % 50 === 0 ? parseInt(this.rows.length / 50 + '') : parseInt(this.rows.length / 50 + 1 + '');
      this.page_Idx = 1;
      this.visible_items = this.rows.slice(0, 50);
    });
  }

  public filterItems(searchItem) {
    this.filterProvider.input = this.data;
    this.filterProvider.searchWithInclude.gender = this.genderFilter;
    // this.filterProvider.searchWithInclude.house_id = this.houseFilter;
    this.filterProvider.searchText = searchItem;
    this.filterProvider.searchWithText = this.filter_default;

    this.filterProvider.searchWithRange = {
      origin_sum_weight: { min: this.origin_sum_weight.lower, max: this.origin_sum_weight.upper },
      origin_avg_weight: { min: this.origin_avg_weight.lower, max: this.origin_avg_weight.upper }
    }
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


  viewDeltail(group) {
    // this.navCtrl.push(PigViewPage,{data:pig});

    const modal = this.modalCtrl.create(
      PigGroupInformationPage, group, {
        cssClass: 'ion-modal'
      }
    )
    modal.present();
  }
}
