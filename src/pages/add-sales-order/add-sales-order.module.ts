import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddSalesOrderPage } from './add-sales-order';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    AddSalesOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(AddSalesOrderPage),
    ComponentsModule
  ],
})
export class AddSalesOrderPageModule {}
