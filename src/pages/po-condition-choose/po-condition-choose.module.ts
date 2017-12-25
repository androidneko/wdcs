import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PoConditionChoosePage } from './po-condition-choose';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    PoConditionChoosePage,
  ],
  imports: [
    IonicPageModule.forChild(PoConditionChoosePage),
    ComponentsModule
  ],
})
export class PoConditionChoosePageModule {}
