import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Platform, ModalController } from 'ionic-angular';
import { partners } from '../../common/entity';
import { FormControl } from '@angular/forms';
import { Utils } from '../../common/utils';
import { FilterProvider } from '../../providers/filter/filter';
import { PartnerProvider } from '../../providers/partner/partner';

@IonicPage()
@Component({
  selector: 'page-partners',
  templateUrl: 'partners.html',
})
export class PartnersPage {

  @ViewChild('content') content: Content;

  public page_Idx: number = 1;
  public page_Total: number = 0;
  public rows: Array<partners> = [];
  public cols: any = [];
  public filter_default: any = ["name", "address", "phone", "manager"];
  protected visible_items: Array<partners> = [];

  protected searchControl: FormControl = new FormControl();
  protected searchTerm: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public util: Utils,
    public filterProvider: FilterProvider,
    public modalCtrl: ModalController,
    public partnerProvider:PartnerProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PartnersPage');
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
    this.filterProvider.input = this.partnerProvider.partners;
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
