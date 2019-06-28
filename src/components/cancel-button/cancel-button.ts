import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'cancel-button',
  templateUrl: 'cancel-button.html'
})
export class CancelButtonComponent {


  constructor(public navCtrl:NavController) {

  }

  cancel(){
    this.navCtrl.pop();
  }

}
