import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddRecordPage } from './add-record';
import { MultiPickerModule } from 'ion-multi-picker';

@NgModule({
  declarations: [
    AddRecordPage,
  ],
  imports: [
    IonicPageModule.forChild(AddRecordPage),
    MultiPickerModule,
  ],
})
export class AddRecordPageModule {}
