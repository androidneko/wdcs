import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SofConditionChoosePage } from './sof-condition-choose';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    SofConditionChoosePage,
  ],
  imports: [
    IonicPageModule.forChild(SofConditionChoosePage),
    ComponentsModule
  ],
})
export class SofConditionChoosePageModule {}
