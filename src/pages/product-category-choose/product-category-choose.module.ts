import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductCategoryChoosePage } from './product-category-choose';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ProductCategoryChoosePage,
  ],
  imports: [
    IonicPageModule.forChild(ProductCategoryChoosePage),
    ComponentsModule
  ],
})
export class ProductCategoryChoosePageModule {}
