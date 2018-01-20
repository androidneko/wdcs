import { PhotoViewer } from '@ionic-native/photo-viewer';
import { KnowPeopleDetailPageModule } from './../pages/know-people-detail/know-people-detail.module';
import { PhotoSelectsPageModule } from './../pages/photo-selects/photo-selects.module';
import { KnowPeoplePageModule } from './../pages/know-people/know-people.module';
import { UploadPlantManagerPageModule } from './../pages/upload-plant-manager/upload-plant-manager.module';
import { NewPlantPageModule } from './../pages/new-plant/new-plant.module';
import { AddRecordPageModule } from './../pages/add-record/add-record.module';
import { HomePageModule } from './../pages/home/home.module';
import { ForgetPasswordPageModule } from './../pages/forget-password/forget-password.module';
import { TabsPageModule } from './../pages/tabs/tabs.module';
import { RegistPageModule } from './../pages/regist/regist.module';
import { BuildingPageModule } from './../pages/building/building.module';

import { MultiPickerModule } from 'ion-multi-picker';
import { Http, HttpModule } from '@angular/http';
import { LoginPageModule } from './../pages/login/login.module';
import { NgModule, ErrorHandler, NgZone } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, Platform, LoadingController } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ComponentsModule } from '../components/components.module';
import { AppServiceProvider } from '../providers/app-service/app-service';
import { TyNetworkServiceProvider } from '../providers/ty-network-service/ty-network-service';
import { DbServiceProvider } from '../providers/db-service/db-service';
import { WebDbServiceProvider } from '../providers/web-db-service/web-db-service';
import { WebTyNetworkServiceProvider } from '../providers/web-ty-network-service/web-ty-network-service';
import { DeviceIntefaceServiceProvider } from '../providers/device-inteface-service/device-inteface-service';
import { BusinessPageModule } from '../pages/business/business.module';
import { ModifyPwdPageModule } from '../pages/modify-pwd/modify-pwd.module';
import { PersonalInfoPageModule } from '../pages/personal-info/personal-info.module';
import { Camera } from '@ionic-native/camera';
import { NewInfoPageModule } from '../pages/new-info/new-info.module';
import { File } from '@ionic-native/file';
import { PlantDetailPageModule } from '../pages/plant-detail/plant-detail.module';
import { UploadManagerProvider } from '../providers/upload-manager/upload-manager';

export function netFactory(platform:Platform,loadingCtrl:LoadingController,http:Http,zone:NgZone) {
  if (platform.is("mobileweb")||platform.is("mobile")) {
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
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{
      backButtonText: '返回', 
      iconMode: 'ios',//安卓icon强制使用ios的icon以及样式
      mode: 'ios',//样式强制使用ios样式
    }),
    MultiPickerModule,
    ComponentsModule,
    LoginPageModule,
    HomePageModule,
    BuildingPageModule,
    RegistPageModule,
    BusinessPageModule,
    TabsPageModule,
    ModifyPwdPageModule,
    ForgetPasswordPageModule,
    PersonalInfoPageModule,
    NewInfoPageModule,
    AddRecordPageModule,
    PlantDetailPageModule,
    NewPlantPageModule,
    UploadPlantManagerPageModule,
    KnowPeoplePageModule,
    PhotoSelectsPageModule,
    KnowPeopleDetailPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    PhotoViewer,
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppServiceProvider,
    {provide:TyNetworkServiceProvider,useFactory:netFactory,
      deps:[Platform,LoadingController,Http,NgZone]
    },
    {provide: DbServiceProvider,useFactory:dbFactory,
      deps:[Platform]
    },
    {provide: WebDbServiceProvider,useFactory:dbFactory,
      deps:[Platform]
    },
    DeviceIntefaceServiceProvider,
    UploadManagerProvider
  ]
})
export class AppModule {}
