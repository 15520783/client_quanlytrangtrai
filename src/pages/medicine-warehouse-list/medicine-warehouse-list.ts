import { IonicPage, NavController, NavParams, Platform, ViewController } from 'ionic-angular';

import { CONFIG } from '../../common/const';
import { Component } from '@angular/core';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { FilterProvider } from '../../providers/filter/filter';
import { FormControl } from '@angular/forms';
import { Utils } from '../../common/utils';
import { medicineWarehouse } from '../../common/entity';

@IonicPage()
@Component({
  selector: 'page-medicine-warehouse-list',
  templateUrl: 'medicine-warehouse-list.html',
})
export class MedicineWarehouseListPage {


  public isSelectMode: boolean = false;

  public medicineWarehouses: Array<medicineWarehouse> = [];

  public sectionType: any = {};


  public mainAttribute = "invoiceNo";
  public attributes = [
    { name: "warehouseName", label: 'Tên kho' },
    { name: "medicineTypeName", label: 'Loại thuốc' },
    { name: "medicineName", label: 'Tên thuốc' },
    { name: "invoiceNo", label: 'Số chứng từ' },
    { name: "quantity", label: 'quantity' },
    { name: "unitName", label: 'Đơn vị' },
    { name: "total", label: 'total' },
    { name: "used", label: 'used' },
    { name: "remainDisplay", label: 'Tồn kho' },
    { name: "manufacturer", label: 'Nhà sản xuất' },
    { name: "ImportDisplay", label: 'Ngày nhập' },
    { name: "mfgDateDisplay", label: 'Ngày sản xuất' },
    { name: "expiryDateDisplay", label: 'Hạn sử dụng' },
  ];

  public placeholderSearch: string = 'Tìm kiếm bệnh'
  public filter_default: Array<string> = ["warehouseName", "medicineTypeName", "medicineName", "invoiceNo", "remainDisplay"];

  public page_Idx: number = 1;
  public page_Total: number = 0;
  public rows: Array<any> = [];

  protected searchControl: FormControl = new FormControl();
  protected searchTerm: string = '';

  public visible_items: Array<any> = [];
  public units: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public filterProvider: FilterProvider,
    public viewCtrl: ViewController,
    public util: Utils,
    public platform: Platform,
    public deployData: DeployDataProvider
  ) {
    if (this.navParams.data.selectMode) {
      this.isSelectMode = true;
    }
    if (this.navParams.data.medicineWarehouses) {
      this.medicineWarehouses = this.navParams.data.medicineWarehouses;
    }
    this.units = this.deployData.get_object_list_key_of_medicineUnit();
  }


  ionViewDidLoad() {
    this.setFilteredItems();
  }

  public setFilteredItems() {
    setTimeout(() => {
      this.rows = this.filterItems(this.searchTerm);
      this.page_Total = this.rows.length % CONFIG.PAGE_SITE === 0 ? parseInt(this.rows.length / CONFIG.PAGE_SITE + '') : parseInt(this.rows.length / CONFIG.PAGE_SITE + 1 + '');
      this.page_Idx = 1;
      this.visible_items = this.rows.slice(0, CONFIG.PAGE_SITE);
      if (document.getElementById('content'))
        document.getElementById('content').scrollTop = 0;
    }, 200);
  }


  public filterItems(searchItem) {
    this.medicineWarehouses.forEach((element) => {
      element['warehouseName'] = element.warehouse.name;
      element['medicineTypeName'] = element.medicine.type.name;
      element['unitName'] = element.unit.name;
      element['invoiceNo'] = element.invoice.invoiceNo;
      element['manufacturer'] = element.invoice.source.name;
      element['ImportDisplay'] = this.util.convertDate(element.invoice.importDate);
      element['mfgDateDisplay'] = this.util.convertDate(element.mfgDate);
      element['expiryDateDisplay'] = this.util.convertDate(element.expiryDate);
      // element['remainDisplay'] = (parseInt(element.remain) * parseInt(element.unit.quantity)) + ' ' + this.units[element.unit.baseUnit].name;
      element['remainDisplay'] = this.deployData.show_quantity_remain_medicine(parseFloat(element.remain),element.unit);
    })
    this.filterProvider.input = this.medicineWarehouses;
    this.filterProvider.searchText = searchItem;
    this.filterProvider.searchWithText = this.filter_default;
    this.filterProvider.searchWithRange = {}
    return this.filterProvider.filter().sort((a: medicineWarehouse, b: medicineWarehouse) => {
      return new Date(a.expiryDate) > new Date(b.expiryDate) ? -1 : 1;
    });
  }

  loadData(infiniteScroll) {
    setTimeout(() => {
      let start = CONFIG.PAGE_SITE * this.page_Idx + 1;
      let end = start + CONFIG.PAGE_SITE;
      this.page_Idx++;

      this.visible_items.push.apply(this.visible_items, this.rows.slice(start, end));
      infiniteScroll.complete();
    }, CONFIG.LOADING_MORE_TIME);
  }

  select(item) {
    if (this.isSelectMode) {
      this.viewCtrl.dismiss(item);
    }
  }
}
