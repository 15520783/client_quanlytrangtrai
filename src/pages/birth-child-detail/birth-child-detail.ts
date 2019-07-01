import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { births, invoicesPig, pig } from '../../common/entity';

import { ChildPigInputPage } from '../child-pig-input/child-pig-input';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { FilterProvider } from '../../providers/filter/filter';
import { FormControl } from '@angular/forms';
import { InvoicesProvider } from '../../providers/invoices/invoices';
import { PigsProvider } from '../../providers/pigs/pigs';
import { UserProvider } from '../../providers/user/user';
import { Utils } from '../../common/utils';
import { VARIABLE } from '../../common/const';

@IonicPage()
@Component({
  selector: 'page-birth-child-detail',
  templateUrl: 'birth-child-detail.html',
})
export class BirthChildDetailPage {

  public birth: births = new births();
  @Input() pigs: Array<pig> = [];
  public roleInput: any;
  public breeds: any;
  public houses: any;
  public status: any;
  public gender:any;


  public mainAttribute = "pigCode";
  public attributes = [
    { name: "breedName", label: 'Giống' },
    { name: "genderName", label: 'Giới tính' },
    { name: "birthdayDisplay", label: 'Ngày sinh' },
    { name: "originWeight", label: 'Cân nặng' },
    { name: "statusName", label: 'Hiện trạng' },
    { name: "farmName", label: 'Trang trại' },
    { name: "sectionName", label: 'Khu' },
    { name: "houseName", label: 'Nhà' },

  ];


  public placeholderSearch: string = 'Tìm kiếm heo con'
  public filter_default: Array<string> = ["pigCode", "breedName", "gender", "originWeight", "statusName", "farmName", "sectionName", "houseName"];

  public page_Idx: number = 1;
  public page_Total: number = 0;
  public rows: Array<any> = [];

  protected searchControl: FormControl = new FormControl();
  protected searchTerm: string = '';

  public visible_items: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public filterProvider: FilterProvider,
    public deployData: DeployDataProvider,
    public invoiceProvider: InvoicesProvider,
    public pigProvider: PigsProvider,
    public platform: Platform,
    public userProvider: UserProvider,
    public util:Utils
  ) {
    this.init();

    if (this.navParams.data.birth) {
      this.birth = this.navParams.data.birth;
      this.pigs = this.deployData.get_child_pig_of_birth(this.birth);
      this.setFilteredItems();
    }
  }
  public setFilteredItems() {
    setTimeout(() => {
      this.rows = this.filterItems(this.searchTerm);
      this.page_Total = this.rows.length % 50 === 0 ? parseInt(this.rows.length / 50 + '') : parseInt(this.rows.length / 50 + 1 + '');
      this.page_Idx = 1;
      this.visible_items = this.rows.slice(0, 50);
      if (document.getElementById('content'))
        document.getElementById('content').scrollTop = 0;
    }, 200);
  }

  public filterItems(searchItem) {
    this.pigs.forEach((pig) => {
      pig['breedName'] = this.breeds[pig.breedId]?this.breeds[pig.breedId].name+' '+this.breeds[pig.breedId].symbol:'Không xác định';
      pig['farmName'] = this.houses[pig.houseId].section.farm.name;
      pig['sectionName'] = this.houses[pig.houseId].section.name;
      pig['houseName'] = this.houses[pig.houseId].name;
      pig['statusName'] = this.status[pig.statusId].description;
      pig['genderName'] = this.gender[pig.gender].name;
      pig['birthdayDisplay'] = this.util.convertDate(pig.birthday);
    })
      ;
    this.filterProvider.input = this.pigs;
    this.filterProvider.searchText = searchItem;
    this.filterProvider.searchWithText = this.filter_default;

    this.filterProvider.searchWithRange = {}
    return this.filterProvider.filter().sort((a: pig, b: pig) =>
      (a.pigCode > b.pigCode) ? -1 : 1
    );
  }

  loadData(infiniteScroll) {
    setTimeout(() => {
      let start = 50 * this.page_Idx + 1;
      let end = start + 50;
      this.page_Idx++;

      this.visible_items.push.apply(this.visible_items, this.rows.slice(start, end));
      infiniteScroll.complete();
    }, 800);
  }



  init() {
    this.breeds = this.deployData.get_object_list_key_of_breeds();
    this.houses = this.deployData.get_object_list_key_of_house();
    this.status = this.deployData.get_object_list_key_of_status();
    this.gender = VARIABLE.GENDER;
  }

  input_child() {
    let callback = (childPig: pig) => {
      if (childPig) {
        let invoice = new invoicesPig();
        invoice.id = VARIABLE.INVOICE_ID[childPig.house.section.farm.id];
        let pig = this.deployData.get_pig_object_to_send_request(childPig);
        this.invoiceProvider.createPigInvoiceDetail({
          pigs: pig,
          invoicesPig: invoice
        })
          .then((response) => {
            if (response && response.pigs && response.invoicePigDetail) {
              this.pigProvider.updatedPig(response.pigs)
              this.pigs.push(response.pigs);
              this.setFilteredItems();
            }
            this.navCtrl.pop();
          })
          .catch((err: Error) => { })
      }

    }
    this.navCtrl.push(ChildPigInputPage, { birth: this.birth, callback: callback });
  }



  edit(item: pig) {
    let callback = (childPig: pig) => {
      if (childPig) {
        let pig = this.deployData.get_pig_object_to_send_request(childPig);
        this.pigProvider.updatePig(pig)
          .then((update_pig: pig) => {
            if (update_pig) {
              item = update_pig;
              this.setFilteredItems();
            }
            this.navCtrl.pop();
          })
          .catch((err) => { })
      }
    }
    item.originMotherId = this.birth.mating.mother.id;
    item.houseId = this.birth.mating.mother.house.id;
    this.navCtrl.push(ChildPigInputPage, { pig: item, callback: callback });
  }

  remove(item: pig) {

  }
}
