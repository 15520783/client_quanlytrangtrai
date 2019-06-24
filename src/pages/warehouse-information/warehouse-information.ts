import { Component, ViewChild } from '@angular/core';
import { Events, IonicPage, NavController, NavParams, Platform, Slides } from 'ionic-angular';
import { feeds, foodWareHouse, warehouse } from '../../common/entity';

import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { FeedInputPage } from '../feed-input/feed-input';
import { FeedingHistoryPage } from '../feeding-history/feeding-history';
import { SettingInputUtilComponent } from '../../components/setting-input-util/setting-input-util';
import { UserProvider } from '../../providers/user/user';
import { Utils } from '../../common/utils';
import { VARIABLE } from '../../common/const';
import { WarehouseRole } from '../../role-input/warehouse';
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
    public deployData: DeployDataProvider,
    public util: Utils,
    public event: Events,
    public userProvider: UserProvider,
    public platform: Platform
  ) {
    if (this.navParams.data.warehouse) {
      this.warehouse = this.navParams.data.warehouse;
      console.log(warehouse);
    }
  }

  ionViewDidLoad() {
    this.getAllFoodWarehouse();
  }

  ngAfterViewInit() {
    if (this.slider) {
      this.slider.autoHeight = true;
    }
  }

  getAllFoodWarehouse() {
    this.util.openBackDrop();
    this.warehouseProvider.getFoodWarehouseByWarehousId(this.warehouse.id)
      .then((data: Array<foodWareHouse>) => {
        if (data) {
          this.food_warehouses = data.filter((foodwarehouse) => {
            return foodwarehouse.warehouse.id == this.warehouse.id;
          })

          this.food_warehouses.forEach((e: foodWareHouse) => {
            e['quantityName'] = this.deployData.show_quantity_food(parseFloat(e.quantity), e.unit);
            e['usedName'] = this.deployData.show_quantity_food(parseFloat(e.used), e.unit);
            e['remainName'] = this.deployData.show_quantity_food(parseFloat(e.remain), e.unit);
            e['mfgDateDisplay'] = this.util.convertDate(e.mfgDate);
            e['expiryDateDisplay'] = this.util.convertDate(e.expiryDate);
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

  exportFood(item: foodWareHouse) {
    let callback = (feeds: Array<feeds>) => {
      if (feeds && feeds.length) {
        this.getAllFoodWarehouse();
      }
    }

    this.navCtrl.push(FeedInputPage, {
      farmId: item.warehouse.manager.farm.id,
      foodWareHouse: item,
      callback: callback
    });
  }

  viewFeedingHistory(item: foodWareHouse) {
    this.navCtrl.push(FeedingHistoryPage, { foodWareHouse: item });
  }


  edit() {
    let callback = (data: warehouse) => {
      if (data) {
        this.warehouse = data;
        this.event.publish('warehousesPage:OnChange', (this.warehouse));
        this.navCtrl.pop();
      }
    }

    /**
     * Lấy danh sách nhân viên chức vụ quản lý kho
     */
    let man_Of_Warehouse = this.deployData.get_employees_of_farm(this.warehouse.manager.farm.id).filter((man) => {
      return man.regency.id == VARIABLE.REGENCIES.quan_ly_kho.id ? true : false;
    })

    let roleInput = new WarehouseRole(this.deployData, this.warehouseProvider, man_Of_Warehouse);
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
    let roleInput = new WarehouseRole(this.deployData, this.warehouseProvider, []);
    roleInput.delete(this.warehouse)
      .then((isOK: boolean) => {
        if (isOK) {
          this.event.publish('warehousesPage:OnChange', (this.warehouse));
          this.navCtrl.pop();
        }
      })
      .catch((err: Error) => { })
  }
}
