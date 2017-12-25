import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InventoryOperationPage } from './inventory-operation';

@NgModule({
  declarations: [
    InventoryOperationPage,
  ],
  imports: [
    IonicPageModule.forChild(InventoryOperationPage),
  ],
})
export class InventoryOperationPageModule {}
