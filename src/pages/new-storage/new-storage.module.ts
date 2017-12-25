import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewStoragePage } from './new-storage';

@NgModule({
  declarations: [
    NewStoragePage,
  ],
  imports: [
    IonicPageModule.forChild(NewStoragePage),
  ],
})
export class NewStoragePageModule {}
