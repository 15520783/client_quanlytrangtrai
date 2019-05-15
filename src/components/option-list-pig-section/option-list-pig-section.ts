import { Component, Input, Output, EventEmitter } from '@angular/core';
import { VARIABLE } from '../../common/const';
import { pig, status, sperms, breedings, mating, matingDetails, issuesPigs, issues } from '../../common/entity';
import { PigsProvider } from '../../providers/pigs/pigs';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { NavController, Events } from 'ionic-angular';
import { PigViewPage } from '../../tabs/pig-view/pig-view';
import { Utils } from '../../common/utils';
import { BreedingInputPage } from '../../pages/breeding-input/breeding-input';
import { ActivitiesProvider } from '../../providers/activities/activities';
import { SpermInputPage } from '../../pages/sperm_input/sperm_input';
import { MatingInputPage } from '../../pages/mating-input/mating-input';
import { PigInputPage } from '../../pages/pig-input/pig-input';
import { HealthInputPage } from '../../pages/health-input/health-input';

@Component({
  selector: 'option-list-pig-section',
  templateUrl: 'option-list-pig-section.html'
})
export class OptionListPigSectionComponent {


  @Input() sectionTypeId: any;
  @Input() protected pig: pig;
  public statusTarget: status;

  public statusPig: any = {};
  public add_to_sale_list;
  public view_info;
  public breeding;
  public sperm;
  public mating;
  public mated;
  public farrow;
  public gender;
  public statusObjectKey: any = {};

  constructor(
    public pigProvider: PigsProvider,
    public deployData: DeployDataProvider,
    public navCtrl: NavController,
    public util: Utils,
    public events: Events,
    public activitiesProvider: ActivitiesProvider
  ) {
    this.statusPig = {
      WAIT_FOR_SALE: VARIABLE.STATUS_PIG.WAIT_FOR_SALE,
      WAIT_FOR_MATING: VARIABLE.STATUS_PIG.WAIT_FOR_MATING,
      MATING: VARIABLE.STATUS_PIG.MATING,
      MATED: VARIABLE.STATUS_PIG.MATED,
      FARROWING: VARIABLE.STATUS_PIG.FARROWING,
    }

    this.add_to_sale_list = this.view_info = [
      VARIABLE.SECTION_TYPE[1].id,
      VARIABLE.SECTION_TYPE[2].id,
      VARIABLE.SECTION_TYPE[3].id,
      VARIABLE.SECTION_TYPE[4].id,
      VARIABLE.SECTION_TYPE[5].id,
      VARIABLE.SECTION_TYPE[6].id,
      VARIABLE.SECTION_TYPE[7].id,
      VARIABLE.SECTION_TYPE[8].id,
    ]

    this.gender = {
      MALE: VARIABLE.gender[0].value,
      FEMALE: VARIABLE.gender[1].value,
    }

    this.breeding = [
      VARIABLE.SECTION_TYPE[1].id,
      VARIABLE.SECTION_TYPE[7].id,
    ];

    this.mating = [
      VARIABLE.SECTION_TYPE[3].id
    ]

    this.sperm = [
      VARIABLE.SECTION_TYPE[2].id
    ]

    this.mated = [
      VARIABLE.SECTION_TYPE[4].id
    ]

    this.farrow = [
      VARIABLE.SECTION_TYPE[5].id
    ]

    this.sectionTypeId = VARIABLE.SECTION_TYPE[this.sectionTypeId];
  }

  public move_local = [
    VARIABLE.SECTION_TYPE[1].id,
    VARIABLE.SECTION_TYPE[2].id,
    VARIABLE.SECTION_TYPE[3].id,
  ]

  ngOnInit(): void {
    this.statusObjectKey = this.deployData.get_object_list_key_of_status();
    this.statusTarget = this.deployData.get_status_by_id(this.pig.statusId);
  }

  @Output() pigChange = new EventEmitter();

