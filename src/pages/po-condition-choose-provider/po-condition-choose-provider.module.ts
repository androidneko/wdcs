import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PoConditionChooseProviderPage } from './po-condition-choose-provider';

@NgModule({
  declarations: [
    PoConditionChooseProviderPage,
  ],
  imports: [
    IonicPageModule.forChild(PoConditionChooseProviderPage),
    ComponentsModule
  ],
})
export class PoConditionChooseProviderPageModule {}
