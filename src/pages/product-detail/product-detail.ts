import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProductDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {
  item={
    "advicePrice" : 20,
    "barCode" : "0002",
    "bigCategory" : "1",
    "createTime" : 1512576000000,
    "createUser" : "20171127090334739653765358278421",
    "isDelete" : "0",
    "littleCategory" : "2",
    "merchantId" : "0",
    "minOrder" : 500,
    "pkid" : "3",
    "proCode" : "0002",
    "proName" : "商品二",
    "proUnit" : "1",
    "productId" : "20171207194250687002396290288777",
    "shortName" : "spe",
    "specialOffer" : 5,
    "status" : "0",
    "wholesalePrice" : 10
  };
  imgArray=[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if (navParams.data.item!=null) {
      this.item = navParams.data.item;
      if (navParams.data.item.proIconDetail!=null&&navParams.data.item.proIconDetail.length>5) {
        let strArray:Array<string> = navParams.data.item.proIconDetail.split(",");
        if (strArray!=null) {
          for (let index = 0; index < strArray.length; index++) {
            const element = strArray[index];
            this.imgArray[index]=element;
          }
        }
    
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
  }
  deleteClick(){
    console.log("删除按钮点击");
  }
  changeClick(){
    console.log("修改");
    this.navCtrl.push("ChangeProudctInfoPage",{item:this.item,callback:(msg)=>{
      if (msg=="refresh") {
        if (this.navParams.data.callback!=null) {
          this.navParams.data.callback(msg);
        }
      }
    }});
  }
}
