import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HouseInfomationPage } from './house-infomation';

@NgModule({
  declarations: [
    HouseInfomationPage,
  ],
  imports: [
    IonicPageModule.forChild(HouseInfomationPage),
  ],
})
export class HouseInfomationPageModule {}
