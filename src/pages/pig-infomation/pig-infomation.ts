import { Component, ViewChild, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { pig, breeds, house, healthStatus, footType } from '../../common/entity';
import { PigsProvider } from '../../providers/pigs/pigs';
import { Utils } from '../../common/utils';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { VARIABLE } from '../../common/const';


@IonicPage()
@Component({
  selector: 'page-pig-infomation',
  templateUrl: 'pig-infomation.html',
})
export class PigInfomationPage {
  @ViewChild('chart') chart;
  @Input() public pig: pig;

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public pigProvider: PigsProvider,
    public util: Utils,
    public deployData: DeployDataProvider
  ) {
    if (this.navParams.data.pig) {
      this.pig = this.navParams.data.pig;
    }

    this.init();
    this.pig['birthdayDisplay'] = this.util.convertDate(this.pig.birthday);
  }

  ionViewDidLoad() {
    this.pigProvider.ViewIndexChart(this.pig, this.chart.nativeElement);
  }

  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    this.init();
  }


  public breed = new breeds();
  public house = new house();
  public mother = new pig();
  public father = new pig();
  public healthStatus = new healthStatus();
  public foot = new footType();
  public gender: any;

  init() {
    this.breed = this.deployData.get_breed_by_id(this.pig.breedId);
    this.house = this.deployData.get_house_by_id(this.pig.houseId);
    this.healthStatus = this.deployData.get_healthstatus_by_id(this.pig.healthStatusId);
    this.foot = this.deployData.get_foot_by_id(this.pig.footTypeId);
    let parent = this.deployData.get_parent_of_pig(this.pig);
    this.gender = VARIABLE.GENDER;

    if (parent.mother) this.mother = parent.mother;
    if (parent.father) this.father = parent.father;
  }
}
