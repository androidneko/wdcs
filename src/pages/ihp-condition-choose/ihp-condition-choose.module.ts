import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IhpConditionChoosePage } from './ihp-condition-choose';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    IhpConditionChoosePage,
  ],
  imports: [
    IonicPageModule.forChild(IhpConditionChoosePage),
    ComponentsModule
  ],
})
export class IhpConditionChoosePageModule {}
