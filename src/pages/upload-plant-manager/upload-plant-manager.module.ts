import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UploadPlantManagerPage } from './upload-plant-manager';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    UploadPlantManagerPage,
  ],
  imports: [
    IonicPageModule.forChild(UploadPlantManagerPage),
    ComponentsModule
  ],
})
export class UploadPlantManagerPageModule {}
