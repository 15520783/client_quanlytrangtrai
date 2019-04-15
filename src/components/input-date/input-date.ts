import { Component, Input } from '@angular/core';

/**
 * Generated class for the InputDateComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'input-date',
  templateUrl: 'input-date.html'
})
export class InputDateComponent {
  public currentTime = new Date();
  @Input() validControl: any; 
  @Input() errorMessage_Required: string;
  @Input() errorMessage_Maxlength: string;
  @Input() label: string = '';
  // @Input() value:string = '';
  @Input() active :boolean = false;

  constructor() {
    console.log('Hello InputDateComponent Component');
  }

}
