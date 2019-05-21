import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { pig, issuesPigs, issues, breedings, sperms, mating, matingDetails } from '../../common/entity';
import { VARIABLE } from '../../common/const';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { ActivitiesProvider } from '../../providers/activities/activities';
import { NavController, FabContainer, Events } from 'ionic-angular';
import { HealthInputPage } from '../../pages/health-input/health-input';
import { PigsProvider } from '../../providers/pigs/pigs';
import { BreedingInputPage } from '../../pages/breeding-input/breeding-input';
import { SpermInputPage } from '../../pages/sperm_input/sperm_input';
import { PigInputPage } from '../../pages/pig-input/pig-input';
import { MatingInputPage } from '../../pages/mating-input/mating-input';
import { Utils } from '../../common/utils';


@Component({
  selector: 'list-fab-button-pig',
  templateUrl: 'list-fab-button-pig.html'
})
export class ListFabButtonPigComponent {
  @ViewChild('fab') public fab : FabContainer;

  @Input() sectionTypeId: any;
  @Input() protected pig: pig;

  public statusPig: any = {};
  public statusObjectKey: any = {};
  public add_to_sale_list;
  public breeding:Array<any>;
  public sperm;
  public gender;
  public mating;

  constructor(
    public deployData:DeployDataProvider,
    public activitiesProvider:ActivitiesProvider,
    public navCtrl: NavController,
    public pigProvider:PigsProvider,
    public util:Utils,
    public event: Events
  ) {
    this.statusPig = {
      WAIT_FOR_SALE: VARIABLE.STATUS_PIG.WAIT_FOR_SALE,
      WAIT_FOR_MATING: VARIABLE.STATUS_PIG.WAIT_FOR_MATING,
      MATING: VARIABLE.STATUS_PIG.MATING,
      MATED: VARIABLE.STATUS_PIG.MATED,
      FARROWING: VARIABLE.STATUS_PIG.FARROWING,
      NEWBORN:VARIABLE.STATUS_PIG.NEWBORN
    }

    this.breeding = [
      VARIABLE.SECTION_TYPE[1].id,
      VARIABLE.SECTION_TYPE[7].id,
    ];

    this.sperm = [
      VARIABLE.SECTION_TYPE[2].id
    ];

    this.mating = [
      VARIABLE.SECTION_TYPE[3].id
    ]

    this.gender = {
      MALE: VARIABLE.gender[0].value,
      FEMALE: VARIABLE.gender[1].value,
    }

    this.add_to_sale_list  = [
      VARIABLE.SECTION_TYPE[1].id,
      VARIABLE.SECTION_TYPE[2].id,
      VARIABLE.SECTION_TYPE[3].id,
      VARIABLE.SECTION_TYPE[4].id,
      VARIABLE.SECTION_TYPE[5].id,
      VARIABLE.SECTION_TYPE[6].id,
      VARIABLE.SECTION_TYPE[7].id,
      VARIABLE.SECTION_TYPE[8].id,
    ]
  }

  ngAfterContentInit(): void {
    // if(this.pig){
    //   this.pig.house = this.deployData.get_house_by_id(this.pig.houseId);
    //   this.sectionTypeId = this.pig.house.section.typeId;
    // }
  }

  ngOnInit(): void {
    this.statusObjectKey = this.deployData.get_object_list_key_of_status();    
  }

  /**
   * Thêm vấn đề của heo
   */
  health_input() {
    let callback = (healthInput: { issuePig: issuesPigs, issueList: Array<issues> }) => {
      if (healthInput) {
        let issuesPig: Array<any> = [];
        let issues = this.deployData.get_object_list_key_of_pig();
        healthInput.issueList.forEach((issue) => {
          issuesPig.push({
            pig: healthInput.issuePig.pig,
            date: healthInput.issuePig.date,
            issue: issues[issue.id],
            employee: healthInput.issuePig.employee,
            status: VARIABLE.ISSUE_PIG_STATUS.DECTECTION.id,
            description: '',
          })
        })

        this.activitiesProvider.createIssuePig(issuesPig)
          .then((newIssuesPig: Array<issuesPigs>) => {
            if (newIssuesPig) {
              this.publishEvenPigChange(this.pig);
            }
            this.navCtrl.pop();
          })
          .catch((err) => {
            console.log(err);
          })
      }
    }
    this.closeFabList();
    this.navCtrl.push(HealthInputPage, { pig: this.pig, callback: callback });
  }


