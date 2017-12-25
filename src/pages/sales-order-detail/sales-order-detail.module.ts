import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalesOrderDetailPage } from './sales-order-detail';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    SalesOrderDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SalesOrderDetailPage),
    PipesModule,
  ],
})
export class SalesOrderDetailPageModule {}
