import { Component, Input } from '@angular/core';


@Component({
  selector: 'input-select',
  templateUrl: 'input-select.html'
})
export class InputSelectComponent {

  @Input() multiple:boolean = false;
  @Input() selectOptions: any;
  @Input() interface:string = 'popover';
  @Input() okText:string = 'Chọn';
  @Input() placeholder:string = '';
  @Input() cancelText:string = 'Đóng';
  @Input() value:any;
  @Input() validControl: any; 
  @Input() errorMessage_Required: string;
  @Input() errorMessage_Maxlength: string;
  @Input() label: string = '';
  @Input() active :boolean = false;
  @Input() data:any = [];

  constructor() {
    console.log(this.data);
    console.log('Hello InputSelectComponent Component');
  }

  changeValue(e){
    console.log(e);
  }
}
