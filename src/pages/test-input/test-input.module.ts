import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestInputPage } from './test-input';

@NgModule({
  declarations: [
    TestInputPage,
  ],
  imports: [
    IonicPageModule.forChild(TestInputPage),
  ],
})
export class TestInputPageModule {}
