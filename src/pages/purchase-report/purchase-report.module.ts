import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PurchaseReportPage } from './purchase-report';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    PurchaseReportPage,
  ],
  imports: [
    IonicPageModule.forChild(PurchaseReportPage),
    ComponentsModule,
    PipesModule
  ],
})
export class PurchaseReportPageModule {}
