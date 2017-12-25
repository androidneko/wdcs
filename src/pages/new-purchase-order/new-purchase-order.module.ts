import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewPurchaseOrderPage } from './new-purchase-order';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    NewPurchaseOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(NewPurchaseOrderPage),
    ComponentsModule
  ],
})
export class NewPurchaseOrderPageModule {}
