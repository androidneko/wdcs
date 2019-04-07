import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlantsMapPage } from './plants-map';

@NgModule({
  declarations: [
    PlantsMapPage,
  ],
  imports: [
    IonicPageModule.forChild(PlantsMapPage),
  ],
})
export class PlantsMapPageModule {}
