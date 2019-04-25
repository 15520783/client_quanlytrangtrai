import { Component, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { pig, house } from '../../common/entity';
import { HousesProvider } from '../../providers/houses/houses';
import { NavParams, Content, ModalController, ViewController } from 'ionic-angular';
import { FilterProvider } from '../../providers/filter/filter';
import { PigViewPage } from '../../tabs/pig-view/pig-view';

/**
 * Generated class for the PigListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pig-list',
  templateUrl: 'pig-list.html'
})
export class PigListComponent {

  @ViewChild('content') content: Content;

  @Output() closeMenuEvent = new EventEmitter();
  @Input() data: Array<pig> = [];
  @Input() selectMode: boolean = false;


  showFilter = false;
  public page_Idx: number = 1;
  public page_Total: number = 0;
  public rows: Array<pig> = [];
  public cols: any = [];
  public filter_default: any = ["pig_code", "birthday", "gender", "heath_point", "origin_weight"];
  public dualValue2 = { lower: 0, upper: 500 };

  public genderFilter = [];
  public houseFilter = [];

  customAlertOptions: any = {
    translucent: true,
    cssClass: 'ion-alert'
  };

  protected searchControl: FormControl = new FormControl();
  protected searchTerm: string = '';
  protected visible_items: Array<pig> = [];
  protected houses: Array<house> = [];

  constructor(
    public houseProvider: HousesProvider,
    public navParams: NavParams,
    public filterProvider: FilterProvider,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController
  ) {
    console.log('Hello PigListComponent Component');

    if(this.navParams.data){
      this.data = this.navParams.data.pigs;
      this.selectMode = this.navParams.data.selectMode;
    }
    
    this.houseProvider.getAllHouses()
    .then((data: any) => {
      this.houses = data;
    })
    .catch((err)=>{console.log(err)});
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.setFilteredItems();
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
    this.filterProvider.input = this.data;
    this.filterProvider.searchWithInclude.gender = this.genderFilter;
    this.filterProvider.searchWithInclude.house_id = this.houseFilter;
    this.filterProvider.searchText = searchItem;
    this.filterProvider.searchWithText = this.filter_default;
    this.filterProvider.searchWithRange = {
       origin_weight : { min: this.dualValue2.lower, max: this.dualValue2.upper }
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
    }, 500);
  }

  select(pig){
    if(this.selectMode){
      this.viewCtrl.dismiss(pig);
    }else{
      this.viewDeltail(pig);
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

  scrollToTop(){
    this.content.scrollToTop();
  }

  closeMenu(){
    this.closeMenuEvent.emit({close:true});
  }
}