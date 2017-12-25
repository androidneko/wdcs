import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalesOrderFollowPage } from './sales-order-follow';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    SalesOrderFollowPage,
  ],
  imports: [
    IonicPageModule.forChild(SalesOrderFollowPage),
    ComponentsModule,
    PipesModule
  ],
})
export class SalesOrderFollowPageModule {}
