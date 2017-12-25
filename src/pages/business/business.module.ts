import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusinessPage } from './business';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    BusinessPage,
  ],
  imports: [
    IonicPageModule.forChild(BusinessPage),
    ComponentsModule
  ],
})
export class BusinessPageModule {}
