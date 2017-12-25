import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TydatePipe } from '../../pipes/tydate/tydate';

/**
 * Generated class for the PoConditionChoosePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  providers:[TydatePipe],
  selector: 'page-po-condition-choose',
  templateUrl: 'po-condition-choose.html',
})
export class PoConditionChoosePage {

  stockStatus:any="";//00未入库 01已入库 空不限
  payStatus:any="";//00未付款 01已付款 空 不限
  orderNo:String = "";//订单编号
  
  mitem={merchantId:"",merName:"选择供应商"};
  whse:{whseId:"",whseName:"请选择仓库"};
  createStartDate:String = "";//开始时间
  createEndDate:String = "";
  constructor(public navCtrl: NavController, public navParams: NavParams,private datePipe:TydatePipe) {
    let condition = navParams.data.condition;
    if (condition!=null) {
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
      this.stockStatus = condition.stockStatus;
      this.payStatus = condition.payStatus;
      this.orderNo =  condition.orderNo;
      // this.mitem.merchantId = condition.merchantId;
      this.mitem = condition.provider;
      this.whse = condition.whse;
    }
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PoConditionChoosePage');
  }
  providerClicked(){
    console.log("PoConditionChoosePage providerClicked");
    this.navCtrl.push("PoConditionChooseProviderPage",{type:"choose",callback:data=>{
      this.mitem=data;
    }});
  }
  storageClick(){
    console.log("仓库按钮点击");
    this.navCtrl.push("PoConditionChooseStoragePage",{callback:(item)=>{
      this.whse.whseId = item.warehouseId;
      this.whse.whseName = item.warehouseName;
    }});
    
  }
  stookClick(check,status){
    if(check.checked==false){
      check.checked=true;
    }
    this.stockStatus=status;
  }
  payClick(check,status){
    if(check.checked==false){
      check.checked=true;
    }
    this.payStatus=status;
  }
  resetClick(){
    //重置
   this.stockStatus="";
   this.payStatus="";
   this.orderNo="";
   this.mitem.merchantId="";
   this.mitem.merName="选择供应商";
   this.whse = {whseId:"",whseName:"请选择仓库"};
   this.createStartDate = this.datePipe.transform(new Date().setDate(1),"yyyy-MM-dd");
   this.createEndDate=this.datePipe.transform(new Date(),"yyyy-MM-dd");
  }
  comfirm(){
    //确定
    let condition = {stockStatus:this.stockStatus,payStatus:this.payStatus,orderNo:this.orderNo,provider:this.mitem,whse:this.whse,createStartDate:this.createStartDate,createEndDate:this.createEndDate};
    if (this.navParams.data.callback) {
      this.navCtrl.pop();
      this.navParams.data.callback(condition);
    }
  }
}
