import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserInformationInputPage } from './user-information-input';

@NgModule({
  declarations: [
    UserInformationInputPage,
  ],
  imports: [
    IonicPageModule.forChild(UserInformationInputPage),
  ],
})
export class UserInformationInputPageModule {}
