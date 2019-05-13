import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';


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
  @Input() disabled:boolean = false;

  @Input() selectOptions: any = [];
  @Output() changeValue = new EventEmitter();

  constructor() {
    console.log('Hello InputSelectComponent Component');
  }

  ngAfterViewInit(): void {
    // console.log(this.value);
  }

  eventChangeValue(e) {
    this.changeValue.emit({ valueId: this.validControl.value });
  }

  eventChangeValue2(e) {
    this.changeValue.emit({ valueId: this.value });
  }

  scrollTo() {
    this.input.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
