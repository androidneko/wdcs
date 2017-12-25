import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyClientManagerPage } from './my-client-manager';

@NgModule({
  declarations: [
    MyClientManagerPage,
  ],
  imports: [
    IonicPageModule.forChild(MyClientManagerPage),
  ],
})
export class MyClientManagerPageModule {}
