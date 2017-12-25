import { BusinessEditPageModule } from './../pages/business-edit/business-edit.module';
import { ForgetPasswordPageModule } from './../pages/forget-password/forget-password.module';
import { AddPayOrderPageModule } from './../pages/add-pay-order/add-pay-order.module';
import { DiscoveryPageModule } from './../pages/discovery/discovery.module';
import { StockLocationPageModule } from './../pages/stock-location/stock-location.module';
import { NewStockPageModule } from './../pages/new-stock/new-stock.module';
import { ChangeProviderInfoPageModule } from './../pages/change-provider-info/change-provider-info.module';
import { SalesOrderOutPageModule } from './../pages/sales-order-out/sales-order-out.module';
import { ChangeProudctInfoPageModule } from './../pages/change-proudct-info/change-proudct-info.module';
import { SalesOrderChangePageModule } from './../pages/sales-order-change/sales-order-change.module';

import { MyProductListPageModule } from './../pages/my-product-list/my-product-list.module';
import { OrderWriteOffPageModule } from './../pages/order-write-off/order-write-off.module';
import { SettlementAccountPageModule } from './../pages/settlement-account/settlement-account.module';
import { ActionSheetPageModule } from './../pages/action-sheet/action-sheet.module';
import { OrderPayerPageModule } from './../pages/order-payer/order-payer.module';
import { AddReceiptPageModule } from './../pages/add-receipt/add-receipt.module';
import { IhpConditionChoosePageModule } from './../pages/ihp-condition-choose/ihp-condition-choose.module';
import { IHavntPaidPageModule } from './../pages/i-havnt-paid/i-havnt-paid.module';
import { WhpConditionChoosePageModule } from './../pages/whp-condition-choose/whp-condition-choose.module';
import { StockConditionChoosePageModule } from './../pages/stock-condition-choose/stock-condition-choose.module';
import { NewContactPageModule } from './../pages/new-contact/new-contact.module';
import { StockInOutPageModule } from './../pages/stock-in-out/stock-in-out.module';
import { StockPageModule } from './../pages/stock/stock.module';
import { InventoryOperationPageModule } from './../pages/inventory-operation/inventory-operation.module';
import { InventoryPageModule } from './../pages/inventory/inventory.module';
import { SalesOrderDetailPageModule } from './../pages/sales-order-detail/sales-order-detail.module';
import { FeedbackPageModule } from './../pages/feedback/feedback.module';
import { SettingPageModule } from './../pages/setting/setting.module';
import { MessageListPageModule } from './../pages/message-list/message-list.module';
import { PurchaseOrderDetailPageModule } from './../pages/purchase-order-detail/purchase-order-detail.module';
import { SelectWarehousePageModule } from './../pages/select-warehouse/select-warehouse.module';
import { SelectCustomerPageModule } from './../pages/select-customer/select-customer.module';
import { OrderSelectPageModule } from './../pages/order-select/order-select.module';
import { SalesOrderPageModule } from './../pages/sales-order/sales-order.module';
import { SofConditionChoosePageModule } from './../pages/sof-condition-choose/sof-condition-choose.module';
import { SalesOrderFollowPageModule } from './../pages/sales-order-follow/sales-order-follow.module';
import { ClientDetailPageModule } from './../pages/client-detail/client-detail.module';
import { NewClientPageModule } from './../pages/new-client/new-client.module';
import { MyClientsPageModule } from './../pages/my-clients/my-clients.module';
import { SalesReportPageModule } from './../pages/sales-report/sales-report.module';
import { QrbCodeResultProductDetailPageModule } from './../pages/qrb-code-result-product-detail/qrb-code-result-product-detail.module';

