import { Component, ViewChild } from '@angular/core';
import { Events, IonicPage, NavController, NavParams, Platform, Slides } from 'ionic-angular';
import { medicineWarehouse, warehouse } from '../../common/entity';

import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { SettingInputUtilComponent } from '../../components/setting-input-util/setting-input-util';
import { UserProvider } from '../../providers/user/user';
import { Utils } from '../../common/utils';
import { VARIABLE } from '../../common/const';
import { WarehouseRole } from '../../role-input/warehouse';
import { WarehousesProvider } from '../../providers/warehouses/warehouses';

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
    public util: Utils,
    public event:Events,
    public deployData:DeployDataProvider,
    public userProvider:UserProvider,
    public platform:Platform
  ) {
    if (this.navParams.data.warehouse) {
      this.warehouse = this.navParams.data.warehouse;
    }
  }

  ionViewDidLoad() {
    this.getAllMedicineWarehouse();
  }

  ngAfterViewInit() {
    if (this.slider) {
      this.slider.autoHeight = true;
    }
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


  edit() {
    let callback = (data: warehouse) => {
      if (data) {
        this.warehouse = data;
        this.event.publish('warehousesPage:OnChange',(this.warehouse));
        this.navCtrl.pop();
      }
    }

    /**
     * Lấy danh sách nhân viên chức vụ quản lý kho
     */
    let man_Of_Warehouse = this.deployData.get_employees_of_farm(this.warehouse.manager.farm.id).filter((man) => {
      return man.regency.id == VARIABLE.REGENCIES.quan_ly_kho.id ? true : false;
    })

    let roleInput = new WarehouseRole(this.deployData, this.warehouseProvider,man_Of_Warehouse);
    roleInput.object = this.warehouse;
    roleInput.object['typeId'] = this.warehouse.type.id;
    roleInput.object['managerId'] = this.warehouse.manager.id;
    this.navCtrl.push(SettingInputUtilComponent,
      {
        editMode: true,
        roleInput: roleInput,
        callback: callback
      }
    )
  }

  remove() {
    let roleInput = new WarehouseRole(this.deployData, this.warehouseProvider,[]);
    roleInput.delete(this.warehouse)
      .then((isOK: boolean) => {
        if (isOK) {
          this.event.publish('warehousesPage:OnChange',(this.warehouse));
          this.navCtrl.pop();
        }
      })
      .catch((err: Error) => { })
  }
}
