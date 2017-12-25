import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalesReportPage } from './sales-report';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    SalesReportPage,
  ],
  imports: [
    IonicPageModule.forChild(SalesReportPage),
    ComponentsModule
  ],
})
export class SalesReportPageModule {}
