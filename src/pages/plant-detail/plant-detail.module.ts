import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlantDetailPage } from './plant-detail';

@NgModule({
  declarations: [
    PlantDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PlantDetailPage),
  ],
})
export class PlantDetailPageModule {}
