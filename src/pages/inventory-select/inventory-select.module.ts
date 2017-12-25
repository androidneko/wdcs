import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InventorySelectPage } from './inventory-select';

@NgModule({
  declarations: [
    InventorySelectPage,
  ],
  imports: [
    IonicPageModule.forChild(InventorySelectPage),
  ],
})
export class InventorySelectPageModule {}
