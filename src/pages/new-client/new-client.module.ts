import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewClientPage } from './new-client';

@NgModule({
  declarations: [
    NewClientPage,
  ],
  imports: [
    IonicPageModule.forChild(NewClientPage),
  ],
})
export class NewClientPageModule {}
