// import { AppGlobal } from './../app-service/app-service';
// import { TyNetworkServiceProvider } from './../ty-network-service/ty-network-service';
import { LoadingController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the WebTyNetworkServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WebTyNetworkServiceProvider {
    
      constructor(public http:Http,public loadingCtrl: LoadingController) {
      
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
        this.http.get("assets/data/userinfo.json")
            .toPromise()
            .then(res => {
                if (loader) {
                  loading.dismiss();
                }
                let obj = res.json();
                let str = JSON.stringify(obj);
                success(str);
            })
            .catch(error => {
              if (loader) {
                loading.dismiss();
              }
              console.log(error);
              failed(error.message);
            });
      }

      httpPost(url, params, success,failed, loader: boolean = false) {
        this.httpGet(url, params, success,failed, loader);
        // let loading = this.loadingCtrl.create();
        // if (loader) {
        //     loading.present();
        // }
        // let mparams = {
        //   "ACTION_INFO":JSON.stringify(params),
        //   "ACTION_NAME" : params.ACTION_NAME,
        //   "ACTION_INVOKER":{
        //     "SP":"200",
        //     "VER":"2",
        //     "OSNAME":"01",
        //     "PHONE_VENDER":"APPLE",
        //     "INNERVERSION":"201",
        //     "APPINNERVERSION":"201",
        //     "PROJECT_NAME":"MyApp"
        //   },
        //   "ACTION_TOKEN":{
        //     "TIMESTAMP" : 1513166518
        //   }
        // };
        // this.http.post(AppGlobal.domain+url,mparams)
        //     .toPromise()
        //     .then(res => {

        //       setTimeout(() => {
        //         if (loader) {
        //           loading.dismiss();
        //         }
                
        //         let m=  res.json();
        //         if (typeof(m.ACTION_INFO) == "string") {
        //            m.ACTION_INFO=JSON.parse(m.ACTION_INFO);

        //         }
        //         success(m);
        //       }, 1000);

        //     })
        //     .catch(error => {

        //       setTimeout(() => {
        //         if (loader) {
        //           loading.dismiss();
        //         }
        //         console.log(error);
        //         failed(error.message);
        //       }, 1000);

        //     });
      }

      httpGet(api, params, success,failed, loader: boolean = false) {
        let loading = this.loadingCtrl.create();
        if (loader) {
            loading.present();
        }
        let i = api.lastIndexOf('/');
        let actioname = api.substring(i+1);
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
