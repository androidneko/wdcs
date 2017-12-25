import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IHavntPaidPage } from './i-havnt-paid';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    IHavntPaidPage,
  ],
  imports: [
    IonicPageModule.forChild(IHavntPaidPage),
    ComponentsModule,
    PipesModule
  ],
})
export class IHavntPaidPageModule {}
