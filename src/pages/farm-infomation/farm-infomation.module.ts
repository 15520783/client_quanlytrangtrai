import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FarmInfomationPage } from './farm-infomation';

@NgModule({
  declarations: [
    FarmInfomationPage,
  ],
  imports: [
    IonicPageModule.forChild(FarmInfomationPage),
  ],
})
export class FarmInfomationPageModule {}
