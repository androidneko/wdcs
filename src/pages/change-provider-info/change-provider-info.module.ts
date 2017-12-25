import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangeProviderInfoPage } from './change-provider-info';

@NgModule({
  declarations: [
    ChangeProviderInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(ChangeProviderInfoPage),
  ],
})
export class ChangeProviderInfoPageModule {}
