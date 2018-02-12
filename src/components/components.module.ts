import { PipesModule } from './../pipes/pipes.module';
import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { IonTyfunctionGridComponent } from './ion-tyfunction-grid/ion-tyfunction-grid';
import { BusinessItemComponent } from './business-item/business-item';
import { IonProductChooseItemComponent } from './ion-product-choose-item/ion-product-choose-item';
import { IonAllitemShowedBottomComponent } from './ion-allitem-showed-bottom/ion-allitem-showed-bottom';
import { IonCustomEmptyComponent } from './ion-custom-empty/ion-custom-empty';
import { IonTyInventoryComponent } from './ion-ty-inventory/ion-ty-inventory';
import { JlStockItemComponent } from './jl-stock-item/jl-stock-item';
import { JlProductItemComponent } from './jl-product-item/jl-product-item';
import { JlProductConditionItemsComponent } from './jl-product-condition-items/jl-product-condition-items';
import { JlStockInoutItemComponent } from './jl-stock-inout-item/jl-stock-inout-item';
import { JlStockPrewarningItemComponent } from './jl-stock-prewarning-item/jl-stock-prewarning-item';
import { JlRabtnComponent } from './jl-rabtn/jl-rabtn';
import { JlOrdersItemComponent } from './jl-orders-item/jl-orders-item';
import { JlDatePickerComponent } from './jl-date-picker/jl-date-picker';
import { JlCounterInputComponent } from './jl-counter-input/jl-counter-input';
import { JlCheckboxComponent } from './jl-checkbox/jl-checkbox';
import { JlStartendDatepickerItemComponent } from './jl-startend-datepicker-item/jl-startend-datepicker-item';
import { BusinessItemEditComponent } from './business-item-edit/business-item-edit';
import { BusinessItemEcharsComponent } from './business-item-echars/business-item-echars';
import { BusinessItemEcharComponent } from './business-item-echar/business-item-echar';
import { JlBlanceSpliterComponent } from './jl-blance-spliter/jl-blance-spliter';
import { PlantItemComponent } from './plant-item/plant-item';
import { PhotoItemComponent } from './photo-item/photo-item';
import { MessageItemComponent } from './message-item/message-item';
import { ImgLazyLoadComponent } from './img-lazy-load/img-lazy-load';
import { PicItemComponent } from './pic-item/pic-item';
@NgModule({
	declarations: [IonTyfunctionGridComponent,
    BusinessItemComponent,
    IonProductChooseItemComponent,
    IonAllitemShowedBottomComponent,
    IonCustomEmptyComponent,
    IonTyInventoryComponent,
    JlStockItemComponent,
    JlProductItemComponent,
    JlProductConditionItemsComponent,
    JlStockInoutItemComponent,
    JlStockPrewarningItemComponent,
    JlRabtnComponent,
    JlOrdersItemComponent,
    JlDatePickerComponent,
    JlOrdersItemComponent,
    JlCounterInputComponent,
    JlCheckboxComponent,
    JlStartendDatepickerItemComponent,
    BusinessItemEditComponent,
    JlStartendDatepickerItemComponent,
    BusinessItemEcharsComponent,
    BusinessItemEcharComponent,
    JlBlanceSpliterComponent,
    PlantItemComponent,
    PhotoItemComponent,
    MessageItemComponent,
    ImgLazyLoadComponent,
    PicItemComponent],

	imports: [IonicModule,PipesModule],
	exports: [IonTyfunctionGridComponent,
    BusinessItemComponent,
    IonProductChooseItemComponent,
    IonAllitemShowedBottomComponent,
    IonCustomEmptyComponent,
    JlStockItemComponent,
    IonTyInventoryComponent,
    JlProductItemComponent,
    JlProductConditionItemsComponent,
    JlStockInoutItemComponent,
    JlStockPrewarningItemComponent,
    JlRabtnComponent,
    JlOrdersItemComponent,
    JlDatePickerComponent,
    JlOrdersItemComponent,
    JlCounterInputComponent,
    JlCheckboxComponent,
    JlStartendDatepickerItemComponent,
    BusinessItemEditComponent,
    JlStartendDatepickerItemComponent,
    BusinessItemEcharsComponent,
    BusinessItemEcharComponent,
    JlBlanceSpliterComponent,
    PlantItemComponent,
    PhotoItemComponent,
    MessageItemComponent,
    ImgLazyLoadComponent,
    PicItemComponent]

})
export class ComponentsModule {}
