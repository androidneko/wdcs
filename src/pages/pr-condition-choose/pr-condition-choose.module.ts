import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrConditionChoosePage } from './pr-condition-choose';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    PrConditionChoosePage,
  ],
  imports: [
    IonicPageModule.forChild(PrConditionChoosePage),
    ComponentsModule
  ],
})
export class PrConditionChoosePageModule {}
