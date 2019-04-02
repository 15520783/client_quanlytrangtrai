import { Component, Input } from '@angular/core';
import { farm } from '../../common/entity';
import { FarmsProvider } from '../../providers/farms/farms';
import { Utils } from '../../common/utils';

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
    public farmProvider: FarmsProvider,
    public util :Utils
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
    console.log(document.getElementById(this.farm.id));
    this.farmProvider.createChartQuantity(document.getElementById(this.farm.id), data);
  }
}
