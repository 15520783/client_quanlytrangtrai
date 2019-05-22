import { Component, Input } from '@angular/core';
import { NavController, PopoverController, ModalController, Platform, Events } from 'ionic-angular';
import { PigListComponent } from '../pig-list/pig-list';
import { Utils } from '../../common/utils';
import { KEY } from '../../common/const';
import { pig } from '../../common/entity';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { PigsProvider } from '../../providers/pigs/pigs';


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
    public modalCtrl: ModalController,
    public scanner: BarcodeScanner,
    public platform: Platform,
    public deployData: DeployDataProvider,
    public pigProvider: PigsProvider,
    public event: Events
  ) {
  }

  openSeacrhModal() {
    // this.navCtrl.push(PigsPage);
    this.util.getKey(KEY.PIGS).then((data: Array<pig>) => {
      this.modalCtrl.create(PigListComponent, { pigs: data }).present();
    })
  }


  scan() {
    this.event.publish('scan', true);
  }

  sync() {
    this.event.publish('sync', true);
  }
}
