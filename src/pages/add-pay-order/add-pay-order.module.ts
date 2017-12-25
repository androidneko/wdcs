import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPayOrderPage } from './add-pay-order';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    AddPayOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(AddPayOrderPage),
    PipesModule
  ],
})
export class AddPayOrderPageModule {}
