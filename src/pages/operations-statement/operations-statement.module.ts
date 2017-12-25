import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OperationsStatementPage } from './operations-statement';

@NgModule({
  declarations: [
    OperationsStatementPage,
  ],
  imports: [
    IonicPageModule.forChild(OperationsStatementPage),
  ],
})
export class OperationsStatementPageModule {}
