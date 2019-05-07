import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PigOutPage } from './pig-out';

@NgModule({
  declarations: [
    PigOutPage,
  ],
  imports: [
    IonicPageModule.forChild(PigOutPage),
  ],
})
export class PigOutPageModule {}
