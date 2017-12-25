import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddReceiptPage } from './add-receipt';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    AddReceiptPage,
  ],
  imports: [
    IonicPageModule.forChild(AddReceiptPage),
    PipesModule
  ],
})
export class AddReceiptPageModule {}
