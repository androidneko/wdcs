import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyRecommendPage } from './my-recommend';

@NgModule({
  declarations: [
    MyRecommendPage,
  ],
  imports: [
    IonicPageModule.forChild(MyRecommendPage),
  ],
})
export class MyRecommendPageModule {}
