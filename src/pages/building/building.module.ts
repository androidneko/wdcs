import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuildingPage } from './building';

@NgModule({
  declarations: [
    BuildingPage,
  ],
  imports: [
    IonicPageModule.forChild(BuildingPage),
  ],
})
export class BuildingPageModule {}
