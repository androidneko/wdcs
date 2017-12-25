import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalesOrderPage } from './sales-order';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    SalesOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(SalesOrderPage),
    ComponentsModule,
    PipesModule,
  ],
})
export class SalesOrderPageModule {}
