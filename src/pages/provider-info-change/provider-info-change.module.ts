import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProviderInfoChangePage } from './provider-info-change';

@NgModule({
  declarations: [
    ProviderInfoChangePage,
  ],
  imports: [
    IonicPageModule.forChild(ProviderInfoChangePage),
  ],
})
export class ProviderInfoChangePageModule {}
