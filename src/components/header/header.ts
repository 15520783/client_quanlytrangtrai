import { Component, Input } from '@angular/core';

/**
 * Generated class for the HeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent {

  @Input() protected title : String = '';

  constructor() {
    console.log('Hello HeaderComponent Component');
  }

  openSeacrhModal(){}
}