import { ProductSmallcategoryChoosePageModule } from './../pages/product-smallcategory-choose/product-smallcategory-choose.module';
import { ProductBigcategoryChoosePageModule } from './../pages/product-bigcategory-choose/product-bigcategory-choose.module';
import { ProviderDetailPageModule } from './../pages/provider-detail/provider-detail.module';
import { OperationsStatementPageModule } from './../pages/operations-statement/operations-statement.module';
import { TabsPageModule } from './../pages/tabs/tabs.module';
import { MyClientPageModule } from './../pages/my-client/my-client.module';
import { MyClientManagerPageModule } from './../pages/my-client-manager/my-client-manager.module';
import { ProductCategoryChoosePageModule } from './../pages/product-category-choose/product-category-choose.module';
import { PofConditionChoosePageModule } from './../pages/pof-condition-choose/pof-condition-choose.module';
import { PoConditionChooseStoragePageModule } from './../pages/po-condition-choose-storage/po-condition-choose-storage.module';
import { PoConditionChooseProviderPageModule } from './../pages/po-condition-choose-provider/po-condition-choose-provider.module';
import { RegistPageModule } from './../pages/regist/regist.module';
import { BuildingPageModule } from './../pages/building/building.module';
import { FastRecivePageModule } from './../pages/fast-recive/fast-recive.module';
import { Http, HttpModule } from '@angular/http';
import { LoginPageModule } from './../pages/login/login.module';
import { PurchasePageModule } from './../pages/purchase/purchase.module';
import { MyPageModule } from './../pages/my/my.module';
import { SalesPageModule } from './../pages/sales/sales.module';
import { NgModule, ErrorHandler, NgZone } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, Platform, LoadingController } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ComponentsModule } from '../components/components.module';
import { AppServiceProvider } from '../providers/app-service/app-service';
import { TyNetworkServiceProvider } from '../providers/ty-network-service/ty-network-service';
import { DbServiceProvider } from '../providers/db-service/db-service';
import { WebDbServiceProvider } from '../providers/web-db-service/web-db-service';
import { WebTyNetworkServiceProvider } from '../providers/web-ty-network-service/web-ty-network-service';
import { DeviceIntefaceServiceProvider } from '../providers/device-inteface-service/device-inteface-service';
import { FastPayPageModule } from '../pages/fast-pay/fast-pay.module';
import { OrderPayPageModule } from '../pages/order-pay/order-pay.module';
import { BusinessPageModule } from '../pages/business/business.module';
import { PurchaseOderPageModule } from '../pages/purchase-oder/purchase-oder.module';
import { PoConditionChoosePageModule } from '../pages/po-condition-choose/po-condition-choose.module';
import { NewPurchaseOrderPageModule } from '../pages/new-purchase-order/new-purchase-order.module';
import { PoConditionChooseProductPageModule } from '../pages/po-condition-choose-product/po-condition-choose-product.module';
import { PurchaseOrderFollowPageModule } from '../pages/purchase-order-follow/purchase-order-follow.module';
import { ModifyPwdPageModule } from '../pages/modify-pwd/modify-pwd.module';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { AddSalesOrderPageModule } from '../pages/add-sales-order/add-sales-order.module';
import { PersonalInfoPageModule } from '../pages/personal-info/personal-info.module';
import { InventorySelectPageModule } from '../pages/inventory-select/inventory-select.module';
import { WhoHasPaidPageModule } from '../pages/who-has-paid/who-has-paid.module';
import { WhoHasntPaidPageModule } from '../pages/who-hasnt-paid/who-hasnt-paid.module';
import { IHavePaidPageModule } from '../pages/i-have-paid/i-have-paid.module';
import { MyQrcodePageModule } from '../pages/my-qrcode/my-qrcode.module';
import { MyRecommendPageModule } from '../pages/my-recommend/my-recommend.module';
import { MessageDetailPageModule } from '../pages/message-detail/message-detail.module';
import { NewProductPageModule } from '../pages/new-product/new-product.module';
import { Camera } from '@ionic-native/camera';
import { PurchaseOrderInPageModule } from '../pages/purchase-order-in/purchase-order-in.module';
import { StockioConditionChoosePageModule } from '../pages/stockio-condition-choose/stockio-condition-choose.module';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { MyIframePageModule } from '../pages/my-iframe/my-iframe.module';

