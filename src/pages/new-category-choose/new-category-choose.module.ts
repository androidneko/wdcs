import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewCategoryChoosePage } from './new-category-choose';

@NgModule({
  declarations: [
    NewCategoryChoosePage,
  ],
  imports: [
    IonicPageModule.forChild(NewCategoryChoosePage),
  ],
})
export class NewCategoryChoosePageModule {}
