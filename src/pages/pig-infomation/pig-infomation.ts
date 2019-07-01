import { Component, Input, ViewChild } from '@angular/core';
import { Events, IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { breeds, footType, gentialType, healthStatus, house, pig, pregnancyStatus } from '../../common/entity';

import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { PigInputPage } from '../pig-input/pig-input';
import { PigsProvider } from '../../providers/pigs/pigs';
import { UserProvider } from '../../providers/user/user';
import { Utils } from '../../common/utils';
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
    public deployData: DeployDataProvider,
    public userProvider:UserProvider,
    public event:Events
  ) {
    if (this.navParams.data.pig) {
      this.pig = this.navParams.data.pig;
    }

    this.init();
    
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
  public gentitalType = new gentialType();
  public pregnancyStatus = new pregnancyStatus();
  public foot = new footType();
  public gender: any;
  public status: any = {};


  init() {
    this.breed = this.deployData.get_breed_by_id(this.pig.breedId);
    this.house = this.deployData.get_house_by_id(this.pig.houseId);
    this.healthStatus = this.deployData.get_healthstatus_by_id(this.pig.healthStatusId);
    this.gentitalType = this.deployData.get_gentialtype_by_id(this.pig.gentialTypeId);
    this.pregnancyStatus = this.deployData.get_pregnancystatus_by_id(this.pig.pregnancyStatusId);
    this.status = this.deployData.get_object_list_key_of_status();
    this.foot = this.deployData.get_foot_by_id(this.pig.footTypeId);
    let parent = this.deployData.get_parent_of_pig(this.pig);
    this.gender = VARIABLE.GENDER;
    this.pig['birthdayDisplay'] = this.util.convertDate(this.pig.birthday);

    if (parent.mother) this.mother = parent.mother;
    if (parent.father) this.father = parent.father;
  }

  /**
   * Cập nhật heo
   */
  edit() {
    let callback = (pig: pig) => {
      if (pig) {
        let pigParam = this.deployData.get_pig_object_to_send_request(pig);
        this.pigProvider.updatePig(pigParam)
        .then((updated_pig:pig)=>{
          if(updated_pig){
            this.pigProvider.updatedPig(pig);
            if(this.navParams.data.callbackUpdate){
              this.navParams.data.callbackUpdate(updated_pig);
            }
            this.pig = updated_pig;
            this.init();
          }
          this.navCtrl.pop();
        })
        .catch(err=>{
          console.log(err);
          return err;
        })
      }
    }
    
    this.navCtrl.push(PigInputPage, { pigId: this.pig.id, callback: callback });
  }

  /**
   * Xóa heo
   */
  remove(){
    let pigParam = this.deployData.get_pig_object_to_send_request(this.util.deepClone(this.pig));
    this.pigProvider.removePig(pigParam)
    .then((isOk)=>{
      if(isOk){
        this.pigProvider.removedPig(this.pig);
        if(this.navParams.data.callbackRemove){
          this.navParams.get('callbackRemove')(this.pig);
        }
      }
    })
    .catch((err)=>{
      console.log(err);
      return err;
    })
  }
}
