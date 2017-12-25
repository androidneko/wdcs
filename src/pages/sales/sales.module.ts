import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalesPage } from './sales';

@NgModule({
  declarations: [
    SalesPage,
  ],
  imports: [
    IonicPageModule.forChild(SalesPage),
    ComponentsModule
  ],
})
export class SalesPageModule {}
