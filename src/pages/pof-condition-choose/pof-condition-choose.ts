import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BasePage } from '../base/base';
import { TydatePipe } from '../../pipes/tydate/tydate';

/**
 * Generated class for the PofConditionChoosePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  providers: [TydatePipe],
  selector: 'page-pof-condition-choose',
  templateUrl: 'pof-condition-choose.html',
})
export class PofConditionChoosePage extends BasePage{
  providerUI:any = {name: "选择供应商"};
  productUI:any = {name: "选择商品"};
  product:any;//商品
  provider:any;//供应商
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
    //填充供应商和商品选择条件
    this.product =  condition.product;
    this.provider = condition.provider;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PofConditionChoosePage');
  }

  //二次跳转选择条件，例如选择供应商或仓库
  //选择供应商回调
  providersClicked(){
    console.log("PrConditionChoosePage providersClicked");
    this.navCtrl.push("PoConditionChooseProviderPage",{tag:"PofConditionChoosePage",callback:provider=>{
      if (typeof(provider) != 'undefined'){
        this.provider = provider;
        this.toastShort("收到回传数据:"+this.provider.name);
        console.log("收到回传数据:"+this.provider.name);
        //todo
      }else {
        console.log("回传数据出错");
      }
    }});
  }

  //选择商品回调
  productClicked(){
    console.log("WhpConditionChoosePage productClicked");
    this.navCtrl.push("PoConditionChooseProductPage",{tag:"PofConditionChoosePage",callback:product=>{
      if (typeof(product) != 'undefined'){
        this.product = product;
        this.toastShort("收到回传数据:"+this.product.name);
        console.log("收到回传数据:"+this.product.name);
        //todo
      }else {
        console.log("回传数据出错");
      }
    }});
  }

  //充值按钮点击
  resetClick(){
    //重置
   this.providerUI.name = "选择客户";
   this.productUI.name = "选择商品";
   this.provider=null;
   this.product=null;
   this.createStartDate = this.datePipe.transform(new Date().setDate(1),"yyyy-MM-dd");
   this.createEndDate=this.datePipe.transform(new Date(),"yyyy-MM-dd");
  }

  //确定按钮点击事件
  confirmClick(){
    //确定
    let condition = {client:this.provider,product:this.product,createStartDate:this.createStartDate,createEndDate:this.createEndDate};
    if (this.navParams.data.selectionCallback != null) {
      this.navCtrl.pop();
      this.navParams.data.selectionCallback(condition);
    }
  }
 
}
