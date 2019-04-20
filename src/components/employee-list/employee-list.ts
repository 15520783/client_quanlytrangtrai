import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { employee } from '../../common/entity';
import { FormControl } from '@angular/forms';
import { FilterProvider } from '../../providers/filter/filter';
import { Content, ModalController, NavParams, ViewController, Events } from 'ionic-angular';
import { EmployeeInformationPage } from '../../pages/employee-information/employee-information';

@Component({
  selector: 'employee-list',
  templateUrl: 'employee-list.html'
})
export class EmployeeListComponent {

  @ViewChild('content') content: Content;
  @Input() data: Array<employee> = [];
  @Input() selectMode: boolean = false;

  @Output()  closeMenuEvent = new EventEmitter();
  
  public page_Idx: number = 1;
  public page_Total: number = 0;
  public rows: Array<employee> = [];
  public cols: any = [];
  public filter_default: any = ["name", "address", "email", "birthday"];

  public visible_items: Array<employee> = [];

  protected searchControl: FormControl = new FormControl();
  protected searchTerm: string = '';

  constructor(
    public filterProvider: FilterProvider,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public events: Events
  ) {
    console.log('Hello EmployeeListComponent Component');
    if(this.navParams.data){
      this.data = this.navParams.data.employees;
      this.selectMode = this.navParams.data.selectMode;
    }

    this.events.subscribe('viewEmployee:open',()=>{
      this.content.resize();
    })
  }

  ngAfterViewInit(): void {
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
    // this.filterProvider.searchWithInclude.gender = this.genderFilter;/
    // this.filterProvider.searchWithInclude.house_id = this.houseFilter;
    this.filterProvider.searchText = searchItem;
    this.filterProvider.searchWithText = this.filter_default;

    this.filterProvider.searchWithRange = {
      // origin_sum_weight : { min: this.origin_sum_weight.lower, max: this.origin_sum_weight.upper },
      // origin_avg_weight : { min: this.origin_avg_weight.lower, max: this.origin_avg_weight.upper }
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

  select(employee){
    if(this.selectMode){
      this.viewCtrl.dismiss(employee);
    }else{
      this.viewDeltail(employee);
    }
  }

  viewDeltail(employee) {
    const modal = this.modalCtrl.create(
      EmployeeInformationPage, employee, {
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
