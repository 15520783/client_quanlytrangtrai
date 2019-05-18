import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BirthListPage } from './birth-list';

@NgModule({
  declarations: [
    BirthListPage,
  ],
  imports: [
    IonicPageModule.forChild(BirthListPage),
  ],
})
export class BirthListPageModule {}
