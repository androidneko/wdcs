import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KnowPeoplePage } from './know-people';

@NgModule({
  declarations: [
    KnowPeoplePage,
  ],
  imports: [
    IonicPageModule.forChild(KnowPeoplePage),
  ],
})
export class KnowPeoplePageModule {}
