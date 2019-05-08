import { Component, Input, Output, EventEmitter } from '@angular/core';
import { VARIABLE } from '../../common/const';
import { pig } from '../../common/entity';
import { PigsProvider } from '../../providers/pigs/pigs';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { NavController } from 'ionic-angular';
import { PigViewPage } from '../../tabs/pig-view/pig-view';

@Component({
  selector: 'option-list-pig-section',
  templateUrl: 'option-list-pig-section.html'
})
export class OptionListPigSectionComponent {


  @Input() sectionTypeId: any;
  @Input() pig: pig;
  public statusPig:any = {};
  public add_to_sale_list;
  public view_info;
  constructor(
    public pigProvider: PigsProvider,
    public deployData: DeployDataProvider,
    public navCtrl: NavController
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
    this.pig.statusId = VARIABLE.STATUS_PIG.WAIT_FOR_SALE;
    let pig = this.deployData.get_pig_object_to_send_request(this.pig);
    this.pigProvider.updatePig(pig)
      .then((pig: pig) => {
        if (pig && pig.id) {
          this.pig = pig;
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
