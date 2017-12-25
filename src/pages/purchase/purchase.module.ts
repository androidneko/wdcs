import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PurchasePage } from './purchase';

@NgModule({
  declarations: [
    PurchasePage,
  ],
  imports: [
    IonicPageModule.forChild(PurchasePage),
    ComponentsModule
  ],
})
export class PurchasePageModule {}
