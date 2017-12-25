import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderWriteOffPage } from './order-write-off';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    OrderWriteOffPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderWriteOffPage),
    ComponentsModule,
    PipesModule
  ],
})
export class OrderWriteOffPageModule {}
