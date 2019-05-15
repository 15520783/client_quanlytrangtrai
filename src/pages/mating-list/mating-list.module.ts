import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MatingListPage } from './mating-list';

@NgModule({
  declarations: [
    MatingListPage,
  ],
  imports: [
    IonicPageModule.forChild(MatingListPage),
  ],
})
export class MatingListPageModule {}
