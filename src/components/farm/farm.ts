import { Component, Input } from '@angular/core';
import { farm } from '../../common/entity';
import { FarmsProvider } from '../../providers/farms/farms';
import { Utils } from '../../common/utils';
import { Platform, ModalController } from 'ionic-angular';
import { FarmInfomationPage } from '../../pages/farm-infomation/farm-infomation';

/**
 * Generated class for the FarmComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'farm',
  templateUrl: 'farm.html'
})
export class FarmComponent {

  @Input() farm: farm;

  constructor(
    public platform: Platform,
    public farmProvider: FarmsProvider,
    public modalCtrl: ModalController,
    public util: Utils
  ) {
    console.log('Hello FarmComponent Component');

  }

  convertDate(date: any) {
    return this.util.convertDate(date);
  }

  ngAfterViewInit(): void {

    let data = [
      {
        name: 'Đực',
        y: 400,
        unit: 'con',
        sliced: false,
        selected: false
      }, {
        name: 'Nái',
        y: 1000,
        unit: 'con',
        sliced: false,
        selected: false
      }, {
        name: 'Đực thiến',
        y: 200,
        unit: 'con',
        sliced: false,
        selected: false
      },
    ]
    this.farmProvider.createPieChart(document.getElementById(this.farm.id), data, '', '');
  }

  viewDetail(farm: farm) {
    const modal = this.modalCtrl.create(
      FarmInfomationPage, farm, {
        cssClass: 'ion-modal'
      }
    )
    modal.present();
  }
}