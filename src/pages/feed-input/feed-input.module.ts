import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedInputPage } from './feed-input';

@NgModule({
  declarations: [
    FeedInputPage,
  ],
  imports: [
    IonicPageModule.forChild(FeedInputPage),
  ],
})
export class FeedInputPageModule {}
