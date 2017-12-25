import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PofConditionChoosePage } from './pof-condition-choose';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    PofConditionChoosePage,
  ],
  imports: [
    IonicPageModule.forChild(PofConditionChoosePage),
    ComponentsModule
  ],
})
export class PofConditionChoosePageModule {}
