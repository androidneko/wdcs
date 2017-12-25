import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StockioConditionChoosePage } from './stockio-condition-choose';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    StockioConditionChoosePage,
  ],
  imports: [
    IonicPageModule.forChild(StockioConditionChoosePage),
    ComponentsModule
  ],
})
export class StockioConditionChoosePageModule {}
