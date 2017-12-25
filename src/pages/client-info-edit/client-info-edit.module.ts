import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientInfoEditPage } from './client-info-edit';

@NgModule({
  declarations: [
    ClientInfoEditPage,
  ],
  imports: [
    IonicPageModule.forChild(ClientInfoEditPage),
  ],
})
export class ClientInfoEditPageModule {}
