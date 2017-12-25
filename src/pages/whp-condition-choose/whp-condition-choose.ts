import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { TydatePipe } from '../../pipes/tydate/tydate';
import { BasePage } from '../base/base';

/**
 * Generated class for the WhpConditionChoosePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  providers: [TydatePipe],
  selector: 'page-whp-condition-choose',
  templateUrl: 'whp-condition-choose.html',
})
export class WhpConditionChoosePage extends BasePage{
  
    clientUI:any = {name: "选择客户"};
    client:any;//客户
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
      //填充客户选择条件
      this.client = condition.client;
    }
  
    ionViewDidLoad() {
      console.log('ionViewDidLoad WhpConditionChoosePage');
    }
  
    //二次跳转选择条件，例如选择客户或仓库
    //选择客户回调
    clientsClicked(){
      console.log("WhpConditionChoosePage clientsClicked");
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
  
    //充值按钮点击
    resetClick(){
      //重置
     this.clientUI.name = "选择客户";
     this.client=null;
     this.createStartDate = this.datePipe.transform(new Date().setDate(1),"yyyy-MM-dd");
     this.createEndDate=this.datePipe.transform(new Date(),"yyyy-MM-dd");
    }
  
    //确定按钮点击事件
    confirmClick(){
      //确定
      let condition = {client:this.client,createStartDate:this.createStartDate,createEndDate:this.createEndDate};
      if (this.navParams.data.selectionCallback != null) {
        this.navCtrl.pop();
        this.navParams.data.selectionCallback(condition);
      }
    }

}
