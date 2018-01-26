import { DbServiceProvider } from './../db-service/db-service';
import { Injectable, NgZone } from '@angular/core';

/*
  Generated class for the WebDbServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WebDbServiceProvider implements  DbServiceProvider{

  constructor(public zone:NgZone) {
 
  }
  saveString(str,key,success?,filed?){
      if(success){
        success();
      }
  }
  getString(key,success,filed?){
      if(key==DbServiceProvider.username){
        success("fuweidong0011");
      }else if (key==DbServiceProvider.password) {
        success('123456');
      }else{
        if(filed!=null){
          filed();
        }
      }
  }

}
