import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyClientsPage } from './my-clients';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    MyClientsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyClientsPage),
    ComponentsModule
  ],
})
export class MyClientsPageModule {}
