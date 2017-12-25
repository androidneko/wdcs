import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StockPage } from './stock';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    StockPage,
  ],
  imports: [
    IonicPageModule.forChild(StockPage),
    ComponentsModule
  ],
})
export class StockPageModule {}
