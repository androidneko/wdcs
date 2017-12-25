import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderSelectPage } from './order-select';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    OrderSelectPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderSelectPage),
    ComponentsModule,
  ],
})
export class OrderSelectPageModule {}
