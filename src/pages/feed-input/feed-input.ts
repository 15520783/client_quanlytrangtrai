import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { employee, feeds, foodUnits, foodWareHouse, pig } from '../../common/entity';

import { ActivitiesProvider } from '../../providers/activities/activities';
import { Component } from '@angular/core';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { KEY } from '../../common/const';
import { Utils } from '../../common/utils';
import { ValidateNumber } from '../../validators/number.validator';

@IonicPage()
@Component({
  selector: 'page-feed-input',
  templateUrl: 'feed-input.html',
})
export class FeedInputPage {

  public credentialsForm: FormGroup;
  public submitAttempt: boolean = false;
  public pigs: Array<pig> = [];

  public feeds: Array<feeds> = [];
  public foodWareHouse = new foodWareHouse();
  public sectionId: string;
  public houseId: string;
  public quantity: number;
  public unit: number;
  public sections;
  public houses;
  public units;
  public description = '';
  public date = '';
  public employee: employee = new employee();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public deployData: DeployDataProvider,
    public activitiesProvider: ActivitiesProvider,
    public util: Utils
  ) {
    this.init();
    this.credentialsForm = this.formBuilder.group({
      sectionId: [this.sectionId, Validators.compose([Validators.required, Validators.maxLength(1000)])],
      houseId: [this.houseId, Validators.compose([Validators.required, Validators.maxLength(1000)])],
      date: [this.date, Validators.compose([Validators.required])],
      quantity: [this.quantity, Validators.compose([Validators.required, ValidateNumber])],
      unit: [this.unit, Validators.compose([Validators.required, Validators.maxLength(1000)])],
      description: [this.description, Validators.compose([Validators.required, Validators.maxLength(1000)])],
    });
  }

  ionViewDidLoad() {
  }


  sectionChange(e) {
    this.pigs = [];
    this.houses = this.deployData.get_houses_of_section(e.valueId);
    this.houses.forEach((house) => {
      house['value'] = house.id;
    });
  }

  houseChange(house) {
    this.pigs = this.deployData.get_pigs_of_house(house.valueId);
  }

  public foodUnits: any = {};

  init() {
    this.foodUnits = this.deployData.get_object_list_key_of_foodUnit();
    this.util.getKey(KEY.USER).then((emp) => {
      this.employee = emp;
    })
    this.units = this.deployData.get_foodUnit_list_for_select();
    this.unit = this.units[0].value;
    if (this.navParams.data.foodWareHouse) {
      this.foodWareHouse = this.navParams.data.foodWareHouse;
      console.log(this.foodWareHouse);
    }
    if (this.navParams.data.farmId) {
      this.sections = this.deployData.get_sections_of_farm(this.navParams.data.farmId);
      this.sections.forEach((section) => {
        section['value'] = section.id;
      });
    }
  }



  onSubmit() {
    this.submitAttempt = true;
    if (this.credentialsForm.valid) {
      this.houseId = this.credentialsForm.value.houseId;
      this.unit = this.credentialsForm.value.unit;
      this.quantity = this.credentialsForm.value.quantity;
      let pigs = this.deployData.get_pigs_of_house(this.houseId);
      let foodUnit: foodUnits = this.foodUnits[this.unit];
      this.date = this.credentialsForm.value.date;
      this.description = this.credentialsForm.value.description;

      let used_quantity = this.quantity * foodUnit.quantity;
      let remain_quantity = parseFloat(this.foodWareHouse.remain) * this.foodWareHouse.unit.quantity;
      if (used_quantity > remain_quantity) {
        this.util.showToast('Số lượng tồn kho không đủ');
      } else {

        this.feeds = [];
        pigs.forEach((pig) => {
          let feed = new feeds();
          feed.foodWarehouse = this.foodWareHouse;
          feed.pig = pig;
          feed.employee = this.employee;
          feed.date = this.date;
          feed.quantity = this.quantity / pigs.length;
          feed.unit = this.unit;
          feed.description = this.description;
          this.feeds.push(feed);
        })


        this.activitiesProvider.createFeeds(this.feeds)
          .then((feeds) => {
            this.navCtrl.pop();
            this.navParams.get('callback')(feeds);
          })
          .catch((err) => { })
      }

    }

    // this.navParams.get('callback')(this.house);
    // this.house = this.credentialsForm.value;
  }
}
