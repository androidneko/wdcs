import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalesOrderOutPage } from './sales-order-out';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    SalesOrderOutPage,
  ],
  imports: [
    IonicPageModule.forChild(SalesOrderOutPage),
    ComponentsModule,
    PipesModule,
  ],
})
export class SalesOrderOutPageModule {}
