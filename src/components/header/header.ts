import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PigsPage } from '../../pages/pigs/pigs';


@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent {

  @Input() protected title: String = '';

  constructor(
    public navCtrl: NavController
  ) {
    console.log('Hello HeaderComponent Component');
  }

  openSeacrhModal() {
    this.navCtrl.push(PigsPage);
  }
}
