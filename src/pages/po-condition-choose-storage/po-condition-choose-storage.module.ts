import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PoConditionChooseStoragePage } from './po-condition-choose-storage';

@NgModule({
  declarations: [
    PoConditionChooseStoragePage,
  ],
  imports: [
    IonicPageModule.forChild(PoConditionChooseStoragePage),
    ComponentsModule,
  ],
})
export class PoConditionChooseStoragePageModule {}
