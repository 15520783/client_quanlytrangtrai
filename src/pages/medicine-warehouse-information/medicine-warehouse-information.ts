import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { medicineWarehouse, warehouse } from '../../common/entity';
import { WarehousesProvider } from '../../providers/warehouses/warehouses';
import { Utils } from '../../common/utils';

@IonicPage()
@Component({
  selector: 'page-medicine-warehouse-information',
  templateUrl: 'medicine-warehouse-information.html',
})
export class MedicineWarehouseInformationPage {

  @ViewChild('slider') slider: Slides;

  public type = "0";
  public warehouse = new warehouse();
  public medicine_warehouses: Array<medicineWarehouse> = [];

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
    this.getAllMedicineWarehouse();
  }



  getAllMedicineWarehouse() {
    this.util.openBackDrop();
    this.warehouseProvider.getMedicineWarehouseByWarehouseId(this.warehouse.id)
      .then((data: Array<medicineWarehouse>) => {
        if (data) {
          this.medicine_warehouses = data.filter((medicineWarehouse) => {
            return medicineWarehouse.warehouse.id == this.warehouse.id;
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
