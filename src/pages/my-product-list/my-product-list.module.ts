import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyProductListPage } from './my-product-list';

@NgModule({
  declarations: [
    MyProductListPage,
  ],
  imports: [
    IonicPageModule.forChild(MyProductListPage),
    ComponentsModule
  ],
})
export class MyProductListPageModule {}
