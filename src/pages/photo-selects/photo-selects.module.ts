import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhotoSelectsPage } from './photo-selects';

@NgModule({
  declarations: [
    PhotoSelectsPage,
  ],
  imports: [
    IonicPageModule.forChild(PhotoSelectsPage),
  ],
})
export class PhotoSelectsPageModule {}
