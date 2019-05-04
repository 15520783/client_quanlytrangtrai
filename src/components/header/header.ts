import { Component, Input } from '@angular/core';
import { NavController, PopoverController, ModalController } from 'ionic-angular';
import { PigListComponent } from '../pig-list/pig-list';
import { Utils } from '../../common/utils';
import { KEY } from '../../common/const';
import { pig } from '../../common/entity';


@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent {

  @Input() protected title: String = '';

  constructor(
    public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    public util: Utils,
    public modalCtrl: ModalController
  ) {
    console.log('Hello HeaderComponent Component');
  }

  openSeacrhModal() {
    // this.navCtrl.push(PigsPage);
    this.util.getKey(KEY.PIGS).then((data:Array<pig>)=>{
      this.modalCtrl.create(PigListComponent,{pigs:data}).present();
    })
  }
}
