import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StockConditionChoosePage } from './stock-condition-choose';

@NgModule({
  declarations: [
    StockConditionChoosePage,
  ],
  imports: [
    IonicPageModule.forChild(StockConditionChoosePage),
  ],
})
export class StockConditionChoosePageModule {}
