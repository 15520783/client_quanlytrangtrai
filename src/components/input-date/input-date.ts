import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'input-date',
  templateUrl: 'input-date.html'
})
export class InputDateComponent {
  @ViewChild('input') input: any;
  public currentTime = new Date();

  @Input() validControl: any;
  @Input() errorMessage_Required: string;
  @Input() errorMessage_Maxlength: string;
  @Input() label: string = '';
  @Input() active: boolean = false;
  @Input() placeholder: string = ''
  @Input() displayFormat: string = 'DD/MM/YYYY';
  @Input() pickerFormat: string = 'DD-MM-YYYY';
  @Input() value: any = null;
  @Input() disabled:boolean = false;

  @Output() valueChange = new EventEmitter(); 
  public limit: any;

  constructor() {
    if (this.disabled)
      this.validControl.disable();
    let now = new Date();
    this.limit = new Date(now.getFullYear() + 2, now.getMonth(), now.getDay()).toISOString();
  }

  datetimeChange(e) {
    this.value = e;
    this.valueChange.emit(e);
  }

  scrollTo() {
    this.input.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
