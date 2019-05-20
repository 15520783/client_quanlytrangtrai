import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

export class Schedule{
  name:string = '';
  date:any = '';
  employee:string = '';
  status:string  = '';
}

@Component({
  selector: 'scheldule-detail',
  templateUrl: 'scheldule-detail.html'
})

export class SchelduleDetailComponent {

  public schedule:Schedule = new Schedule();

  constructor(
    public navCtrl:NavController,
    public navParams:NavParams
  ) {
    if(this.navParams.data.schedule){
      this.schedule = this.navParams.data.schedule;
    }
  }

}
