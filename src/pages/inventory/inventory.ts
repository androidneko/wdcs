import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/**
 * Generated class for the InventoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html',
})
export class InventoryPage {

  condition = { 
    storage: {whseId:"",whseName:"选择仓库"},
    bigCate: {
    "categoryChild": [],
    "categoryIconUrl": "",
    "createTime": "",
    "createUser": "",
    "customCategoryId": "",
    "customCategoryName": "",
    "customParentId": "",
    "merchantId": "",
    "pkid": "",
    "productLevel": "",
    "state": "",
    "status": ""
  },
  smallCate:{
    "categoryChild": [],
    "categoryIconUrl": "",
    "createTime": "",
    "createUser": "",
    "customCategoryId": "",
    "customCategoryName": "",
    "customParentId": "",
    "merchantId": "",
    "pkid": "",
    "productLevel": "",
    "state": "",
    "status": ""
  }
};
total: number = -1;
currentPage: number = 1;
pageSize: number = 20;
searchContent: String = "";
  dataArray:Array<any>=["234","423432"];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InventoryPage');
  }
  itemClicked(item){
    console.log("item clicked");
    
  }
 
  rightBtnClicked(){
    console.log("筛选");
    this.navCtrl.push("InventorySelectPage",{condition:JSON.parse(JSON.stringify(this.condition)),callback:condition=>{
      if (typeof (condition) != 'undefined') {
        this.searchContent = "";
        this.condition = condition;
        //todo
      } else {
        console.log("回传数据出错");
      }
    }});


  }
  operationClick()
  {
    console.log("我要盘点");
    this.navCtrl.push("InventoryOperationPage");
  }

  keydown(event)
  {

  }

  //net 网络请求
  doRefresh(refresher) {
    //刷新
    console.log("下拉刷新");
    //this.sendPurchaseReportRequest(1, refresher);
  }
  doInfinite(refresher) {
    console.log("上拉加载更多");
    //this.sendPurchaseReportRequest(this.currentPage+1, refresher);
  }
}
