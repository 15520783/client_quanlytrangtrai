import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Events, FabContainer, NavController } from 'ionic-angular';
import { breedings, issues, issuesPigs, pig, sperms } from '../../common/entity';

import { ActivitiesProvider } from '../../providers/activities/activities';
import { BreedingInputPage } from '../../pages/breeding-input/breeding-input';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { HealthInputPage } from '../../pages/health-input/health-input';
import { PigInputPage } from '../../pages/pig-input/pig-input';
import { PigsProvider } from '../../providers/pigs/pigs';
import { ReviewOffsetPigPage } from '../../pages/review-offset-pig/review-offset-pig';
import { SpermInputPage } from '../../pages/sperm_input/sperm_input';
import { UserProvider } from '../../providers/user/user';
import { Utils } from '../../common/utils';
import { VARIABLE } from '../../common/const';

@Component({
  selector: 'list-fab-button-pig',
  templateUrl: 'list-fab-button-pig.html'
})
export class ListFabButtonPigComponent {
  @ViewChild('fab') public fab: FabContainer;

  @Input() sectionTypeId: any;
  @Input() protected pig: pig;

  public statusPig: any = {};
  public statusObjectKey: any = {};
  public add_to_sale_list;
  public breeding: Array<any>;
  public sperm;
  public gender;
  public mating;
  public weaning;
  public review_offset;

  public move_local = [];

  constructor(
    public deployData: DeployDataProvider,
    public activitiesProvider: ActivitiesProvider,
    public navCtrl: NavController,
    public pigProvider: PigsProvider,
    public util: Utils,
    public event: Events,
    public userProvider: UserProvider
  ) {
    this.statusPig = {
      WAIT_FOR_SALE: VARIABLE.STATUS_PIG.WAIT_FOR_SALE,
      WAIT_FOR_MATING: VARIABLE.STATUS_PIG.WAIT_FOR_MATING,
      MATING: VARIABLE.STATUS_PIG.MATING,
      MATED: VARIABLE.STATUS_PIG.MATED,
      FARROWING: VARIABLE.STATUS_PIG.FARROWING,
      NEWBORN: VARIABLE.STATUS_PIG.NEWBORN,
      WAIT_FOR_TRANSFER: VARIABLE.STATUS_PIG.WAIT_FOR_TRANSFER,
      SOLD: VARIABLE.STATUS_PIG.SOLD
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

    this.weaning = [
      VARIABLE.SECTION_TYPE[5].id
    ]

    this.review_offset = [
      VARIABLE.SECTION_TYPE[7].id
    ]


    this.gender = {
      MALE: VARIABLE.gender[0].value,
      FEMALE: VARIABLE.gender[1].value,
    }

    this.add_to_sale_list = [
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
    let statusTarget = this.deployData.get_status_by_id(this.pig.statusId);

    switch ((this.sectionTypeId).toString()) {
      case VARIABLE.SECTION_TYPE[1].id: {
        VARIABLE.SECTION_TYPE.forEach(e => {
          this.move_local.push(e.id)
        })
        break;
      }
      case VARIABLE.SECTION_TYPE[2].id: {
        this.move_local = [VARIABLE.SECTION_TYPE[1].id,VARIABLE.SECTION_TYPE[2].id,VARIABLE.SECTION_TYPE[3].id];
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
        this.move_local = [VARIABLE.SECTION_TYPE[1].id,VARIABLE.SECTION_TYPE[4].id,VARIABLE.SECTION_TYPE[3].id, VARIABLE.SECTION_TYPE[5].id];
        break;
      }
      case VARIABLE.SECTION_TYPE[5].id: {
        if (statusTarget.code == VARIABLE.STATUS_PIG.WEANING || statusTarget.code == VARIABLE.STATUS_PIG.FARROWING) {
          this.move_local = [VARIABLE.SECTION_TYPE[1].id,VARIABLE.SECTION_TYPE[5].id, VARIABLE.SECTION_TYPE[3].id];
        } else if (statusTarget.code == VARIABLE.STATUS_PIG.GROWING) {
          this.move_local = [VARIABLE.SECTION_TYPE[1].id,VARIABLE.SECTION_TYPE[5].id,VARIABLE.SECTION_TYPE[6].id];
        }
        break;
      }
      case VARIABLE.SECTION_TYPE[6].id: {
        this.move_local = [VARIABLE.SECTION_TYPE[1].id,VARIABLE.SECTION_TYPE[6].id,VARIABLE.SECTION_TYPE[7].id];
        break;
      }
      case VARIABLE.SECTION_TYPE[7].id: {
        this.move_local = [VARIABLE.SECTION_TYPE[1].id,VARIABLE.SECTION_TYPE[7].id,VARIABLE.SECTION_TYPE[1].id];
        break;
      }
      default:
        this.move_local = [];
        break;
    }
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
  //           this.publishEvenPigChange(this.pig);
  //         }
  //       })
  //       .catch((err: Error) => {
  //         console.log(err);
  //         return err;
  //       })
  //   }
  //   this.closeFabList();
  //   this.navCtrl.push(MatingInputPage, { pig: this.pig, callback: callback });
  // }



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
    this.navCtrl.push(PigInputPage, { 
      pigId: this.pig.id, 
      isTransferSection: true, 
      requiredSectionType: this.move_local,
      callback: callback 
    })
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

  /**
   * Đánh dấu heo cai sữa
   */
  weaningMarked() {
    let pigUpdate: pig = this.util.deepClone(this.pig);
    let currentStatus = this.deployData.get_status_by_id(this.pig.statusId);
    if (currentStatus) {
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
            this.publishEvenPigChange(this.pig);
          }
        })
        .catch((err: Error) => { })
    }else{
      this.util.showToast('Không xác định được trạng thái hiện tại của heo')
    }
  }


  /**
   * Phân loại heo
   */
  reviewOffset() {
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


  closeFabList() {
    this.fab.close();
  }

  publishEvenPigChange(pig) {
    this.event.publish('pig-list-section:PigChange', pig);
  }


  @Output() updatePigEvent = new EventEmitter();
  @Output() removePigEvent = new EventEmitter();

  edit() {
    let callback = (pig: pig) => {
      if (pig) {
        let pigParam = this.deployData.get_pig_object_to_send_request(pig);
        this.pigProvider.updatePig(pigParam)
          .then((updated_pig: pig) => {
            if (updated_pig) {
              this.pigProvider.updatedPig(pig);
              this.event.publish('pig-list-section:PigChange', updated_pig);
              this.pig = updated_pig;
              this.updatePigEvent.emit(updated_pig);
            }
            this.navCtrl.pop();
          })
          .catch(err => {
            console.log(err);
            return err;
          })
      }
    }
    this.navCtrl.push(PigInputPage, { pigId: this.pig.id, callback: callback });
  }

  remove() {
    this.pigProvider.removePig(this.pig)
      .then((isOk) => {
        if (isOk) {
          this.pigProvider.removedPig(this.pig);
          this.event.publish('pig-list-section:removePig', this.pig);
          this.removePigEvent.emit(this.pig);
        }
      })
      .catch((err) => {
        console.log(err);
        return err;
      })
  }
}
