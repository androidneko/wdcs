import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PoConditionChooseProductPage } from './po-condition-choose-product';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    PoConditionChooseProductPage,
  ],
  imports: [
    IonicPageModule.forChild(PoConditionChooseProductPage),
    ComponentsModule
  ],
})
export class PoConditionChooseProductPageModule {}
