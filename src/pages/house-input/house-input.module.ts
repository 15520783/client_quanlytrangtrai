import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HouseInputPage } from './house-input';

@NgModule({
  declarations: [
    HouseInputPage,
  ],
  imports: [
    IonicPageModule.forChild(HouseInputPage),
  ],
})
export class HouseInputPageModule {}
