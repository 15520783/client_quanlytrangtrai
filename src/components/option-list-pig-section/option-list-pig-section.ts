import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Events, ModalController, NavController } from 'ionic-angular';
import { breedings, issues, issuesPigs, pig, sperms, status } from '../../common/entity';

import { ActivitiesProvider } from '../../providers/activities/activities';
import { BirthInputPage } from '../../pages/birth-input/birth-input';
import { BreedingInputPage } from '../../pages/breeding-input/breeding-input';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { HealthInputPage } from '../../pages/health-input/health-input';
import { PigInputPage } from '../../pages/pig-input/pig-input';
import { PigSummaryPage } from '../../pages/pig-summary/pig-summary';
import { PigsProvider } from '../../providers/pigs/pigs';
import { ReviewOffsetPigPage } from '../../pages/review-offset-pig/review-offset-pig';
import { SpermInputPage } from '../../pages/sperm_input/sperm_input';
import { UserProvider } from '../../providers/user/user';
import { Utils } from '../../common/utils';
import { VARIABLE } from '../../common/const';

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
  public add_to_farm_transfer_list;
  public view_info;
  public breeding;
  public sperm;
  public mating;
  public weaning;
  public mated;
  public farrow;
  public gender;
  public statusObjectKey: any = {};

  public move_local = [];

  constructor(
    public pigProvider: PigsProvider,
    public deployData: DeployDataProvider,
    public navCtrl: NavController,
    public util: Utils,
    public events: Events,
    public activitiesProvider: ActivitiesProvider,
    public modalCtrl: ModalController,
    public userProvider: UserProvider
  ) {
    this.statusPig = {
      UNKNOW: VARIABLE.STATUS_PIG.UNKNOW,
      WAIT_FOR_SALE: VARIABLE.STATUS_PIG.WAIT_FOR_SALE,
      WAIT_FOR_MATING: VARIABLE.STATUS_PIG.WAIT_FOR_MATING,
      MATING: VARIABLE.STATUS_PIG.MATING,
      MATED: VARIABLE.STATUS_PIG.MATED,
      FARROWING: VARIABLE.STATUS_PIG.FARROWING,
      NEWBORN: VARIABLE.STATUS_PIG.NEWBORN,
      WAIT_FOR_TRANSFER: VARIABLE.STATUS_PIG.WAIT_FOR_TRANSFER,
      SOLD: VARIABLE.STATUS_PIG.SOLD
    }

    this.add_to_sale_list = this.add_to_farm_transfer_list = this.view_info = [
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

    this.weaning = [
      VARIABLE.SECTION_TYPE[5].id
    ]
  }

  public review_offset = [
    VARIABLE.SECTION_TYPE[7].id
  ]

  ngOnInit(): void {
    this.statusObjectKey = this.deployData.get_object_list_key_of_status();
    this.statusTarget = this.deployData.get_status_by_id(this.pig.statusId);

    switch ((this.sectionTypeId).toString()) {
      case VARIABLE.SECTION_TYPE[1].id: {
        VARIABLE.SECTION_TYPE.forEach(e => {
          this.move_local.push(e.id)
        })
        break;
      }
      case VARIABLE.SECTION_TYPE[2].id: {
        this.move_local = [VARIABLE.SECTION_TYPE[1].id,VARIABLE.SECTION_TYPE[2].id, VARIABLE.SECTION_TYPE[3].id];
        break;
      }
      case VARIABLE.SECTION_TYPE[3].id: {
        if (this.pig.gender == 1) {
          this.move_local = [VARIABLE.SECTION_TYPE[1].id,VARIABLE.SECTION_TYPE[2].id, VARIABLE.SECTION_TYPE[3].id]
        } else if (this.pig.gender == 2) {
          this.move_local = [VARIABLE.SECTION_TYPE[1].id,VARIABLE.SECTION_TYPE[3].id, VARIABLE.SECTION_TYPE[4].id]
        }
        break;
      }
      case VARIABLE.SECTION_TYPE[4].id: {
        this.move_local = [VARIABLE.SECTION_TYPE[1].id,VARIABLE.SECTION_TYPE[4].id, VARIABLE.SECTION_TYPE[3].id, VARIABLE.SECTION_TYPE[5].id];
        break;
      }
      case VARIABLE.SECTION_TYPE[5].id: {
        if (this.statusTarget.code == VARIABLE.STATUS_PIG.WEANING || this.statusTarget.code == VARIABLE.STATUS_PIG.FARROWING) {
          this.move_local = [VARIABLE.SECTION_TYPE[1].id,VARIABLE.SECTION_TYPE[5].id, VARIABLE.SECTION_TYPE[3].id];
        } else if (this.statusTarget.code == VARIABLE.STATUS_PIG.GROWING) {
          this.move_local = [VARIABLE.SECTION_TYPE[1].id,VARIABLE.SECTION_TYPE[5].id,VARIABLE.SECTION_TYPE[6].id];
        }
        else{
          VARIABLE.SECTION_TYPE.forEach(e => {
            this.move_local.push(e.id)
          })
        }
        break;
      }
      case VARIABLE.SECTION_TYPE[6].id: {
        this.move_local = [VARIABLE.SECTION_TYPE[1].id,VARIABLE.SECTION_TYPE[6].id, VARIABLE.SECTION_TYPE[7].id];
        break;
      }
      case VARIABLE.SECTION_TYPE[7].id: {
        this.move_local = [VARIABLE.SECTION_TYPE[1].id,VARIABLE.SECTION_TYPE[7].id, VARIABLE.SECTION_TYPE[1].id];
        break;
      }
      default:
        this.move_local = [];
        break;
    }
  }

  @Output() pigChange = new EventEmitter();

  viewDetail() {

    this.navCtrl.push(PigSummaryPage, { pig: this.pig });
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
   * Thêm thông tin phối giống
   */
  // mating_input() {
  //   let callback = (data: { mating: mating, matingDetail: Array<matingDetails> }) => {

  //     data.mating.mother = this.deployData.get_pig_by_id(data.mating.motherId);
  //     if (data.mating.typeId == VARIABLE.MATING_TYPE.SPERM.value) {
  //       if (data.matingDetail[1].sperm) {
  //         data.mating.status = VARIABLE.MATING_STATUS.COMPLETE.codeName;
  //       } else {
  //         data.matingDetail.splice(1, 1);
  //         data.mating.status = VARIABLE.MATING_STATUS.PROCESSING.codeName;
  //       }
  //     } else {
  //       data.mating.status = VARIABLE.MATING_STATUS.COMPLETE.codeName;
  //       data.mating.fatherId = this.deployData.get_pig_by_id(data.mating.fatherId).id;
  //       data.matingDetail = [];
  //     }

  //     this.activitiesProvider.createMating(data)
  //       .then((newMating: { mating: mating, matingDetail: Array<matingDetails> }) => {
  //         if (newMating) {
  //           this.navCtrl.pop();
  //           this.pig.statusId = newMating.mating.mother.status.id;
  //           this.pigProvider.updatedPig(this.pig);
  //           this.publishPigChangeEvent(this.pig);
  //         }
  //       })
  //       .catch((err: Error) => {
  //         console.log(err);
  //         return err;
  //       })
  //   }
  //   this.navCtrl.push(MatingInputPage, { pig: this.pig, callback: callback });
  // }

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
   * Thêm vào danh sách chờ chuyển sang trang trại khác
   */
  forwardToFarmTransferWating() {
    let statusTransferWaiting = this.deployData.get_status_farm_transferWaiting_of_pig(this.pig.statusId);
    let pigUpdate: pig = this.util.deepClone(this.pig);
    pigUpdate.statusId = statusTransferWaiting.id;
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
   * Thực hiện hủy trạng thái chờ chuyển trại
   */
  cancelFarmTransferWating() {
    let statusFarmTransferWaiting = this.deployData.get_status_by_id(this.pig.statusId);
    let pig = this.util.deepClone(this.pig);
    pig.statusId = statusFarmTransferWaiting.previousStatus;
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

    this.navCtrl.push(PigInputPage, {
      pigId: this.pig.id,
      isTransferSection: true,
      requiredSectionType: this.move_local,
      callback: callback
    })
  }

  /**
   * Thêm vấn đề của heo
   */
  health_input() {
    let callback = (healthInput: { issuePig: issuesPigs, issueList: Array<issues> }) => {
      if (healthInput) {
        let issuesPig: Array<any> = [];
        healthInput.issueList.forEach((issue) => {
          let newIssuePig = new issuesPigs();
          newIssuePig.pig = this.deployData.get_pig_object_to_send_request(healthInput.issuePig.pig),
            newIssuePig.date = healthInput.issuePig.date,
            newIssuePig.issue = issue,
            newIssuePig.employee = healthInput.issuePig.employee,
            newIssuePig.status = VARIABLE.ISSUE_PIG_STATUS.DECTECTION.name,
            newIssuePig.description = '',
            issuesPig.push(newIssuePig);
        })

        this.activitiesProvider.createIssuePig(issuesPig)
          .then((newIssuesPig: Array<issuesPigs>) => {
            if (newIssuesPig) {
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
  // markedAbortion() {
  //   let abortionStatus = this.deployData.get_status_pig_by_status_code(VARIABLE.STATUS_PIG.ABORTION);
  //   let pigUpdate: pig = this.util.deepClone(this.pig);
  //   pigUpdate.statusId = abortionStatus.id;
  //   pigUpdate = this.deployData.get_pig_object_to_send_request(pigUpdate);
  //   this.pigProvider.updatePig(pigUpdate)
  //     .then((pig: pig) => {
  //       if (pig && pig.id) {
  //         this.pig = pig;
  //         this.publishPigChangeEvent(this.pig);
  //       }
  //     })
  //     .catch((err: Error) => { })
  // }

  // birth_input() {
  //   this.navCtrl.push(BirthInputPage, { pig: this.pig });
  // }


  /**
   * Thêm vào danh sách heo cai sữa
   */
  weaningMarked() {
    let pigUpdate: pig = this.util.deepClone(this.pig);
    let currentStatus = this.deployData.get_status_by_id(this.pig.statusId);
    if (currentStatus.code == VARIABLE.STATUS_PIG.FARROWING) {
      let weaningStatus = this.deployData.get_status_pig_by_status_code(VARIABLE.STATUS_PIG.WEANING);
      pigUpdate.statusId = weaningStatus.id;
    } else if (currentStatus.code == VARIABLE.STATUS_PIG.NEWBORN) {
      let growingStatus = this.deployData.get_status_pig_by_status_code(VARIABLE.STATUS_PIG.GROWING);
      pigUpdate.statusId = growingStatus.id;
    }
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

  birth_input() {
    this.navCtrl.push(BirthInputPage, { pig: this.pig });
  }


  publishPigChangeEvent(pig) {
    this.pigChange.emit(pig);
  }

  reviewOffset() {
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

    this.util.openBackDrop();
    this.pigProvider.reviewOffset(this.pig.id)
      .then((res: any) => {
        if (res) {
          this.navCtrl.push(ReviewOffsetPigPage, { pig: this.pig, classification: res.classification, callback: callback })
        }
        this.util.closeBackDrop();
      })
      .catch(err => {
        this.util.closeBackDrop();
        return err
      })

  }
}
