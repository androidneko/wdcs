import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusinessEditPage } from './business-edit';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    BusinessEditPage,
  ],
  imports: [
    IonicPageModule.forChild(BusinessEditPage),
    ComponentsModule
  ],
})
export class BusinessEditPageModule {}
