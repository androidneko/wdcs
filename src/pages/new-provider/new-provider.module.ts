import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewProviderPage } from './new-provider';

@NgModule({
  declarations: [
    NewProviderPage,
  ],
  imports: [
    IonicPageModule.forChild(NewProviderPage),
  ],
})
export class NewProviderPageModule {}
