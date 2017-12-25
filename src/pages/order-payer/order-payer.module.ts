import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderPayerPage } from './order-payer';

@NgModule({
  declarations: [
    OrderPayerPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderPayerPage),
  ],
})
export class OrderPayerPageModule {}
