
import { Injectable } from '@angular/core';
declare var cordova;

/*
  Generated class for the DbServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DbServiceProvider {
  static username:String = "username";//当前用户名
  static password:String = "password";//当前用户密码
  constructor() {
 
  }
  saveString(str,key,success?,filed?){
    cordova.plugins.TYNative.saveString({"data":str,"key":key},() => {
      //成功
      if (success!=null) {
        success();
      }
    },() => {
           //失败
      if(filed!=null){
        filed();
      }

    });
  }
  getString(key,success,filed?){
    cordova.plugins.TYNative.getString(key,(msg) => {
      //成功
      if (success!=null) {
        success(msg);
      }
    },() => {
      //失败
      if (filed!=null) {
        filed();
      }
      
    });
  }

}
