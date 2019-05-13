import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HealthInputPage } from './health-input';

@NgModule({
  declarations: [
    HealthInputPage,
  ],
  imports: [
    IonicPageModule.forChild(HealthInputPage),
  ],
})
export class HealthInputPageModule {}
