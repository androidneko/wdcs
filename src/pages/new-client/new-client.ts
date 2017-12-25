import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BasePage } from '../base/base';
import { TyNetworkServiceProvider } from '../../providers/ty-network-service/ty-network-service';
import { AppGlobal, AppServiceProvider } from '../../providers/app-service/app-service';

/**
 * Generated class for the NewClientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-client',
  templateUrl: 'new-client.html',
})
export class NewClientPage extends BasePage{
  remark: String = "";
  myMerchantId:String="";
  merInfoDummy={merName:"",streamNo:""};
  merContactList:Array<any>=[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private net:TyNetworkServiceProvider,
    public toastCtrl:ToastController) {
    super(navCtrl,navParams,toastCtrl);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewClientPage');
  }

  saveBtnCliked(){
    console.log("保存");
    if (this.merInfoDummy.merName.length==0) {
      this.toast("请输入名称");
      return;
    }
    this.sendRequest();
  }

  checkClicked(check,item){
    check.checked = !check.checked;
    if(check.checked==false){
      //
      for (let index = 0; index < this.merContactList.length; index++) {
        const element = this.merContactList[index];
        if (element.defaultOrNot=="1") {
            element.defaultOrNot="0";
        }
      }
      check.checked==true;
      item.defaultOrNot="1";
    }
  }
  deleteItem(item,idx){
    this.merContactList.splice(idx,1);
    let info = this.merContactList[0];
    if (info!=null) {
      for (let index = 0; index < this.merContactList.length; index++) {
        const element = this.merContactList[index];
        if (element.defaultOrNot=="1") {
            return;
        }
      }
      info.defaultOrNot="1";
    }
  }
  addContact(){
    //添加联系人
    console.log("添加联系人");
    this.navCtrl.push("NewContactPage",{callback:data=>{
       if (this.merContactList.length==0) {
         data.defaultOrNot="1";
         this.merContactList.push(data)
       }else{
         this.merContactList.push(data);
       }
    }});
  }
  //网络
  sendRequest(){
    this.merInfoDummy.streamNo = this.myMerchantId+"";
    let params = 
    {
        "merContactList": this.merContactList,
        "merInfoDummy":this.merInfoDummy,
        "myMerchantId":AppServiceProvider.getInstance().userinfo.MERCHANT_ID,
        "streamNo":this.myMerchantId,
        "type":"1", //1是客户，0是供应商
        "remark":this.remark,
        "ACTION_NAME":"merMangementService|createStreamP"
    };
    this.net.httpPost(AppGlobal.API.test,params,msg => {
      let obj = JSON.parse(msg);
      if (obj.ACTION_RETURN_CODE==AppGlobal.RETURNCODE.succeed||obj.ACTION_RETURN_CODE==null) {
        this.toast("创建客户成功");
        if (this.navParams.data.callback!=null) {
          this.navParams.data.callback();
        }
        this.navCtrl.pop();

      }else{
        this.toast(obj.ACTION_RETURN_MESSAGE);
      }
      
    },error => {
      this.toast(error);
    },true);

  }
}
