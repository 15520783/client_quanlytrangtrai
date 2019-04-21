import { Component, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'input-text',
  templateUrl: 'input-text.html'
})
export class InputTextComponent {
  @ViewChild('input') input: any;

  @Input() type:string = 'text';
  @Input() validControl: any; 
  @Input() errorMessage_Required: string;
  @Input() errorMessage_Maxlength: string;
  @Input() errorMessage_ValidEmail: string;
  @Input() errorMessage_ValidNumber: string;
  @Input() label: string = '';
  @Input() placeholder: string = '';
  // @Input() value:string = '';
  @Input() active :boolean = false;

  constructor() {
    
    console.log('Hello InputTextComponent Component');
  }

  scrollTo(){
    // document.getElementById(this.id).scrollIntoView();
    this.input.nativeElement.scrollIntoView({behavior:'smooth'});
  }
}
