import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductDetailPage } from './product-detail';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    ProductDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductDetailPage),
    PipesModule
  ],
})
export class ProductDetailPageModule {}
