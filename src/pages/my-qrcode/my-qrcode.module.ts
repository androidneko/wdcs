import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyQrcodePage } from './my-qrcode';

@NgModule({
  declarations: [
    MyQrcodePage,
  ],
  imports: [
    IonicPageModule.forChild(MyQrcodePage),
  ],
})
export class MyQrcodePageModule {}
