import { Component, Renderer, ViewChild } from '@angular/core';
import { Events, IonicPage, NavController, NavParams, Scroll, Slides, } from 'ionic-angular';

import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { MedicineWarehouseInformationPage } from '../medicine-warehouse-information/medicine-warehouse-information';
import { SettingInputUtilComponent } from '../../components/setting-input-util/setting-input-util';
import { VARIABLE } from '../../common/const';
import { WarehouseInformationPage } from '../warehouse-information/warehouse-information';
import { WarehouseRole } from '../../role-input/warehouse';
import { WarehousesProvider } from '../../providers/warehouses/warehouses';
import { warehouse } from '../../common/entity';

@IonicPage()
@Component({
  selector: 'page-warehouses',
  templateUrl: 'warehouses.html',
})
export class WarehousesPage {
  @ViewChild('slider') slider: Slides;
  @ViewChild('scroll') scroll: Scroll;

  public SelectedFarm;

  public type = "0";
  public food_warehouses: Array<warehouse> = []
  public medicine_warehouses: Array<warehouse> = [];
  public farms_select: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public warehouseProvider: WarehousesProvider,
    public renderer: Renderer,
    public deployData: DeployDataProvider,
    public event:Events
  ) {
    this.farms_select = this.deployData.get_farm_list_for_select();
    this.SelectedFarm = this.farms_select[0].value;
    this.food_warehouses = this.deployData.get_food_warehouse_of_farm(this.SelectedFarm);
    this.medicine_warehouses = this.deployData.get_medicine_warehouse_of_farm(this.SelectedFarm);

    this.event.subscribe('warehousesPage:OnChange',(warehouse)=>{
      this.food_warehouses = this.deployData.get_food_warehouse_of_farm(this.SelectedFarm);
      this.medicine_warehouses = this.deployData.get_medicine_warehouse_of_farm(this.SelectedFarm);
    })
  }

  ionViewDidLoad() {
    let heightContent = document.getElementsByClassName('scroll-content')[0].clientHeight;
    let ion_scroll = document.getElementsByClassName('modal-scroll');
    this.renderer.setElementStyle(ion_scroll[0], 'height', heightContent + 100 + 'px');
    this.renderer.setElementStyle(ion_scroll[1], 'height', heightContent + 100 + 'px');
  }

  ngAfterViewInit() {
    if (this.slider) {
      this.slider.autoHeight = true;
    }
  }

  slideChange() {
    this.type = this.slider.realIndex.toString();
  }

  selectedTab(index) {
    this.slider.slideTo(index);
  }

  viewDeltailFoodWarehouse(warehouse) {
    this.navCtrl.push(WarehouseInformationPage, { warehouse: warehouse });
  }

  viewDeltailMedicineWarehouse(warehouse) {
    this.navCtrl.push(MedicineWarehouseInformationPage, { warehouse: warehouse });
  }

  changeFarm(e) {
    this.SelectedFarm = e.valueId;
    this.food_warehouses = this.deployData.get_food_warehouse_of_farm(this.SelectedFarm);
    this.medicine_warehouses = this.deployData.get_medicine_warehouse_of_farm(this.SelectedFarm);
  }

  add() {

    let callback = (data: warehouse) => {
      if (data) {
        this.food_warehouses = this.deployData.get_food_warehouse_of_farm(this.SelectedFarm);
        this.medicine_warehouses = this.deployData.get_medicine_warehouse_of_farm(this.SelectedFarm);
        this.navCtrl.pop();
      }
    }

    /**
     * Lấy danh sách nhân viên chức vụ quản lý kho
     */
    let man_Of_Warehouse = this.deployData.get_employees_of_farm(this.SelectedFarm).filter((man) => {
      return man.regency.id == VARIABLE.REGENCIES.quan_ly_kho.id ? true : false;
    })

    let roleInput = new WarehouseRole(this.deployData, this.warehouseProvider,man_Of_Warehouse);
    this.navCtrl.push(SettingInputUtilComponent,
      {
        insertMode: true,
        roleInput: roleInput,
        callback: callback
      }
    )
  }

  
}
