import { Component, Input } from '@angular/core';

/**
 * Generated class for the InputTextComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'input-text',
  templateUrl: 'input-text.html'
})
export class InputTextComponent {

  @Input() validControl: any; 
  @Input() errorMessage_Required: string;
  @Input() errorMessage_Maxlength: string;
  @Input() label: string = '';
  // @Input() value:string = '';
  @Input() active :boolean = false;

  constructor() {
    console.log('Hello InputTextComponent Component');
  }

}
