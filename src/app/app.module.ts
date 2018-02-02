import { PhotoViewer } from '@ionic-native/photo-viewer';
import { MultiPickerModule } from 'ion-multi-picker';
import { Http, HttpModule } from '@angular/http';
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
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { UploadManagerProvider } from '../providers/upload-manager/upload-manager';

export function netFactory(platform:Platform,loadingCtrl:LoadingController,http:Http,zone:NgZone) {
  if (platform.is("mobileweb") /*||platform.is("mobile")*/) {
    return new WebTyNetworkServiceProvider(http,loadingCtrl);
  }else if(platform.is("mobile")){
    return new TyNetworkServiceProvider(loadingCtrl,zone,http);
  }else{
    return new WebTyNetworkServiceProvider(http,loadingCtrl);
  }
}
export function dbFactory(platform:Platform,zone:NgZone) {
  if (platform.is("mobileweb")) {
    return new WebDbServiceProvider(zone);
  }else if(platform.is("mobile")){
    return new DbServiceProvider(zone);
  }else{
    return new WebDbServiceProvider(zone);
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
    ComponentsModule
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
      deps:[Platform,NgZone]
    },
    DeviceIntefaceServiceProvider,
    UploadManagerProvider,
    NativePageTransitions
  ]
})
export class AppModule {}
