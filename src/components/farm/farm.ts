import { Component, Input, Output, EventEmitter } from '@angular/core';
import { farm } from '../../common/entity';
import { FarmsProvider } from '../../providers/farms/farms';
import { Utils } from '../../common/utils';
import { Platform, ModalController, NavController } from 'ionic-angular';
import { FarmInfomationPage } from '../../pages/farm-infomation/farm-infomation';
import { HighChartProvider } from '../../providers/high-chart/high-chart';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'farm',
  templateUrl: 'farm.html'
})
export class FarmComponent {

  @Input() farm: farm;

  @Input() public summary : {
    male_pig:number,
    female_pig:number,
    child_pig:number
    totalPig:number
  }

  @Output() public removeFarm = new EventEmitter(); 

  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    public farmProvider: FarmsProvider,
    public modalCtrl: ModalController,
    public chartProvider: HighChartProvider,
    public deployData: DeployDataProvider,
    public userProvider:UserProvider,
    public util: Utils
  ) {
    
  }

  convertDate(date: any) {
    return this.util.convertDate(date);
  }

  ngAfterViewInit(): void {
    
    // this.summary = {
    //   male_pig: this.deployData.get_male_pig_of_farm(this.farm.id).length,
    //   female_pig:this.deployData.get_female_pig_of_farm(this.farm.id).length,
    //   child_pig:this.deployData.get_child_pig_in_farm(this.farm.id).length,
    //   totalPig:this.deployData.get_all_pig_of_farm(this.farm.id).length
    // }

    let data = [
      {
        name: 'Heo nọc',
        y: this.summary.male_pig,
        unit: 'con',
        sliced: false,
        selected: false
      }, {
        name: 'Heo nái',
        y: this.summary.female_pig,
        unit: 'con',
        sliced: false,
        selected: false
      }, {
        name: 'Heo con',
        y: this.summary.child_pig,
        unit: 'con',
        sliced: false,
        selected: false
      },
    ]
    this.chartProvider.createPieChart(document.getElementById(this.farm.id), data, '', '');
  }

  viewDetail(farm: farm) {
    this.navCtrl.push(FarmInfomationPage,{farm:this.util.deepClone(farm)});
  }

  remove(farm){
    this.farmProvider.removeFarm(farm)
    .then((isOK)=>{
      if(isOK){
        this.removeFarm.emit(farm);
      }
    });
  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.farm = null;
    this.summary = null;
  }
}
