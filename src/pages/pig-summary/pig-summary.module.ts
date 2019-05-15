import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PigSummaryPage } from './pig-summary';

@NgModule({
  declarations: [
    PigSummaryPage,
  ],
  imports: [
    IonicPageModule.forChild(PigSummaryPage),
  ],
})
export class PigSummaryPageModule {}
