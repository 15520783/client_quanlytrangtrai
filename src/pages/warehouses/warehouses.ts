import { Component, ViewChild, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Scroll,  } from 'ionic-angular';
import { warehouse, farm } from '../../common/entity';
import { WarehousesProvider } from '../../providers/warehouses/warehouses';
import { FarmsProvider } from '../../providers/farms/farms';
import { WarehouseInformationPage } from '../warehouse-information/warehouse-information';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';

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
  public farms_select:any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public warehouseProvider: WarehousesProvider,
    public renderer: Renderer,
    public deployData: DeployDataProvider
  ) {
    this.farms_select = this.deployData.get_farm_list_for_select();
    this.SelectedFarm = this.farms_select[0].value;
    this.food_warehouses = this.deployData.get_food_warehouse_of_farm(this.SelectedFarm);
    this.medicine_warehouses = this.deployData.get_medicine_warehouse_of_farm(this.SelectedFarm);
  }

  ionViewDidLoad() {
    let heightContent = document.getElementsByClassName('scroll-content')[0].clientHeight;
    let ion_scroll = document.getElementsByClassName('modal-scroll');
    this.renderer.setElementStyle(ion_scroll[0],'height',heightContent+ 100 + 'px');
    this.renderer.setElementStyle(ion_scroll[1],'height',heightContent+ 100 + 'px');
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

  viewDeltail(warehouse){
    this.navCtrl.push(WarehouseInformationPage,{warehouse:warehouse});
  }

  changeFarm(e){
    this.SelectedFarm = e.valueId;
    this.food_warehouses = this.deployData.get_food_warehouse_of_farm(this.SelectedFarm);
    this.medicine_warehouses = this.deployData.get_medicine_warehouse_of_farm(this.SelectedFarm);
  }
}
