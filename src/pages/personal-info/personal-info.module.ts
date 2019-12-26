import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonalInfoPage } from './personal-info';
import { MultiPickerModule } from 'ion-multi-picker';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    PersonalInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonalInfoPage),
    MultiPickerModule,
    ComponentsModule
  ],
})
export class PersonalInfoPageModule {}
