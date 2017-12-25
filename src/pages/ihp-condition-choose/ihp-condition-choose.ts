import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BasePage } from '../base/base';
import { TydatePipe } from '../../pipes/tydate/tydate';

/**
 * Generated class for the IhpConditionChoosePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  providers: [TydatePipe],
  selector: 'page-ihp-condition-choose',
  templateUrl: 'ihp-condition-choose.html',
})
export class IhpConditionChoosePage extends BasePage{
  
    providerUI:any = {name: "选择供应商"};
    productUI:any = {name: "选择商品",orderProdList:[]};
    provider:any={merName:"",merchantId:""};//供应商
    createStartDate:String = "";//开始时间
    createEndDate:String = "";//结束时间
  
    constructor(public mtoast:ToastController,public navCtrl: NavController, public navParams: NavParams,private datePipe:TydatePipe) {
      super(navCtrl,navParams,mtoast);
      let condition = navParams.data.condition;
      //填充时间选择条件
      if(condition.createStartDate==null||condition.createStartDate.length==0){
        this.createStartDate = this.datePipe.transform(new Date().setDate(1),"yyyy-MM-dd");
      }else{
        this.createStartDate = condition.createStartDate;
      }
      if(condition.createEndDate==null||condition.createEndDate.length==0){
        this.createEndDate = this.datePipe.transform(new Date(),"yyyy-MM-dd");
      }else{
        this.createEndDate = condition.createEndDate;
      }
      if(condition.orderProdList.length>0){
        var name = "";
        for (let index = 0; index < condition.orderProdList.length; index++) {
          let element = condition.orderProdList[index];
          if(index== 0){
            name = "" + element.productName;
          }else{
            name = name+ "," + element.productName;
          }
        }
        this.productUI.name = name;
      }
      //供应商
   
      this.provider = condition.provider;
      if (this.provider.merchantId!=null&&this.provider.merchantId.length>0) {
          this.providerUI.name = this.provider.merName;
      }
    }
  
    ionViewDidLoad() {
      console.log('ionViewDidLoad IhpConditionChoosePage');
    }
  
    //二次跳转选择条件，例如选择客户或仓库
    //选择供应商回调
    providersClicked(){
      console.log("IhpConditionChoosePage clientsClicked");
      this.navCtrl.push("PoConditionChooseProviderPage",{type:"choose",callback:provider=>{
        if (typeof(provider) != 'undefined'){
          this.provider = provider;
          // this.toastShort("收到回传数据:"+this.provider.merName);
          this.productUI ={name: "选择商品",orderProdList:[]};
          this.providerUI.name = this.provider.merName;
          console.log("收到回传数据:"+this.provider.merName);
          //todo
        }else {
          console.log("回传数据出错");
        }
      }});
    }
  
    //选择商品回调
    productClicked(){
      console.log("WhpConditionChoosePage storageClicked");
      if(this.provider.merchantId == null || this.provider.merchantId.length==0){
        this.toast("请选择供应商");
        return;
      }
      this.navCtrl.push("PoConditionChooseProductPage",{merchantId:this.provider.merchantId,callback:data=>{
        if (typeof(data.orderProdList) != 'undefined'){
          this.productUI.orderProdList = data.orderProdList;
          // this.toastShort("收到回传数据:"+this.product.name);
          if (data.orderProdList.length==0) {
            this.productUI.name = "选择商品";
          }else{
            var name = "";
            for (let index = 0; index < data.orderProdList.length; index++) {
              let element = data.orderProdList[index];
              if(index== 0){
                name = "" + element.productName;
              }else{
                name = name+ "," + element.productName;
              }
            }
            this.productUI.name = name;
          }
         
          console.log("收到回传数据:"+this.productUI.name);
          //todo
        }else {
          console.log("回传数据出错");
        }
      }});
    }
  
    //充值按钮点击
    resetClick(){
      //重置
     this.providerUI.name = "选择供应商";
     this.productUI.name = "选择商品";
     this.productUI.orderProdList=[];
     this.provider={merName:"",merchantId:""};
     
     this.createStartDate = this.datePipe.transform(new Date().setDate(1),"yyyy-MM-dd");
     this.createEndDate=this.datePipe.transform(new Date(),"yyyy-MM-dd");
    }
  
    //确定按钮点击事件
    confirmClick(){
      //确定
      let condition = { provider: this.provider,orderProdList:this.productUI.orderProdList, createStartDate: this.createStartDate, createEndDate: this.createEndDate };
      if (this.navParams.data.selectionCallback != null) {
        this.navCtrl.pop();
        this.navParams.data.selectionCallback(condition);
      }
    }

}
