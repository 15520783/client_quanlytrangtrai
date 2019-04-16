import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { group } from '../../common/entity';
import { Utils } from '../../common/utils';
import { ModalController } from 'ionic-angular';
import { KEY } from '../../common/const';
import { PigGroupListComponent } from '../pig-group-list/pig-group-list';

/**
 * Generated class for the InputSelectPigGroupComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'input-select-pig-group',
  templateUrl: 'input-select-pig-group.html'
})
export class InputSelectPigGroupComponent {

  @Input() validControl: any;
  @Input() errorMessage_Required: string;
  @Input() errorMessage_Maxlength: string;
  @Input() label: string = 'Nhóm heo';
  @Input() active: boolean = false;
  @Input() placeholder: string = ''
  @Input() group: any = {};
  group_code: string = '';

  @Output() valueChange = new EventEmitter();

  constructor(
    public util: Utils,
    public modalCtrl: ModalController,

  ) {
    this.group.group_code = '';
    console.log('Hello InputSelectPigGroupComponent Component');
  }

  presentModal() {
    this.util.getKey(KEY.GROUPS).then((data) => {
      let modal = this.modalCtrl.create(PigGroupListComponent, { groups: data, selectMode: true });
      modal.present();
      modal.onDidDismiss((data: group) => {
        if (data) {
          this.group = data;
          this.validControl.setErrors(null);
        }
      })
    })
  }

  changeValue(e) {
    console.log(this.validControl);
    console.log(this.validControl.valid);
  }

}
