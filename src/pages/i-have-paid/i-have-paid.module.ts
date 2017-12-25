import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IHavePaidPage } from './i-have-paid';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    IHavePaidPage,
  ],
  imports: [
    IonicPageModule.forChild(IHavePaidPage),
    ComponentsModule,
    PipesModule
  ],
})
export class IHavePaidPageModule {}
