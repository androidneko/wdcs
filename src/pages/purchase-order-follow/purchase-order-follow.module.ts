import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PurchaseOrderFollowPage } from './purchase-order-follow';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    PurchaseOrderFollowPage,
  ],
  imports: [
    IonicPageModule.forChild(PurchaseOrderFollowPage),
    ComponentsModule,
    PipesModule
  ],
})
export class PurchaseOrderFollowPageModule {}
