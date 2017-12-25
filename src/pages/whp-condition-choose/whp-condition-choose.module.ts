import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WhpConditionChoosePage } from './whp-condition-choose';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    WhpConditionChoosePage,
  ],
  imports: [
    IonicPageModule.forChild(WhpConditionChoosePage),
    ComponentsModule
  ],
})
export class WhpConditionChoosePageModule {}
