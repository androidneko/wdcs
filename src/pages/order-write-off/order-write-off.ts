import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BasePage } from '../base/base';
import { TyNetworkServiceProvider } from '../../providers/ty-network-service/ty-network-service';
import { AppServiceProvider, AppGlobal } from '../../providers/app-service/app-service';




/**
 * Generated class for the OrderWriteOffPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-write-off',
  templateUrl: 'order-write-off.html',
})
export class OrderWriteOffPage extends BasePage{
  dealingsMerchantId:string="";
  total:any=-1;
  currentPage:any=0;
  pageSize:any = 20;
  totalAmt:number = 0;
  dataArray:Array<any>=[];
  amount:number=0;

  finActualVeracityWriteOffsList:Array<any>=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,public mtoast:ToastController,private net:TyNetworkServiceProvider) {
    super(navCtrl,navParams,mtoast);
    if(this.navParams.get("dealingsMerchantId")!="")
    {
      this.dealingsMerchantId=this.navParams.get("dealingsMerchantId");
    }
    if(this.navParams.get("amount")!="")
    {
      this.amount=this.navParams.get("amount");
    }
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderWriteOffPage');
    this.sendOrderRequest(1,null,true);
  }
  doRefresh(refreshScroll) {
    console.log('下拉刷新');
    this.sendOrderRequest(1,refreshScroll,true);
  }
  doInfinite(infiniteScroll) {
    console.log('上拉加载更多');
    this.sendOrderRequest(this.currentPage+1,infiniteScroll,false);
  }



  sendOrderRequest(page:any,refresher:any,isShowLoading:boolean){
    let params = 
    {

      "dataInfo": {
        "initiatorMerchantId": AppServiceProvider.getInstance().userinfo.MERCHANT_ID,
        //"dealingsMerchantId":this.dealingsMerchantId,
        "direction":"1"
      },
      "start":  page==1?0:this.dataArray.length,
      "length": this.pageSize,
      "ACTION_NAME":"finVeracityService|findFinVerByPage"
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
          //this.totalAmt +=  (element.writeOffBalance)
          element.maxBlance = element.balance-element.writeOffBalance;
          element.writeBalance = 0.00;
          element.isChecked = false;
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
      this.total = 0;
      if(refresher!=null){
          refresher.complete();
        }
    },isShowLoading);
  }


  /**
   * 
   * @param item 选择核算项目
   */
  clickItem(item)
  {
    console.log("点击"+item.isChecked);
    this.getTotalWriteBalance();
   
    // if(item.isChecked)
    // {
    //   item.writeOffBalance = item.balance-item.writeOffBalance;
    // }else{
    //   item.writeOffBalance = 0;
    // }
  }


  keyUp(blance,item)
  {


    if(blance.value==null||blance.value=="")
    {
      blance.value=0;  
     
    }else{ 
        var num:string =this.parseNum(blance.value);
        blance.value = num;  
    }
   
    // var f = parseFloat(blance.value);    
    // if (isNaN(f)) {    
    //     blance.value=0;
    //     return;    
    // }    
    // f = Math.round(blance.value*100)/100;    
    if(blance.value>(item.maxBlance))
    {
      let mblance=this.getSurplusBlance(item);
      if(item.maxBlance>mblance)
      {
        blance.value = mblance;
      }
      else
      {
        blance.value = item.maxBlance;
      }
    }else{
      let mblance=this.getSurplusBlance(item);
      if( blance.value>mblance)
      {
        blance.value = mblance;
      }
    }
    item.writeBalance = blance.value;
    this.getTotalWriteBalance();
    
  }

  parseNum(num:string):string{
    var reg0 =/^[1-9]\d*\.\d{0,2}$|0\.\d{0,2}$/;
      if(reg0.test(num))
      {
        return num;
      }
       var reg = /(^[0-9]([0-9]+)?(\.[0-9]{0,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([1-9])?$)/;
       if(!reg.test(num))
       {
         console.log(""+num);
         if(num.length>1)
         {
          let num1 = num.substring(0, num.length - 1);
          return this.parseNum(num1);
         }else
         {
           return "0";
         }
       }else{
         return num;
       }
       
     }


  getSurplusBlance(item):number
  {
    var nReturn:number=0
    this.dataArray.forEach(element => {
      if(element.isChecked)
      {
        if(element.businessNo != item.businessNo)
        nReturn+=element.writeBalance;
      }
    });
   return (this.amount - nReturn);
  }

  getTotalWriteBalance()
  {
    this.totalAmt=0;
    this.dataArray.forEach(element => {
      if(element.isChecked)
      {
        this.totalAmt+= parseFloat(element.writeBalance);
      }
    });
  }

  // toDecimal2(x) {    
  //   var f = parseFloat(x);    
  //   if (isNaN(f)) {    
  //       return false;    
  //   }    
  //   var f = Math.round(x*100)/100;    
  //   var s = f.toString();    
  //   var rs = s.indexOf('.');    
  //   if (rs < 0) {    
  //       rs = s.length;    
  //       s += '.';    
  //   }    
  //   while (s.length <= rs + 2) {    
  //       s += '0';    
  //   }    
  //   return s;    
  // }    

  
  comfirm()
  {
    console.log("全部核销");
    this.dataArray.forEach(element => {
        if(element.isChecked)
        {
            let item={
              "sourceNo":element.businessNo,
              "billType":element.billType,
              "writeOffBalance":element.writeBalance,
              "mark":""
            }
            this.finActualVeracityWriteOffsList.push(item);
        }
    });
    var callback= this.navParams.get("callback");
    if(callback!=null)
    {
      callback(this.finActualVeracityWriteOffsList);
    }
    this.navCtrl.pop();
  }
}
