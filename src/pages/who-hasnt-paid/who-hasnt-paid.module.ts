import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WhoHasntPaidPage } from './who-hasnt-paid';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    WhoHasntPaidPage,
  ],
  imports: [
    IonicPageModule.forChild(WhoHasntPaidPage),
    ComponentsModule,
    PipesModule
  ],
})
export class WhoHasntPaidPageModule {}
