import { Component, Input } from '@angular/core';

/**
 * Generated class for the ExpandableComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'expandable',
  templateUrl: 'expandable.html'
})
export class ExpandableComponent {

  @Input('expandedHeight') expandedHeight: number;
  @Input('expanded') expanded: boolean;

  constructor() {
    console.log('Hello ExpandableComponent Component');
  }

}
