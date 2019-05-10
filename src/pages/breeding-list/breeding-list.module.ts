import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BreedingListPage } from './breeding-list';

@NgModule({
  declarations: [
    BreedingListPage,
  ],
  imports: [
    IonicPageModule.forChild(BreedingListPage),
  ],
})
export class BreedingListPageModule {}
