import { AppServiceProvider, AppGlobal } from './../app-service/app-service';
import { Injectable, NgZone } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
declare var cordova;
/*
  Generated class for the TyNetworkServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TyNetworkServiceProvider {

  constructor(public loadingCtrl: LoadingController,public zone?:NgZone,public http?:Http,) {

  }
  encode(params) {
    var str = '';
    if (params) {
        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                var value = params[key];
                str += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
            }
        }
        str = '?' + str.substring(0, str.length - 1);
    }
    return str;
  }
  userLogin(url, params, success,failed, loader: boolean = false){
    let loading = this.loadingCtrl.create();
    if (loader) {
        loading.present();
    }
    cordova.plugins.TYNative.userLogin(params,msg => {
      //成功
      this.zone.runGuarded(()=>{
        if (loader) {
          loading.dismiss();
        }
        success(msg);
      });
      
    },(msg) => {
      //失败
      this.zone.runGuarded(()=>{
        if (loader) {
          loading.dismiss();
        }
        failed(msg);
      });
     
    });
    
  }
  httpPost(api, params, success,failed, loader: boolean = false) {

    //兼容部分接口模拟数据//
    // if("common|queryNews" == params.ACTION_NAME){
    //   this.webGet(url, params, success,failed, loader);
    //   return;
    // }
    let loading = this.loadingCtrl.create();
    console.log("post:"+api+"-->"+params);
    let sortParams = {};
    let sortKeys = Object.keys(params).sort();
    for (let index = 0; index < sortKeys.length; index++) {
      const key = sortKeys[index];
      sortParams[key] = params[key];
    }
   
    if (loader) {
        loading.present();
    }
    let mParams = {
    };
    if(AppServiceProvider.getInstance().userinfo!=null){
      mParams = {
        "requestActionName":params.ACTION_NAME,
        "sessionID":AppServiceProvider.getInstance().userinfo.SESSIONID,
        "userID":AppServiceProvider.getInstance().userinfo.USERID,
        "actionInfoStr":JSON.stringify(sortParams),
        "url":(AppGlobal.domain+api+"")
      };
    }else{
      mParams = {
        "requestActionName":params.ACTION_NAME,
        "actionInfoStr":JSON.stringify(sortParams),
        "url":(AppGlobal.domain+api+"")
      };
    }
    cordova.plugins.TYNative.post(mParams,msg=>{
      this.zone.runGuarded(()=>{
        if (loader) {
          loading.dismiss();
        }
        success(msg);
      });
    },error=>{
      this.zone.runGuarded(()=>{
        if (loader) {
          loading.dismiss();
        }
        failed(error);
      });
    });
  }
  httpGet(url, params, success,failed, loader: boolean = false) {
    let loading = this.loadingCtrl.create();
    if (loader) {
        loading.present();
    }
    let mParams = {
      "requestActionName":params.ACTION_NAME,
      "sessionID":AppServiceProvider.getInstance().userinfo.SESSIONID,
      "userID":AppServiceProvider.getInstance().userinfo.USERID,
      "actionInfoStr":JSON.stringify(params),
      "url":(AppGlobal.domain+url+"")
    };
    cordova.plugins.TYNative.get(mParams,msg=>{
    
      this.zone.runGuarded(()=>{
        if (loader) {
          loading.dismiss();
        }
        success(msg);
      });
    },error=>{
      this.zone.runGuarded(()=>{
        if (loader) {
          loading.dismiss();
        }
        failed(error);
      });
    });
  }

  ///////////////////////////////////////////兼容模拟数据/////////////////////////////////////////////////////////////
 
  webGet(url, params, success,failed, loader: boolean = false) {
    let loading = this.loadingCtrl.create();
    if (loader) {
        loading.present();
    }
    let actioname = params.ACTION_NAME.replace("|","");
    let murl ="assets/data/"+actioname+'.json';
    this.http.get(murl)
        .toPromise()
        .then(res => {

          setTimeout(() => {
            if (loader) {
              loading.dismiss();
            }
            
            let m=  res.text();
            var reg = /("([^\\\"]*(\\.)?)*")|('([^\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/)/g;
            let str = m.replace(reg,function(word) { // 去除注释后的文本  
              return /^\/{2,}/.test(word) || /^\/\*/.test(word) ? "" : word;  
          });
            success(str);
          }, 1000);

        })
        .catch(error => {

          setTimeout(() => {
            if (loader) {
              loading.dismiss();
            }
            console.log(error);
            failed(error.message);
          }, 1000);

        });
  }
}
