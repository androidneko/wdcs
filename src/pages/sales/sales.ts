import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';

/**
 * Generated class for the SalesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sales',
  templateUrl: 'sales.html',
})
export class SalesPage {
  @ViewChild(Content) content:Content;
  dataArray:Array<any>=[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalesPage');
    // let merMenuList = AppServiceProvider.getInstance().userinfo.merUser.merRole.merMenuList;
    // for (var index = 0; index < merMenuList.length; index++) {
    //   var element = merMenuList[index];
    //  if (element.menuNumber!=null && element.menuNumber.length>3) {
    //    if(element.menuNumber.indexOf("M02")>=0){
    //     this.dataArray.push(element);
    //    }
    //  }
    // }
  }
  ionViewWillEnter(){
   console.log("saleswillenter");
   this.content.resize();
  }

}
