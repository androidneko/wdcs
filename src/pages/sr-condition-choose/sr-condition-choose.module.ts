import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SrConditionChoosePage } from './sr-condition-choose';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    SrConditionChoosePage,
  ],
  imports: [
    IonicPageModule.forChild(SrConditionChoosePage),
    ComponentsModule
  ],
})
export class SrConditionChoosePageModule {}
