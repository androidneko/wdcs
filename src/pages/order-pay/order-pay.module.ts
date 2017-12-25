import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderPayPage } from './order-pay';

@NgModule({
  declarations: [
    OrderPayPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderPayPage),
  ],
})
export class OrderPayPageModule {}
