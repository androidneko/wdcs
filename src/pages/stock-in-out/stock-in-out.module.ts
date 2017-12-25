import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StockInOutPage } from './stock-in-out';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    StockInOutPage,
  ],
  imports: [
    IonicPageModule.forChild(StockInOutPage),
    ComponentsModule
  ],
})
export class StockInOutPageModule {}
