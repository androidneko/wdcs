import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FastPayPage } from './fast-pay';

@NgModule({
  declarations: [
    FastPayPage,
  ],
  imports: [
    IonicPageModule.forChild(FastPayPage),
  ],
})
export class FastPayPageModule {}
