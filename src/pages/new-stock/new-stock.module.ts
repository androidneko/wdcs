import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewStockPage } from './new-stock';

@NgModule({
  declarations: [
    NewStockPage,
  ],
  imports: [
    IonicPageModule.forChild(NewStockPage),
  ],
})
export class NewStockPageModule {}
