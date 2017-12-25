import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalesOrderChangePage } from './sales-order-change';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    SalesOrderChangePage,
  ],
  imports: [
    IonicPageModule.forChild(SalesOrderChangePage),
    PipesModule,
    ComponentsModule,
  ],
})
export class SalesOrderChangePageModule {}
