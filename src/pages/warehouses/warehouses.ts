import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { warehouse } from '../../common/entity';
import { WarehousesProvider } from '../../providers/warehouses/warehouses';

@IonicPage()
@Component({
  selector: 'page-warehouses',
  templateUrl: 'warehouses.html',
})
export class WarehousesPage {
  @ViewChild('slider') slider: Slides;

  public type = "0";
  public food_warehouses: Array<warehouse> = []
  public medicine_warehouses: Array<warehouse> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public warehouseProvider: WarehousesProvider
  ) {
    this.food_warehouses = this.warehouseProvider.getFoodWarehouse();
    this.medicine_warehouses = this.warehouseProvider.getMedicineWarehouse();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WarehousesPage');
  }

  ngAfterViewInit() {
    if (this.slider) {
      this.slider.autoHeight = true;
    }
    console.log('ngAfterViewInit FarmInfomationPage');
  }

  slideChange() {
    this.type = this.slider.realIndex.toString();
  }

  selectedTab(index) {
    this.slider.slideTo(index);
  }
}
