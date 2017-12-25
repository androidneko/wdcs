import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PurchaseOrderInPage } from './purchase-order-in';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    PurchaseOrderInPage,
  ],
  imports: [
    IonicPageModule.forChild(PurchaseOrderInPage),
    ComponentsModule,
    PipesModule
  ],
})
export class PurchaseOrderInPageModule {}
