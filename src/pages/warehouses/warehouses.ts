import { Component, ViewChild, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Scroll,  } from 'ionic-angular';
import { warehouse, farm } from '../../common/entity';
import { WarehousesProvider } from '../../providers/warehouses/warehouses';
import { FarmsProvider } from '../../providers/farms/farms';
import { WarehouseInformationPage } from '../warehouse-information/warehouse-information';

@IonicPage()
@Component({
  selector: 'page-warehouses',
  templateUrl: 'warehouses.html',
})
export class WarehousesPage {
  @ViewChild('slider') slider: Slides;
  @ViewChild('scroll') scroll: Scroll;

  SelectedFarm = this.farmProvider.farms[0].id;

  public type = "0";
  public food_warehouses: Array<warehouse> = []
  public medicine_warehouses: Array<warehouse> = [];
  public farms_select:any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public warehouseProvider: WarehousesProvider,
    public farmProvider: FarmsProvider,
    public renderer: Renderer
  ) {
    this.farmProvider.farms.forEach((e:farm)=>{
      this.farms_select.push({
        name:e.name,
        value:e.id
      })
    })
    this.food_warehouses = this.warehouseProvider.getFoodWarehouse().slice(0,50);
    this.medicine_warehouses = this.warehouseProvider.getMedicineWarehouse().slice(0,50);
  }

  ionViewDidLoad() {
    let heightContent = document.getElementsByClassName('scroll-content')[0].clientHeight;
    let ion_scroll = document.getElementsByClassName('modal-scroll');
    this.renderer.setElementStyle(ion_scroll[0],'height',heightContent+ 100 + 'px');
    this.renderer.setElementStyle(ion_scroll[1],'height',heightContent+ 100 + 'px');
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

  viewDeltail(warehouse){
    this.navCtrl.push(WarehouseInformationPage,{warehouse:warehouse});
  }
}
