import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonalInfoPage } from './personal-info';
import { MultiPickerModule } from 'ion-multi-picker';

@NgModule({
  declarations: [
    PersonalInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonalInfoPage),
    MultiPickerModule,
  ],
})
export class PersonalInfoPageModule {}
