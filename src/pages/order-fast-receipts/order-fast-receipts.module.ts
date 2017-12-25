import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderFastReceiptsPage } from './order-fast-receipts';

@NgModule({
  declarations: [
    OrderFastReceiptsPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderFastReceiptsPage),
  ],
})
export class OrderFastReceiptsPageModule {}
