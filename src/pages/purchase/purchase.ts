import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PurchasePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-purchase',
  templateUrl: 'purchase.html',
})
export class PurchasePage {
  dataArray:Array<any>=[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PurchasePage');
    // let merMenuList = AppServiceProvider.getInstance().userinfo.merUser.merRole.merMenuList;
    // for (var index = 0; index < merMenuList.length; index++) {
    //   var element = merMenuList[index];
    //  if (element.menuNumber!=null && element.menuNumber.length>3) {
    //    if(element.menuNumber.indexOf("M03")>=0){
    //      console.log(element.menuName);
    //     this.dataArray.push(element);
    //    }
    //  }
    // }
  }
//btnAction
  fastPayClicked(){
    console.log("fastpayCliked");
    this.navCtrl.push("FastPayPage");
  }
//付款记录
  paytHistoyClicked(){
    console.log("paytHistoyClicked");
    this.navCtrl.push("PayHistoryPage");
  }
}
