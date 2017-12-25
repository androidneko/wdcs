import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettlementAccountPage } from './settlement-account';

@NgModule({
  declarations: [
    SettlementAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(SettlementAccountPage),
  ],
})
export class SettlementAccountPageModule {}
