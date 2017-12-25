import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PurchaseOrderDetailPage } from './purchase-order-detail';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    PurchaseOrderDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PurchaseOrderDetailPage),
    PipesModule
  ],
})
export class PurchaseOrderDetailPageModule {}
