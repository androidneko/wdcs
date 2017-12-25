import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProviderDetailPage } from './provider-detail';

@NgModule({
  declarations: [
    ProviderDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ProviderDetailPage),
  ],
})
export class ProviderDetailPageModule {}
