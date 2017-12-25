import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewContactPage } from './new-contact';

@NgModule({
  declarations: [
    NewContactPage,
  ],
  imports: [
    IonicPageModule.forChild(NewContactPage),
  ],
})
export class NewContactPageModule {}
