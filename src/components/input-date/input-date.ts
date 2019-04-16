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
  @Input() active :boolean = false;
  @Input() placeholder:string = ''
  @Input() displayFormat:string = 'DD/MM/YYYY';
  @Input() pickerFormat:string = 'DD-MM-YYYY';
  @Input() value:any = null;

  constructor() {
    console.log('Hello InputDateComponent Component');
  }

  datetimeChange(e){
    this.value = e;;
  }

  scrollTo(){
    document.getElementById('item').scrollIntoView();
  }
}
