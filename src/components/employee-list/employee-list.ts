import { Component, Input, ViewChild } from '@angular/core';
import { employee } from '../../common/entity';
import { FormControl } from '@angular/forms';
import { FilterProvider } from '../../providers/filter/filter';
import { Content, ModalController } from 'ionic-angular';
import { EmployeeInformationPage } from '../../pages/employee-information/employee-information';

/**
 * Generated class for the EmployeeListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'employee-list',
  templateUrl: 'employee-list.html'
})
export class EmployeeListComponent {

  @Input() data: Array<employee> = [];
  @Input() content: Content;

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
    public modalCtrl: ModalController
  ) {
    console.log('Hello EmployeeListComponent Component');
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

  viewDeltail(employee) {
    const modal = this.modalCtrl.create(
      EmployeeInformationPage, employee, {
        cssClass: 'ion-modal'
      }
    )
    modal.present();
  }

}
