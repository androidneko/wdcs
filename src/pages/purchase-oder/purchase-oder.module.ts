import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PurchaseOderPage } from './purchase-oder';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    PurchaseOderPage,
  ],
  imports: [
    IonicPageModule.forChild(PurchaseOderPage),
    ComponentsModule,
    PipesModule
  ],
})
export class PurchaseOderPageModule {}
