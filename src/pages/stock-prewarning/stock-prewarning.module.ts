import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StockPrewarningPage } from './stock-prewarning';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    StockPrewarningPage,
  ],
  imports: [
    IonicPageModule.forChild(StockPrewarningPage),
    ComponentsModule,
    PipesModule
  ],
})
export class StockPrewarningPageModule {}
