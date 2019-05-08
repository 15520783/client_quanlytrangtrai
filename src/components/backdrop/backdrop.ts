import { Component } from '@angular/core';

/**
 * Generated class for the BackdropComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'backdrop',
  templateUrl: 'backdrop.html'
})
export class BackdropComponent {

  text: string;

  constructor() {
    console.log('Hello BackdropComponent Component');
    this.text = 'Hello World';
  }

}
