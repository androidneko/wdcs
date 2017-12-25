import { BasePage } from './../base/base';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AppGlobal, AppServiceProvider } from '../../providers/app-service/app-service';
import { TyNetworkServiceProvider } from '../../providers/ty-network-service/ty-network-service';

/**
 * Generated class for the MyProductListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-product-list',
  templateUrl: 'my-product-list.html',
})
export class MyProductListPage extends BasePage {

  dataArray: Array<any> = [];
  total: number = -1;
  currentPage: number = 1;
  pageSize: number = 20;
  searchContent: String = "";
  condition = 
  {
    status:"",
    bigCate:  {
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
    smallCate:
    {
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
  constructor(public mtoast: ToastController, public navCtrl: NavController, public navParams: NavParams, private net: TyNetworkServiceProvider) {
    super(navCtrl, navParams, mtoast);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StockPage');
    this.sendQueryStockRequest(this.currentPage, null);
  }

  keydown(event) {
    if(event.keyCode==13){
      //返回确定按钮
      event.target.blur();
      this.sendQueryStockRequest(1,null);
      
      return false;
    }
  }
  itemEvent(item){
    this.sendRrouductDetail(item);
  }
  rightBtnClicked() {
    this.navCtrl.push("ProductCategoryChoosePage", {condition:JSON.parse(JSON.stringify(this.condition)),selectionCallback:this.selectionCallback});
  }
  addBtnCliked(){
    console.log("添加");
    this.navCtrl.push("NewProductPage",{callback:(msg)=>{
      if (msg == "refresh") {
        this.sendQueryStockRequest(1, null);
      }

    }});
  }
  //选择条件回调
  selectionCallback = (condition) => {
    if (typeof (condition) != 'undefined') {
      this.searchContent = "";
      this.condition = condition;
      this.sendQueryStockRequest(1, null);
      //todo
    } else {
      console.log("回传数据出错");
    }
  }

  //net 网络请求
  doRefresh(refresher) {
    //刷新
    console.log("下拉刷新");
    this.sendQueryStockRequest(1, refresher);
  }
  doInfinite(refresher) {
    console.log("上拉加载更多");
    this.sendQueryStockRequest(this.currentPage, refresher);
  }

  sendQueryStockRequest(page: any, refresher: any) {
    let bigCategory =this.condition.bigCate.customCategoryId;
    let littleCategory = this.condition.smallCate.customCategoryId;
    let params = 
    {
      "dataInfo":{
        "likeStr":this.searchContent,
        "merchantId":AppServiceProvider.getInstance().userinfo.MERCHANT_ID,
        "bigCategory":bigCategory,
        "littleCategory":littleCategory,
        "customLevelId":"",
        "status":this.condition.status//0商户下架1商户上架2运营下架
      },
      "start":  page==1?0:this.dataArray.length,
      "length": this.pageSize,
      "ACTION_NAME":"productFacade|findProductPage"
    };
    this.net.httpPost(AppGlobal.API.test,params,msg => {
      let obj = JSON.parse(msg);
      if (obj.ACTION_RETURN_CODE==AppGlobal.RETURNCODE.succeed) {
        if(page==1){
          this.dataArray = [];
        }
        let info = obj.ACTION_INFO;
        let list =  info.data;
        this.total = info.recordsTotal;
        for (let index = 0; index < list.length; index++) {
          let element = list[index];          
          // element.productName = element.proName;
          // element.productCode = element.proCode;
          // element.productNum=1;
          // element.productPrice=element.wholesalePrice;
          // element.productUnit = element.proUnit;
          // element.totalAmt = 0;
          // element.bigcate = element.bigCategory;
          // element.smallcate = element.littleCategory;
          // element.isSelected = false;
          this.dataArray.push(element);
        }
        this.currentPage = page;


      }else{
        this.total=0;
        this.toast(obj.ACTION_RETURN_MESSAGE);
      }
      if(refresher!=null){
        refresher.complete();
      }

    },error => {
      this.toast(error);
      this.total=0;
      if(refresher!=null){
          refresher.complete();
        }
    },refresher==null);
  }
  sendRrouductDetail(item){

    let params = 
    {
      "dataInfo":{
        "productId":item.productId,
        "merchantId":AppServiceProvider.getInstance().userinfo.MERCHANT_ID,
      },
      
      "ACTION_NAME":"productFacade|findProduct"
    };
    this.net.httpPost(AppGlobal.API.test,params,msg => {
      let obj = JSON.parse(msg);
      if (obj.ACTION_RETURN_CODE==AppGlobal.RETURNCODE.succeed) {
        if (obj.ACTION_INFO.data!=null&&obj.ACTION_INFO.data!="") {
          this.navCtrl.push("ProductDetailPage",{
            item:obj.ACTION_INFO.data,
            callback:(msg)=>{
              if (msg == "refresh") {
                this.sendQueryStockRequest(1, null);
              }
            }
          });
        }

      }else{
        this.toast(obj.ACTION_RETURN_MESSAGE);
      }
    

    },error => {
      this.toast(error);
   
    },true);
  }

}
