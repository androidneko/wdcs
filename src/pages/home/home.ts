import { AppServiceProvider } from './../../providers/app-service/app-service';
import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
declare var cordova;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  dataArray:Array<any>=[];
  constructor(public navCtrl: NavController) {

  }
  ionViewDidLoad(){
    let merMenuList = AppServiceProvider.getInstance().userinfo.merUser.merRole.merMenuList;
      for (var index = 0; index < merMenuList.length; index++) {
        var element = merMenuList[index];
       if (element.menuNumber!=null && element.menuNumber.length>3) {
         if(element.menuNumber.indexOf("M01")>=0){
          this.dataArray.push(element);
         }
       }
      }
  }

  logEvent(event){
    console.log(event);
    cordova.plugins.TYNative.coolMethod("123",function(msg){
      alert(msg);
   }
   ,function(msg){
     alert(msg);
   });
    
  }
}
