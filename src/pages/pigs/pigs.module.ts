import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PigsPage } from './pigs';

@NgModule({
  declarations: [
    PigsPage,
  ],
  imports: [
    IonicPageModule.forChild(PigsPage),
  ],
})
export class PigsPageModule {}
