import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecordDetailPage } from './record-detail';
import { MultiPickerModule } from 'ion-multi-picker';

@NgModule({
  declarations: [
    RecordDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(RecordDetailPage),
    MultiPickerModule,
  ],
})
export class RecordDetailPageModule {}
