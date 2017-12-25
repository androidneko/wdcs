import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PurchaseOrderChangePage } from './purchase-order-change';

@NgModule({
  declarations: [
    PurchaseOrderChangePage,
  ],
  imports: [
    IonicPageModule.forChild(PurchaseOrderChangePage),
    ComponentsModule
  ],
})
export class PurchaseOrderChangePageModule {}
