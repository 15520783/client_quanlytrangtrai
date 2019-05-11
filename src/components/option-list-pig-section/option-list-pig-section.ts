import { Component, Input, Output, EventEmitter } from '@angular/core';
import { VARIABLE } from '../../common/const';
import { pig, status } from '../../common/entity';
import { PigsProvider } from '../../providers/pigs/pigs';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { NavController, Events } from 'ionic-angular';
import { PigViewPage } from '../../tabs/pig-view/pig-view';
import { Utils } from '../../common/utils';
import { BreedingInputPage } from '../../pages/breeding-input/breeding-input';
import { ActivitiesProvider } from '../../providers/activities/activities';
import { SpermInputPage } from '../../pages/sperm_input/sperm_input';
import { MatingInputPage } from '../../pages/mating-input/mating-input';

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
      WAIT_FOR_MATING: VARIABLE.STATUS_PIG.WAIT_FOR_MATING
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

  breeding_input() {
    let callback = data => {
      if (data) {
        this.activitiesProvider.createBreeding(data)
          .then((newBreeding) => {
            if (newBreeding) {
              console.log(newBreeding);
            }
            this.navCtrl.pop();
          })
          .catch((err: Error) => {
          })
      }
    }
    this.navCtrl.push(BreedingInputPage, { pig: this.pig, callback: callback });
  }



  sperm_input() {
    let callback = data => {
      this.activitiesProvider.createSperm(data)
        .then((newSperm) => {
          if (newSperm) {
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

  mating_input() {
    let callback = data => {
      console.log(data);
    }
    this.navCtrl.push(MatingInputPage, { pig: this.pig, callback: callback });
  }

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
      .catch((err: Error) => {

      })
  }

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
      .catch((err: Error) => {

      })
  }



  publishPigChangeEvent(pig) {
    this.pigChange.emit(pig);
  }
}
