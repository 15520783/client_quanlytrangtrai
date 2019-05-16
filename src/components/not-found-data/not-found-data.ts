import { Component } from '@angular/core';

@Component({
  selector: 'not-found-data',
  templateUrl: 'not-found-data.html'
})
export class NotFoundDataComponent {

  text: string;

  constructor() {
    console.log('Hello NotFoundDataComponent Component');
    this.text = 'Hello World';
  }

}
