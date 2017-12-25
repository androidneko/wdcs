import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StockLocationPage } from './stock-location';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    StockLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(StockLocationPage),
    ComponentsModule
  ],
})
export class StockLocationPageModule {}
