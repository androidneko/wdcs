import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeTabPage } from './home-tab';

@NgModule({
  declarations: [
    HomeTabPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeTabPage),
  ]
})
export class HomeTabPageModule {}
