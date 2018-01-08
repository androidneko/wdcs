import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewInfoPage } from './new-info';

@NgModule({
  declarations: [
    NewInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(NewInfoPage),
  ],
})
export class NewInfoPageModule {}