export function netFactory(platform:Platform,loadingCtrl:LoadingController,http:Http,zone:NgZone) {
  if (platform.is("mobileweb")) {
    return new WebTyNetworkServiceProvider(http,loadingCtrl);
  }else if(platform.is("mobile")){
    return new TyNetworkServiceProvider(loadingCtrl,zone,http);
  }else{
    return new WebTyNetworkServiceProvider(http,loadingCtrl);
  }
}
export function dbFactory(platform:Platform) {
  if (platform.is("mobileweb")) {
    return new WebDbServiceProvider();
  }else if(platform.is("mobile")){
    return new DbServiceProvider();
  }else{
    return new WebDbServiceProvider();
  }
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutPage,
    ContactPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{
      backButtonText: '返回', 
      iconMode: 'ios',//安卓icon强制使用ios的icon以及样式
      mode: 'ios',//样式强制使用ios样式
    }),
    ComponentsModule,
    SalesPageModule,
    MyPageModule,
    PurchasePageModule,
    LoginPageModule,
    FastRecivePageModule,
    FastPayPageModule,
    BuildingPageModule,
    OrderPayPageModule,
    RegistPageModule,
    BusinessPageModule,
    PurchaseOderPageModule,
    PoConditionChoosePageModule,
    NewPurchaseOrderPageModule,
    PoConditionChooseProviderPageModule,
    PoConditionChooseProductPageModule,
    PoConditionChooseStoragePageModule,
    PurchaseOrderFollowPageModule,
    PofConditionChoosePageModule,
    ProductCategoryChoosePageModule,
    MyClientManagerPageModule,
    MyClientPageModule,
    TabsPageModule,
    OperationsStatementPageModule,
    ModifyPwdPageModule,
    ProviderDetailPageModule,
    SalesOrderPageModule,
    OrderSelectPageModule,
    SelectCustomerPageModule,
    SelectWarehousePageModule,
    ProductBigcategoryChoosePageModule,
    ProductSmallcategoryChoosePageModule,
    SalesReportPageModule,
    MyClientsPageModule,
    NewClientPageModule,
    ClientDetailPageModule,
    SalesOrderFollowPageModule,
    SofConditionChoosePageModule,
    QrbCodeResultProductDetailPageModule,
    ProductSmallcategoryChoosePageModule,
    AddSalesOrderPageModule,
    PurchaseOrderDetailPageModule,
    PersonalInfoPageModule,
    NewContactPageModule,
    SalesOrderDetailPageModule,
    InventoryPageModule,
    InventorySelectPageModule,
    InventoryOperationPageModule,
    PersonalInfoPageModule,
    SettingPageModule,
    MessageListPageModule,
    FeedbackPageModule,
    MyProductListPageModule,
    StockPageModule,
    StockInOutPageModule,
    StockConditionChoosePageModule,
    WhoHasPaidPageModule,
    WhoHasntPaidPageModule,
    WhpConditionChoosePageModule,
    IHavePaidPageModule,
    IHavntPaidPageModule,
    IhpConditionChoosePageModule,
    AddReceiptPageModule,
    OrderPayerPageModule,
    ActionSheetPageModule,
    SettlementAccountPageModule,
    OrderWriteOffPageModule,
    MyQrcodePageModule,
    MyRecommendPageModule,
    SalesOrderChangePageModule,
    SalesOrderOutPageModule,
    MessageDetailPageModule,
    NewProductPageModule,
    ChangeProudctInfoPageModule,
    ChangeProviderInfoPageModule,
    PurchaseOrderInPageModule,
    NewStockPageModule,
    StockLocationPageModule,
    PurchaseOrderInPageModule,
    StockioConditionChoosePageModule,
    DiscoveryPageModule,
    AddPayOrderPageModule,
    ForgetPasswordPageModule,
    BusinessEditPageModule,
    MyIframePageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AboutPage,
    ContactPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppServiceProvider,
    {provide:TyNetworkServiceProvider,useFactory:netFactory,
      deps:[Platform,LoadingController,Http,NgZone]
    },
    {provide: DbServiceProvider,useFactory:dbFactory,
      deps:[Platform]
    },
    DeviceIntefaceServiceProvider,
    PhotoLibrary
  ]
})
export class AppModule {}