   /**
   * Thực hiện thêm thông tin lên giống
   */
  breeding_input() {
    let callback = data => {
      if (data) {
        this.activitiesProvider.createBreeding(data)
          .then((newBreeding: breedings) => {
            if (newBreeding) {
              this.pig.statusId = newBreeding.pig.status.id;
              this.pigProvider.updatedPig(this.pig);
              this.publishEvenPigChange(this.pig);
            }
            this.navCtrl.pop();
          })
          .catch((err: Error) => { })
      }
    }
    this.closeFabList();
    this.navCtrl.push(BreedingInputPage, { pig: this.pig, callback: callback });
  }


  /**
   * Thực hiện thêm thông tin lấy tinh heo
   */
  sperm_input() {
    let callback = (data: sperms) => {
      this.activitiesProvider.createSperm(data)
        .then((newSperm: sperms) => {
          if (newSperm) {
            console.log(newSperm);
            this.publishEvenPigChange(this.pig);
          }
          this.navCtrl.pop();
        })
        .catch((err: Error) => {
          return err;
        })
    }
    this.closeFabList();
    this.navCtrl.push(SpermInputPage, { pig: this.pig, callback: callback });
  }

  /**
   * Thêm thông tin lên giống
   */
  mating_input() {
    let callback = (data: { mating: mating, matingDetail: Array<matingDetails> }) => {

      data.mating.mother = this.deployData.get_pig_by_id(data.mating.motherId);
      if (data.mating.typeId == VARIABLE.MATING_TYPE.SPERM.value) {
        if (data.matingDetail[1].sperm) {
          data.mating.status = VARIABLE.MATING_STATUS.COMPLETE.codeName;
        } else {
          data.matingDetail.splice(1, 1);
          data.mating.status = VARIABLE.MATING_STATUS.PROCESSING.codeName;
        }
      } else {
        data.mating.status = VARIABLE.MATING_STATUS.COMPLETE.codeName;
        data.mating.fatherId = this.deployData.get_pig_by_id(data.mating.fatherId).id;
        data.matingDetail = [];
      }

      this.activitiesProvider.createMating(data)
        .then((newMating: { mating: mating, matingDetail: Array<matingDetails> }) => {
          if (newMating) {
            this.navCtrl.pop();
            this.pig.statusId = newMating.mating.mother.status.id;
            this.pigProvider.updatedPig(this.pig);
            this.publishEvenPigChange(this.pig);
          }
        })
        .catch((err: Error) => {
          console.log(err);
          return err;
        })
    }
    this.closeFabList();
    this.navCtrl.push(MatingInputPage, { pig: this.pig, callback: callback });
  }



  /**
   * Thực hiện cập nhật heo và chuyển khu
   */
  transferSection() {
    let callback = (pig: pig) => {
      pig = this.deployData.get_pig_object_to_send_request(pig);
      this.pigProvider.updatePig(pig)
        .then((updatedPig: pig) => {
          if (updatedPig && updatedPig.id) {
            this.pig = updatedPig;
            this.publishEvenPigChange(this.pig);
          }
          this.navCtrl.pop();
        })
        .catch((err: Error) => { })
    }
    this.closeFabList();    
    this.navCtrl.push(PigInputPage, { pigId: this.pig.id, isTransferSection: true, callback: callback })
  }

  /**
   * Thêm vào danh sách chờ bán
   */
  forwardToSaleWaiting() {
    let statusSaleWaiting = this.deployData.get_status_saleWaiting_of_pig(this.pig.statusId);
    let pigUpdate: pig = this.util.deepClone(this.pig);
    pigUpdate.statusId = statusSaleWaiting.id;
    pigUpdate = this.deployData.get_pig_object_to_send_request(pigUpdate);
    this.pigProvider.updatePig(pigUpdate)
      .then((pig: pig) => {
        if (pig && pig.id) {
          this.pig.statusId = pig.statusId;
          this.closeFabList();
          this.publishEvenPigChange(this.pig);
        }
      })
      .catch((err: Error) => { })
  }

  /**
   * Thực hiện hủy trạng thái chờ bán
   */
  cancelSaleWaiting() {
    let statusSaleWaiting = this.deployData.get_status_by_id(this.pig.statusId);
    let pig = this.util.deepClone(this.pig);
    pig.statusId = statusSaleWaiting.previousStatus;
    pig = this.deployData.get_pig_object_to_send_request(pig);
    this.pigProvider.updatePig(pig)
      .then((updatedPig: pig) => {
        if (updatedPig && updatedPig.id) {
          this.pig.statusId = updatedPig.statusId;
          this.closeFabList();
          this.publishEvenPigChange(this.pig);
        }
      })
      .catch((err: Error) => { })
  }


  closeFabList(){
    this.fab.close();
  }

  publishEvenPigChange(pig){
    this.event.publish('pig-list-section:PigChange',pig);
  }
}
