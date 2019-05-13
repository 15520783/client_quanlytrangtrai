import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { warehouse, foodWareHouse } from '../../common/entity';
import { Utils } from '../../common/utils';
import { WarehousesProvider } from '../../providers/warehouses/warehouses';


@IonicPage()
@Component({
  selector: 'page-warehouse-information',
  templateUrl: 'warehouse-information.html',
})
export class WarehouseInformationPage {
  @ViewChild('slider') slider: Slides;
  
  public type = "0";
  public warehouse = new warehouse();
  public food_warehouses: Array<foodWareHouse> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public warehouseProvider: WarehousesProvider,
    public util: Utils
  ) {
    if (this.navParams.data.warehouse) {
      this.warehouse = this.navParams.data.warehouse;
    }
  }

  ionViewDidLoad() {
    this.getAllFoodWarehouse();
  }

  ngAfterViewInit() {
    if (this.slider) {
      this.slider.autoHeight = true;
    }
    console.log('ngAfterViewInit FarmInfomationPage');
  }

  getAllFoodWarehouse() {
    this.util.openBackDrop();
    this.warehouseProvider.getFoodWarehouseByWarehousId(this.warehouse.id)
      .then((data: Array<foodWareHouse>) => {
        if (data) {
          this.food_warehouses = data.filter((foodwarehouse) => {
            return foodwarehouse.warehouse.id == this.warehouse.id;
          })
        }
        this.util.closeBackDrop();
      })
      .catch((err: Error) => {
        console.log(err);
        this.util.closeBackDrop();
      })
  }

  slideChange() {
    this.type = this.slider.realIndex.toString();
  }

  selectedTab(index) {
    this.slider.slideTo(index);
  }
}
