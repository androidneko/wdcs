import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { BasePage } from '../base/base';
import { TyNetworkServiceProvider } from '../../providers/ty-network-service/ty-network-service';
import { AppGlobal, AppServiceProvider } from '../../providers/app-service/app-service';


/**
 * Generated class for the AddReceiptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-receipt',
  templateUrl: 'add-receipt.html',
})
export class AddReceiptPage extends BasePage {

  receiptsTotal: number = null; //收款合计
  writeOffTotal: number = 0.00;//核销合计
  preTotal: number = 0.00;//预收

  payerObj: any;
  userName: String = "请选择客户"
  settlementObj: any;
  settlementName: String = "请选择";
  settlementMode: any = {
    Name:"请选择结算方式",
    value:""
  };
  modeArrayObj: Array<any> = [{ name: "预付",value:"1", isCheck: false }, { name: "现结",value:"2", isCheck: false }, { name: "月结",value:"3", isCheck: false }, { name: "先款后货",value:"4", isCheck: false }, { name: "运输商代收",value:"5", isCheck: false }, { name: "其他",value:"6", isCheck: false }]

  purposeString: String = "请选择"
  purposeArrayObj: Array<any> = [
    { name: "贷款",value:"1", isCheck: false }, 
    { name: "运费",value:"2", isCheck: false }, 
    { name: "退款",value:"3", isCheck: false },
    { name: "其他", value:"4",isCheck: false },
    { name: "新增款项用途", value:"5",isCheck: false }
    ]

  payTypeString: String = "请选择";
  payTypeArrayObj: Array<any> = [
    { name: "现金", value:"1",isCheck: false },
    { name: "银行转账",value:"2", isCheck: false },
    { name: "移动收款",value:"3", isCheck: false },
    { name: "支付宝",value:"4", isCheck: false },
    { name: "微信", value:"5",isCheck: false },
    { name: "其他",value:"6", isCheck: false }
    ]


  finActualDetailBills:Array<any>=[];
  finActualDetailBillsItem:any={
    useFor:"",
    accNo:"",
    inBalance:0,
    payTpye:"",
    payerAccNo:"",
    payerAccName:"",
    mark:""
  }
  dealingsMerchantId:string="";
  finActualVeracityWriteOffs:Array<any>=[];

  constructor(public toastCtrl: ToastController, private net: TyNetworkServiceProvider, public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    super(navCtrl, navParams, toastCtrl);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddReceiptPage');
  }
  payerClicked() {
    //付款人
    // this.navCtrl.push("OrderPayerPage",{callback:(object:any)=>{
    //   this.payerObj = object;
    //   this.userName = this.payerObj.name;
    // }})
    this.navCtrl.push("MyClientsPage", {
      tag: "choose", callback: client => {
        if (typeof (client) != 'undefined') {
          this.userName = client.merName;

          this.dealingsMerchantId =client.merchantId
          console.log("收到回传数据:" + this.userName);
          //todo
        } else {
          console.log("回传数据出错");
        }
      }
    });
  }

  popMode() {
    //结算方式
    let profileModal = this.modalCtrl.create("ActionSheetPage", {
      dataObj: this.modeArrayObj, callback: (item: any) => {
        this.settlementMode.Name = item.name;
        this.settlementMode.value = item.value;
      }
    });
    profileModal.present();
  }

  popPurpose() {
    //款项用途
    let profileModal = this.modalCtrl.create("ActionSheetPage", {
      dataObj: this.purposeArrayObj, callback: (item: any) => {
        this.purposeString = item.name;
        this.finActualDetailBillsItem.useFor = item.value;
      }
    });
    profileModal.present();
  }

  popPayType() {
    //支付方式
    let profileModal = this.modalCtrl.create("ActionSheetPage", {
      dataObj: this.payTypeArrayObj, callback: (item: any) => {
        this.payTypeString = item.name;
        this.finActualDetailBillsItem.payTpye=item.value;
      }
    });
    profileModal.present();
  }

  settlementClick() {
    //结算账户
    this.navCtrl.push("SettlementAccountPage", {
      callback: (object: any) => {
        this.settlementObj = object;
        this.settlementName = this.settlementObj.accName;
        this.finActualDetailBillsItem.accNo = object.accNo;
      }
    })
  }
  save() { 
    console.log("保存");
    if( this.dealingsMerchantId=="")
    {
      this.toast("请选择付款人");
      return;
    }
    if(this.settlementMode.value=="")
    {
      this.toast("请选择结算方式");
      return;
    }
    if(this.finActualDetailBillsItem.useFor=="")
    {
      this.toast("请选择款项用途");
      return;
    }
    if(this.finActualDetailBillsItem.accNo=="")
    {
      this.toast("请选择账户");
      return;
    }
    if(this.finActualDetailBillsItem.payTpye=="")
    {
      this.toast("请选择支付方式");
      return;
    }
    if(this.receiptsTotal<=0)
    {
      this.toast("请输入金额");
      return;
    }else
    {
      this.finActualDetailBillsItem.inBalance = this.receiptsTotal;
    }
    this.finActualDetailBills.push(this.finActualDetailBillsItem)
    this.sendRequest();
  }
  comfirm() {
    //核算
    // if(this.dealingsMerchantId=="")
    // {
    //   this.toast("请先选择付款人");
    //   return;
    // }
    if(this.receiptsTotal<=0)
    {
      this.toast("请输入金额");
      return;
    }
    this.navCtrl.push("OrderWriteOffPage",{amount:this.receiptsTotal,dealingsMerchantId:this.dealingsMerchantId,callback:(msg)=>{
        this.finActualVeracityWriteOffs = msg;
    }});
  }


  keyUp(event) {

    if(event.value==null||event.value=="")
    {
      return;
    }
    var num:string =this.parseNum(event.value);
    event.value =num;
  }

  parseNum(num:string):string{
 
    var reg = /(^[1-9]([0-9]+)?(\.[0-9]{0,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([1-9])?$)/;
    var reg0 =/^[1-9]\d*\.\d{0,2}$|0\.\d{0,2}$/;
    if(reg0.test(num))
    {
      return num;
    }
    if(!reg.test(num))
    {
      console.log(""+num);
      if(num.length>1)
      {
       let num1 = num.substring(0, num.length - 1);
       return this.parseNum(num1);
      }else
      {
        return "";
      }
    }else{
      return num;
    }
    
  }


  //
  sendRequest(){
    let params = 
    {
        "dataInfo":{
          "finActualBill":{
            "initiatorMerchantId":AppServiceProvider.getInstance().userinfo.MERCHANT_ID,
            "dealingsMerchantId": this.dealingsMerchantId,
            "direction":"1",
            "settlementMode":this.settlementMode.value,
            "way":"2",
            "mark":""
          },
          "finActualDetailBills":this.finActualDetailBills,
          "finActualVeracityWriteOffs":this.finActualVeracityWriteOffs
        },

        // "buyerMerchantId": AppServiceProvider.getInstance().userinfo.MERCHANT_ID,
        // "sellerMerchantId":this.condition.customerItem.customerId,
        // "orderClass":"00",
        // "totalAmt": this.toDecimal2(totalAmt),
        // "payAmt": this.toDecimal2(totalAmt),
        // "whseId": this.condition.whse.whseId,
        // "whseName": whseName,
        // "createDate":this.condition.createDate,
        // "buyerId": AppServiceProvider.getInstance().userinfo.USERID,
        // "remark":this.condition.remark,
         "ACTION_NAME":"finActualBillService|insertFinAct",
    };
    this.net.httpPost(AppGlobal.API.test,params,msg => {
      let obj = JSON.parse(msg);
      if (obj.ACTION_RETURN_CODE==AppGlobal.RETURNCODE.succeed||obj.ACTION_RETURN_CODE==null) {
        this.finActualDetailBills=[];
        this.toast(obj.ACTION_RETURN_MESSAGE);
        this.navCtrl.pop();
      }else{
        this.finActualDetailBills=[];
        this.toast(obj.ACTION_RETURN_MESSAGE);
      }
    },error => {
      this.finActualDetailBills=[];
      this.toast(error);
    },true);
  }

}