  viewDetail() {
    this.navCtrl.push(PigViewPage, this.pig);
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
              // let statusPig = this.deployData.get_status_matingWait_of_pig(this.statusObjectKey[this.pig.statusId]);
              // this.pig.statusId = statusPig.id;
              this.pig.statusId = newBreeding.pig.status.id;
              this.pigProvider.updatedPig(this.pig);
              this.publishPigChangeEvent(this.pig);
            }
            this.navCtrl.pop();
          })
          .catch((err: Error) => { })
      }
    }
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

            this.pig.status
            this.publishPigChangeEvent(this.pig);
            console.log(newSperm);
          }
          this.navCtrl.pop();
        })
        .catch((err: Error) => {
          return err;
        })
    }
    this.navCtrl.push(SpermInputPage, { pig: this.pig, callback: callback });
  }

  /**
   * Thêm thông tin lên giống
   */
  mating_input() {
    let callback = (data: { mating: mating, matingDetail: Array<matingDetails> }) => {
      data.mating.mother = this.deployData.get_pig_by_id(data.mating.motherId);
      data.mating.father = this.deployData.get_pig_by_id(data.mating.fatherId);
      if (data.matingDetail[0].sperm.id == '0') {
        data.mating.status = VARIABLE.MATING_STATUS.COMPLETE.codeName;
        data.matingDetail.splice(1, 1);
      } else {
        if (data.matingDetail[1].sperm) {
          data.mating.status = VARIABLE.MATING_STATUS.COMPLETE.codeName;
        } else {
          data.matingDetail.splice(1, 1);
          data.mating.status = VARIABLE.MATING_STATUS.PROCCESSING.codeName;
        }
      }
      this.activitiesProvider.createMating(data)
        .then((newMating: { mating: mating, matingDetail: Array<matingDetails> }) => {
          if (newMating) {
            this.pig.statusId = newMating.mating.mother.status.id;
            // let statusPig = this.deployData.get_status_mated_of_pig(this.statusTarget);
            // this.pig.statusId = statusPig.id;
            this.pigProvider.updatedPig(this.pig);
            this.publishPigChangeEvent(this.pig);;
          }
          this.navCtrl.pop();
        })
        .catch((err: Error) => {
          console.log(err);
          return err;
        })
    }
    this.navCtrl.push(MatingInputPage, { pig: this.pig, callback: callback });
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
          this.pig = pig;
          this.publishPigChangeEvent(this.pig);
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
          this.pig = updatedPig;
          this.publishPigChangeEvent(this.pig);
        }
      })
      .catch((err: Error) => { })
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
            this.publishPigChangeEvent(this.pig);
          }
          this.navCtrl.pop();
        })
        .catch((err: Error) => { })
    }
    this.navCtrl.push(PigInputPage, { pigId: this.pig.id, isTransferSection: true, callback: callback })
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
              console.log(newIssuesPig);
            }
            this.navCtrl.pop();
          })
          .catch((err) => {
            console.log(err);
          })
      }
    }
    this.navCtrl.push(HealthInputPage, { pig: this.pig, callback: callback });
  }

  /**
   * Thêm vào danh sách heo mang thai
   */
  markedFarrow() {
    let farrowStatus = this.deployData.get_status_pig_by_status_code(VARIABLE.STATUS_PIG.FARROWING);
    let pigUpdate: pig = this.util.deepClone(this.pig);
    pigUpdate.statusId = farrowStatus.id;
    pigUpdate = this.deployData.get_pig_object_to_send_request(pigUpdate);
    this.pigProvider.updatePig(pigUpdate)
      .then((pig: pig) => {
        if (pig && pig.id) {
          this.pig = pig;
          this.publishPigChangeEvent(this.pig);
        }
      })
      .catch((err: Error) => { })
  }


  /**
   * Thêm vào danh sách heo sẩy thai
   */
  markedAbortion() {
    let abortionStatus = this.deployData.get_status_pig_by_status_code(VARIABLE.STATUS_PIG.ABORTION);
    let pigUpdate: pig = this.util.deepClone(this.pig);
    pigUpdate.statusId = abortionStatus.id;
    pigUpdate = this.deployData.get_pig_object_to_send_request(pigUpdate);
    this.pigProvider.updatePig(pigUpdate)
      .then((pig: pig) => {
        if (pig && pig.id) {
          this.pig = pig;
          this.publishPigChangeEvent(this.pig);
        }
      })
      .catch((err: Error) => { })
  }

  publishPigChangeEvent(pig) {
    this.pigChange.emit(pig);
  }
}
