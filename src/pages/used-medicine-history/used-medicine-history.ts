import { CONFIG, MESSAGE } from '../../common/const';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { medicineWarehouse, usedMedicine } from '../../common/entity';

import { Component } from '@angular/core';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { FilterProvider } from '../../providers/filter/filter';
import { FormControl } from '@angular/forms';
import { Utils } from '../../common/utils';
import { WarehousesProvider } from '../../providers/warehouses/warehouses';

@IonicPage()
@Component({
  selector: 'page-used-medicine-history',
  templateUrl: 'used-medicine-history.html',
})
export class UsedMedicineHistoryPage {

  public medicineWarehouse: medicineWarehouse = new medicineWarehouse();
  public usedMedicines: Array<usedMedicine> = [];

  public mainAttribute = "pigCode";
  public attributes = [
    { name: "pigCode", label: 'Mã heo' },
    { name: "farmName", label: 'Trang trại' },
    { name: "sectionName", label: 'Khu' },
    { name: "houseName", label: 'Nhà' },
    { name: "dateDisplay", label: 'Ngày dùng thuốc' },
    { name: "medicineName", label: 'Tên thuốc' },
    { name: "quantity", label: 'Khối lượng' },
    { name: "unitName", label: 'Đơn vị' },
    { name: "employeeName", label: 'Người ghi nhận' },
    { name: "description", label: 'Mô tả' },
  ];

  public placeholderSearch: string = 'Tìm kiếm ghi nhận sử dụng thuốc'
  public filter_default: Array<string> = ["pigCode"];

  public page_Idx: number = 1;
  public page_Total: number = 0;
  public rows: Array<any> = [];

  protected searchControl: FormControl = new FormControl();
  protected searchTerm: string = '';

  public visible_items: Array<any> = [];
  public unit_util: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public warehouseProvider: WarehousesProvider,
    public util: Utils,
    public filterProvider: FilterProvider,
    public deployData: DeployDataProvider,
    public platform: Platform
  ) {
    this.unit_util = this.deployData.get_object_list_key_of_medicineUnit();

    if (this.navParams.data.medicineWareHouse) {
      this.medicineWarehouse = this.navParams.data.medicineWareHouse;
    }

    this.getAllUsedMedicine();
  }

  ionViewDidLoad() {
  }


  getAllUsedMedicine() {
    this.util.openBackDrop();
    this.warehouseProvider.getAllUsedMedicineOfMedicineWarehouse(this.medicineWarehouse.id)
      .then((usedMedicines: Array<usedMedicine>) => {
        if (usedMedicines && usedMedicines.length) {
          this.usedMedicines = usedMedicines;
          this.setFilteredItems();
        }
        this.util.closeBackDrop();
      })
      .catch((err) => {
        console.log(err);
        this.util.closeBackDrop();
        this.util.showToast(MESSAGE.vi.ERROR_OCCUR);
      })
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
    let usedMedicines = this.util.deepClone(this.usedMedicines);
    usedMedicines.forEach((usedMedicine: usedMedicine) => {
      usedMedicine['pigCode'] = usedMedicine.forPigId.pigCode;
      usedMedicine['farmName'] = usedMedicine.forPigId.house.section.farm.name;
      usedMedicine['sectionName'] = usedMedicine.forPigId.house.section.name;
      usedMedicine['houseName'] = usedMedicine.forPigId.house.name;
      usedMedicine['dateDisplay'] = this.util.convertDate(usedMedicine.date);
      usedMedicine['medicineName'] = usedMedicine.medicineWarehouse.medicine.name;
      usedMedicine['unitName'] = this.unit_util[usedMedicine.unit].name;
      usedMedicine['employeeName'] = usedMedicine.employee.name;
    });
    this.filterProvider.input = usedMedicines;
    this.filterProvider.searchText = searchItem;
    this.filterProvider.searchWithText = this.filter_default;
    this.filterProvider.searchWithRange = {};
    return this.filterProvider.filter().sort((a: usedMedicine, b: usedMedicine) =>
      (new Date(a.createdAt) > new Date(b.createdAt)) ? -1 : 1
    );
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
}
