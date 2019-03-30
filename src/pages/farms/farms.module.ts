import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FarmsPage } from './farms';

@NgModule({
  declarations: [
    FarmsPage,
  ],
  imports: [
    IonicPageModule.forChild(FarmsPage),
  ],
})
export class FarmsPageModule {}
