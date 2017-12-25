import { TydatePipe } from './../../pipes/tydate/tydate';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { BasePage } from '../base/base';
import { TyNetworkServiceProvider } from '../../providers/ty-network-service/ty-network-service';
import { AppServiceProvider, AppGlobal } from '../../providers/app-service/app-service';



/**
 * Generated class for the SalesOrderChangePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  providers:[TydatePipe],
  selector: 'page-sales-order-change',
  templateUrl: 'sales-order-change.html',
})
export class SalesOrderChangePage extends BasePage{
  //dataArray:Array<any> = ["123"]
  // createDate:"";
  item:any=[];
  itemOrderProdList:any=[];
  payAmt:any=0;
  str:string="";
  createDate:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl:ToastController,private net:TyNetworkServiceProvider,private dataPipe:TydatePipe,public alertCtrl:AlertController) {
   super(navCtrl,navParams,toastCtrl);
   if (navParams.data.item !=null) {
       this.str = JSON.stringify(navParams.data.item);
      this.item = JSON.parse(this.str);
      this.createDate = this.dataPipe.transform(this.item.createDate,"yyyy-MM-dd");
    }
  }


  // transform(value: any, format:string,...args):any {
  //   let Dates = new Date( value );
  //   let year: number = Dates.getFullYear();
  //   let month: any = ( Dates.getMonth() + 1 ) < 10 ? '0' + ( Dates.getMonth() + 1 ) : ( Dates.getMonth() + 1 );
  //   let day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
  //   let h = Dates.getHours();
  //   let m = Dates.getMinutes();
  //   let s = Dates.getHours();
  //   return format.replace("yyyy",year+"").replace("MM",month+"").replace("dd",day+"").replace("HH",h+"").replace("mm",m+"").replace("ss",s+"");
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalesOrderChangePage');
  }
  customerClicked()
  {
    //选择客户
    // this.navCtrl.push("MyClientsPage",{tag:"AddSalesOrderPage",callback:client=>{
    //   if (typeof(client) != 'undefined'){
      
    //     this.condition.customerItem.customerName = client.merName;
    //     this.condition.customerItem.customerId = client.streamNo;
    //     //todo
    //   }else {
    //     console.log("回传数据出错");
    //   }
    // }});
  }
  warehouseClicked()
  {
    //仓库选择
    this.navCtrl.push("PoConditionChooseStoragePage",{callback:(msg)=>{
        this.item.whseId =msg.warehouseId;
        this.item.whseName =msg.warehouseName;
    }});
  }
  // dateClicked()
  // {
  //   //时间选择
  // }
  choiceClicked()
  {
    //选择商品
    this.navCtrl.push("PoConditionChooseProductPage",{type:"sales",
      callback:(data)=>{
        //this.payAmt =data.totalAmt;
        this.item.payAmt=data.totalAmt;
        this.item.orderProdlist = data.orderProdList;
      }
    });
  }

  //清空商品
  emptyProduct()
  {
    //清空商品
    this.item.payAmt = 0;
    this.item.orderProdlist=[];
    this.item.remark="";
  }
  reset()
  {
    //重置

    let alert = this.alertCtrl.create({
      message:'是否重置?',
      buttons:[
          {
            text:'否',
            cssClass:"alertDialogClass_balck",
            handler:()=>{
              console.log("取消");
            }
          },
          {
            text:'是',
            cssClass:"alertDialogClass_normal",
            handler:()=>{
              console.log("确定");
              this.item = JSON.parse(this.str);
            }
          }
      ]
    });
    alert.present();

  
  }

  comfirm()
  {
    console.log("确定")
    if(this.item.orderProdlist.length<=0|| this.item.orderProdlist==[])
    {
      this.toast("请选择商品");
      return;
    }
    this.sendRequest();
  }

  sendRequest(){
    
    let Dates = new Date( this.createDate );
    var date: number = Dates.getTime();
    this.item.createDate = date;

    // var totalAmt = 0.00;
    this.item.orderProdlist.forEach(element => {
      element.orderId = this.item.orderId;
    });

    let params = 
    {
      "order":
      {
        "orderId":this.item.orderId,
        "buyerMerchantId": this.item.merchantId,
        "sellerMerchantId":AppServiceProvider.getInstance().userinfo.MERCHANT_ID,
        "ownedMerchantId":AppServiceProvider.getInstance().userinfo.MERCHANT_ID,
        "orderClass":"01",
        "totalAmt": this.item.payAmt,
        "payAmt": this.item.payAmt,
        "whseId": this.item.whseId,
        "whseName": this.item.whseName,
        "createDate":this.item.createDate,
        "buyerId": AppServiceProvider.getInstance().userinfo.USERID,
        "remark":this.item.remark
      },
        "ACTION_NAME":"orderFacadeAPI|updateOrder",
        "orderProdList":this.item.orderProdlist
    };
    this.net.httpPost(AppGlobal.API.test,params,msg => {
      let obj = JSON.parse(msg);
      if (obj.ACTION_RETURN_CODE==AppGlobal.RETURNCODE.succeed||obj.ACTION_RETURN_CODE==null) {
        //this.navCtrl.push("PurchaseOrderDetailPage",{item:obj.ACTION_INFO});
        var callback = this.navParams.get("callback");
        callback(this.item);
        this.toast(obj.ACTION_RETURN_MESSAGE);
        this.navCtrl.pop();
      }else{
        this.toast(obj.ACTION_RETURN_MESSAGE);
      }
      
    },error => {
      this.toast(error);
    },true);
  }
}


