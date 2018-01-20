import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KnowPeopleDetailPage } from './know-people-detail';

@NgModule({
  declarations: [
    KnowPeopleDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(KnowPeopleDetailPage),
  ],
})
export class KnowPeopleDetailPageModule {}
