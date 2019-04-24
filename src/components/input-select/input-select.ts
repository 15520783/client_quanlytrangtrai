import { Component, Input, ViewChild } from '@angular/core';


@Component({
  selector: 'input-select',
  templateUrl: 'input-select.html'
})
export class InputSelectComponent {
  @ViewChild('input') input: any;

  @Input() multiple: boolean = false;
  @Input() interface: string = 'popover';
  @Input() okText: string = 'Chọn';
  @Input() placeholder: string = '';
  @Input() cancelText: string = 'Đóng';
  @Input() value: any;
  @Input() validControl: any;
  @Input() errorMessage_Required: string;
  @Input() errorMessage_Maxlength: string;
  @Input() label: string = '';
  @Input() active: boolean = false;
  @Input() data: any = [];
  @Input() title: string = '';

  @Input() selectOptions: any = [];


  constructor() {
    console.log('Hello InputSelectComponent Component');
  }

  ngAfterViewInit(): void {
    console.log(this.value);
  }

  changeValue(e) {
    console.log(e);
  }

  scrollTo() {
    this.input.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
