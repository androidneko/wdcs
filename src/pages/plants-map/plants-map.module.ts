import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlantsMapPage } from './plants-map';
import { MultiPickerModule } from 'ion-multi-picker';

@NgModule({
  declarations: [
    PlantsMapPage,
  ],
  imports: [
    IonicPageModule.forChild(PlantsMapPage),
    MultiPickerModule,
  ],
})
export class PlantsMapPageModule {}
