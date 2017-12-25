import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WhoHasPaidPage } from './who-has-paid';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    WhoHasPaidPage,
  ],
  imports: [
    IonicPageModule.forChild(WhoHasPaidPage),
    ComponentsModule,
    PipesModule
  ],
})
export class WhoHasPaidPageModule {}
