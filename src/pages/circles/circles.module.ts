import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CirclesPage } from './circles';

@NgModule({
  declarations: [
    CirclesPage,
  ],
  imports: [
    IonicPageModule.forChild(CirclesPage),
    ComponentsModule
  ],
})
export class CirclesPageModule {}
