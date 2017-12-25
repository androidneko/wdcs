import { BasePage } from './../base/base';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { TydatePipe } from '../../pipes/tydate/tydate';

/**
 * Generated class for the SofConditionChoosePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  providers: [TydatePipe],
  selector: 'page-sof-condition-choose',
  templateUrl: 'sof-condition-choose.html',
})
export class SofConditionChoosePage extends BasePage{

  clientUI:any = {name: "选择客户"};
  productUI:any = {name: "选择商品"};
  product:any = {};//商品
  client:any = {};//客户
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
    //填充客户和商品选择条件
    this.product =  condition.product;
    this.client = condition.client;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SofConditionChoosePage');
  }

  //选择客户回调
  clientsClicked(){
    console.log("SrConditionChoosePage clientsClicked");
    this.navCtrl.push("MyClientsPage",{tag:"choose",callback:client=>{
      if (typeof(client) != 'undefined'){
        this.client = client;
        this.clientUI.name = client.merName;
        console.log("收到回传数据:"+this.client.merName);
        //todo
      }else {
        console.log("回传数据出错");
      }
    }});
  }

  //选择商品回调
  productClicked(){
    console.log("SofConditionChoosePage productClicked");
    this.navCtrl.push("PoConditionChooseProductPage",{tag:"SofConditionChoosePage",callback:product=>{
      if (typeof(product) != 'undefined'){
        this.product = product;
        if (this.product.orderProdList != null && typeof(product.orderProdList) != 'undefined'){
          this.productUI.name = "";
          for (let i = 0;i < product.orderProdList.length;i++){
            if(i == product.orderProdList.length-1){
              this.productUI.name += product.orderProdList[i].proName
            }else {
              this.productUI.name += product.orderProdList[i].proName+",";
            }  
          }
        }
      }else {
        console.log("回传数据出错");
      }
    }});
  }

  //充值按钮点击
  resetClick(){
    //重置
   this.clientUI.name = "请选择客户";
   this.productUI.name = "选择商品";
   this.product=[];
   this.client={};
   this.createStartDate = this.datePipe.transform(new Date().setDate(1),"yyyy-MM-dd");
   this.createEndDate=this.datePipe.transform(new Date(),"yyyy-MM-dd");
  }

  //确定按钮点击事件
  confirmClick(){
    //确定
    let condition = {client:this.client,storage:this.product,createStartDate:this.createStartDate,createEndDate:this.createEndDate};
    if (this.navParams.data.selectionCallback != null) {
      this.navCtrl.pop();
      this.navParams.data.selectionCallback(condition);
    }
  }

}
