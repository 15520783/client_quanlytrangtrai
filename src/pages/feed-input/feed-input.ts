import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { feeds, foodWareHouse, employee, foodUnits } from '../../common/entity';
import { ValidateNumber } from '../../validators/number.validator';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { Utils } from '../../common/utils';
import { KEY } from '../../common/const';
import { ActivitiesProvider } from '../../providers/activities/activities';

@IonicPage()
@Component({
  selector: 'page-feed-input',
  templateUrl: 'feed-input.html',
})
export class FeedInputPage {

  public credentialsForm: FormGroup;
  public submitAttempt: boolean = false;

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

      // section_id: [this.house.section.id, Validators.compose([Validators.required, Validators.maxLength(1000)])],
      // type_id: [this.house.typeId, Validators.compose([Validators.required])],
      // houseCode: [this.house.houseCode, Validators.compose([Validators.required, Validators.maxLength(1000)])],
      // name: [this.house.name, Validators.compose([Validators.required, Validators.maxLength(1000)])],
      // position: [this.house.position, Validators.compose([Validators.required, Validators.maxLength(1000)])],
      // founding: [this.house.founding, Validators.compose([Validators.required])],
      // manager:[this.house.manager,Validators.compose([Validators.required])],
      // status: this.house.status,
      // description: [this.house.description, Validators.compose([Validators.required, Validators.maxLength(1000)])],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedInputPage');
  }


  sectionChange(e) {
    this.houses = this.deployData.get_houses_of_section(e.valueId);
    this.houses.forEach((house) => {
      house['value'] = house.id;
    });
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
      console.log(this.navParams.data.foodWareHouse);
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
      let pigs = this.deployData.get_pigs_of_house(this.houseId)
      let foodUnit: foodUnits = this.foodUnits[this.unit];
      this.date = this.credentialsForm.value.date;
      this.description = this.credentialsForm.value.description;
      pigs.forEach((pig) => {
        let feed = new feeds();
        feed.foodWarehouse = this.foodWareHouse;
        feed.pig = pig;
        feed.employee = this.employee;
        feed.date = this.date;
        feed.quantity = (foodUnit.quantity * this.quantity) / pigs.length;
        feed.unit = this.unit;
        feed.description = this.description;
        this.feeds.push(feed)
      })
      this.activitiesProvider.createFeeds(this.feeds)
        .then((feeds) => {
          console.log(feeds);
          this.navCtrl.pop();
        })
        .catch((err) => { })
    }

    // this.navParams.get('callback')(this.house);
    // this.house = this.credentialsForm.value;
  }
}
