import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { warehouse } from '../../common/entity';


@IonicPage()
@Component({
  selector: 'page-warehouse-information',
  templateUrl: 'warehouse-information.html',
})
export class WarehouseInformationPage {
  @ViewChild('slider') slider: Slides;
  
  public warehouse = new warehouse();
  public food_warehouses: any = []
  public food_warehouse: any =
    {
      food_code: '562PSL',
      food_name: 'Cám 562PSL',
      import_date: '2014-11-10 00:00:00',
      quantity: '5000',
      total: '5000',
      used: '150',
      remain: '4850',
      mfg_date: '2014-11-10 00:00:00',
      expiry_date: '2015-01-10 00:00:00'
    }
  public header = ["Thông tin chi tiết", "Danh sách cám chi tiết"];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    for (let i = 0; i <= 10; i++) {
      this.food_warehouses.push(this.food_warehouse);
    }

    if (this.navParams.data.warehouse) {
      this.warehouse = this.navParams.data.warehouse;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WarehouseInformationPage');
  }

  ngAfterViewInit() {
    if (this.slider){
      this.slider.autoHeight = true;
    }
    console.log('ngAfterViewInit FarmInfomationPage');
  }
}
