import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyIframePage } from './my-iframe';

@NgModule({
  declarations: [
    MyIframePage,
  ],
  imports: [
    IonicPageModule.forChild(MyIframePage),
  ],
})
export class MyIframePageModule {}
