import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QrbCodeResultProductDetailPage } from './qrb-code-result-product-detail';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    QrbCodeResultProductDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(QrbCodeResultProductDetailPage),
    ComponentsModule,
    PipesModule
  ],
})
export class QrbCodeResultProductDetailPageModule {}
