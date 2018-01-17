import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewPlantPage } from './new-plant';

@NgModule({
  declarations: [
    NewPlantPage,
  ],
  imports: [
    IonicPageModule.forChild(NewPlantPage),
  ],
})
export class NewPlantPageModule {}
