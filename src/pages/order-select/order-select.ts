import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { TydatePipe } from '../../pipes/tydate/tydate';
import { Events } from 'ionic-angular/util/events';

/**
 * Generated class for the OrderSelectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
// const formatDate = ( time: any ) => {
//   // 格式化日期，获取今天的日期
//   const Dates = new Date( time );
//   const year: number = Dates.getFullYear();
//   const month: any = ( Dates.getMonth() + 1 ) < 10 ? '0' + ( Dates.getMonth() + 1 ) : ( Dates.getMonth() + 1 );
//   const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
//   return year + '-' + month + '-' + day;
// };
@IonicPage()
@Component({
  providers:[TydatePipe],
  selector: 'page-order-select',
  templateUrl: 'order-select.html',
})
export class OrderSelectPage {

  stockStatus:any="02";//00未入库 01已入库 02不限
  payStatus:any="02";//00未付款 01已付款 02 不限
  orderNo:String = "";//订单编号

  createStartDate:String = "";//开始时间
  createEndDate:String = "";
  citem={customerId:"",customerName:"选择客户"}

  storage:any={
    storageName:"选择仓库",
    storageId:""
  };//仓库
  client:any;//客户
  obj:any;
  checkBoxArray:Array<any>=[
    {
      text:"不限",
      value:"",
      checked:true
    },
    {
      text:"已入库",
      value:"01",
      checked:false
    },
    {
      text:"未出库",
      value:"00",
      checked:false
    }
  ];
  checkBoxArray1:Array<any>=[
    {
      text:"不限",
      value:"",
      checked:true
    },
    {
      text:"已付款",
      value:"01",
      checked:false
    },
    {
      text:"未付款",
      value:"00",
      checked:false
    }
  ];

  constructor(private alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams,private datePipe:TydatePipe,public events:Events) {
    let condition = navParams.data.condition;
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
    this.citem.customerId = condition.merchantId;
    this.citem.customerName = condition.merchantName;

    this.checkBoxArray.forEach(element => {
      if(element.value== this.stockStatus)
      {
        element.checked=true;
      }else{
        element.checked=false;
      }
    });

    this.checkBoxArray1.forEach(element => {
      if(element.value== this.payStatus)
      {
        element.checked=true;
      }else{
        element.checked=false;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderSelectPage');
  }
  chooseCustomer()
  {
    console.log("选择客户");
    //this.navCtrl.push("SelectCustomerPage")
    this.navCtrl.push("MyClientsPage",{tag:"choose",callback:client=>{
      if (typeof(client) != 'undefined'){
        this.client = client;
        this.citem.customerName = client.name;
        
        this.citem.customerName = client.merName;
        this.citem.customerId = client.streamNo;
        console.log("收到回传数据:"+this.client.name);
        //todo
      }else {
        console.log("回传数据出错");
      }
    }});
  }

  chooseWarehouse()
  {
    
    console.log("选择仓库");
    this.navCtrl.push("PoConditionChooseStoragePage",{callback:(item)=>{
      this.storage.storageId = item.warehouseId;
      this.storage.storageName = item.warehouseName;
    }});
  }

  goBack()
  {
    var callback = this.navParams.get("callBack");
    callback().then(()=>{
      this.navCtrl.pop();
    })
  }

  stookClick(item)
  {
    this.stockStatus=item.value;
  }

  // stookClick(check,status){
  //   if(check.checked==false){
  //     check.checked=true;
  //   }
  //   this.stockStatus=status;
  // }
  // payClick(check,status){
  //   if(check.checked==false){
  //     check.checked=true;
  //   }
  //   this.payStatus=status;
  // }

  payClick(item){
    this.payStatus=item.value;
  }

  resetClick(){

    let alert = this.alertCtrl.create({
      message: '确定重置？',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass:"alertDialogClass_balck",
          handler: () => {
            console.log('Cancel clicked');

          }
        },
        {
          text: '确定',
          cssClass:"alertDialogClass_normal",
          handler: () => {
            console.log('Buy clicked');
            this.resetData();
          }
        }
      ]
    });
    alert.present();

  
  }

  resetData()
  {
  //重置
  this.stockStatus="";
  this.payStatus="";
  this.orderNo="";
  this.citem.customerId="";
  this.citem.customerName="选择客户";

  this.storage.storageId = "";
  this.storage.storageName = "选择仓库";

  this.createStartDate = this.datePipe.transform(new Date().setDate(1),"yyyy-MM-dd");
  this.createEndDate=this.datePipe.transform(new Date(),"yyyy-MM-dd");

  this.checkBoxArray=[
    {
      text:"不限",
      value:"",
      checked:true
    },
    {
      text:"已入库",
      value:"01",
      checked:false
    },
    {
      text:"未出库",
      value:"00",
      checked:false
    }
  ];
  this.checkBoxArray1=[
    {
      text:"不限",
      value:"",
      checked:true
    },
    {
      text:"已付款",
      value:"01",
      checked:false
    },
    {
      text:"未付款",
      value:"00",
      checked:false
    }
  ];
  }

  comfirm()
  {
    //确定
    if(this.storage.storageId=="")
    {
      this.storage.storageName="";
    }
    let condition = {warehouseName:this.storage.storageName,stockStatus:this.stockStatus,payStatus:this.payStatus,orderNo:this.orderNo,merchantId:this.citem.customerId,merchantName:this.citem.customerName,createStartDate:this.createStartDate,createEndDate:this.createEndDate};
    if (this.navParams.data.callback) {
      this.navCtrl.pop();
      this.navParams.data.callback(condition);
    }
  }
}
