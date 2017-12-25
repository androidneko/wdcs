import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectCustomerPage } from './select-customer';

@NgModule({
  declarations: [
    SelectCustomerPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectCustomerPage),
  ],
})
export class SelectCustomerPageModule {}
