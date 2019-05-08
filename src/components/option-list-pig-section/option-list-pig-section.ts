import { Component, Input, Output, EventEmitter } from '@angular/core';
import { VARIABLE } from '../../common/const';
import { pig } from '../../common/entity';
import { PigsProvider } from '../../providers/pigs/pigs';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { NavController } from 'ionic-angular';
import { PigViewPage } from '../../tabs/pig-view/pig-view';
import { Utils } from '../../common/utils';

@Component({
  selector: 'option-list-pig-section',
  templateUrl: 'option-list-pig-section.html'
})
export class OptionListPigSectionComponent {


  @Input() sectionTypeId: any;
  @Input() protected pig: any;

  public statusPig:any = {};
  public add_to_sale_list;
  public view_info;
  constructor(
    public pigProvider: PigsProvider,
    public deployData: DeployDataProvider,
    public navCtrl: NavController,
    public util: Utils
  ) {
    this.statusPig = {
      WAIT_FOR_SALE: VARIABLE.STATUS_PIG.WAIT_FOR_SALE
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

    this.sectionTypeId = VARIABLE.SECTION_TYPE[this.sectionTypeId];
  }

  public move_local = [
    VARIABLE.SECTION_TYPE[1].id,
    VARIABLE.SECTION_TYPE[2].id,
    VARIABLE.SECTION_TYPE[3].id,
  ]

  public breeding = [
    VARIABLE.SECTION_TYPE[1].id,
  ];

  @Output() pigChange = new EventEmitter();

  viewDetail(){
    this.navCtrl.push(PigViewPage,this.pig);
  }

  forwardToSaleWaiting() {
    let statusSaleWaiting = this.deployData.get_status_saleWaiting_of_pig(this.pig.statusId);
    let pigUpdate = this.util.deepClone(this.pig);
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

  cancelSaleWaiting(){
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
