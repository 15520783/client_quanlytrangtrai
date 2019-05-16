import { Component, Input } from '@angular/core';
import { NavController, PopoverController, ModalController, Platform } from 'ionic-angular';
import { PigListComponent } from '../pig-list/pig-list';
import { Utils } from '../../common/utils';
import { KEY, VARIABLE, MESSAGE, CONFIG } from '../../common/const';
import { pig, house } from '../../common/entity';
import { BarcodeScanner, BarcodeScanResult } from '@ionic-native/barcode-scanner';
import { PigSummaryPage } from '../../pages/pig-summary/pig-summary';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { HouseInfomationPage } from '../../pages/house-infomation/house-infomation';


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
    public deployData: DeployDataProvider
  ) {
    console.log('Hello HeaderComponent Component');
  }

  openSeacrhModal() {
    // this.navCtrl.push(PigsPage);
    this.util.getKey(KEY.PIGS).then((data: Array<pig>) => {
      this.modalCtrl.create(PigListComponent, { pigs: data }).present();
    })
  }


  scan() {
    if (this.platform.is('android') || this.platform.is('ios')) {
      this.scanner.scan()
        .then((result: any) => {
          if (result.text) {
            this.util.openBackDrop();
            let target = JSON.parse(result.text);
            if (target.type == VARIABLE.OBJECT_BARCODE_TYPE.PIG) {
              this.util.getKey(KEY.PIGS).then((pigs: Array<pig>) => {
                let idx = pigs.findIndex(pig => pig.pigCode == target.id);
                if (idx > -1) {
                  this.navCtrl.push(PigSummaryPage, { pig: pigs[idx] }).then(()=>{
                    this.util.closeBackDrop();
                  });
                } else {
                  this.util.showToastInform('Không tìm thấy đối tượng');
                }
              })
            } else if (target.type == VARIABLE.OBJECT_BARCODE_TYPE.HOUSE) {
              this.util.getKey(KEY.HOUSES).then((houses: Array<house>) => {
                let idx = houses.findIndex(house => house.id == target.id);
                if (idx > -1) {
                  this.navCtrl.push(HouseInfomationPage, { house: houses[idx] }).then(()=>{
                    this.util.closeBackDrop();
                  });
                } else {
                  this.util.showToastInform('Không tìm thấy đối tượng');
                }
              })
            } else {
              this.util.showToastInform('Không tìm thấy đối tượng');
            }
          } else {
            this.util.showToastInform('Không tìm thấy đối tượng');
          }
        })
        .catch((err: Error) => {
          console.log(err);
          this.util.closeBackDrop();
          this.util.showToastInform('Không tìm thấy đối tượng');
        })
    }
  }
}
