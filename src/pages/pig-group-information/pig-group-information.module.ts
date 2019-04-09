import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PigGroupInformationPage } from './pig-group-information';

@NgModule({
  declarations: [
    PigGroupInformationPage,
  ],
  imports: [
    IonicPageModule.forChild(PigGroupInformationPage),
  ],
})
export class PigGroupInformationPageModule {}
