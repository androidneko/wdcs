import { TyNetworkServiceProvider } from './../../providers/ty-network-service/ty-network-service';
import { BasePage } from './../base/base';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppGlobal } from '../../providers/app-service/app-service';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

/**
 * Generated class for the ChangeProviderInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-provider-info',
  templateUrl: 'change-provider-info.html',
})
export class ChangeProviderInfoPage extends BasePage{
  merInfo:any={};
  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl:ToastController,private net:TyNetworkServiceProvider) {
    super(navCtrl,navParams,toastCtrl);
    this.merInfo = this.navParams.data.merInfo;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangeProviderInfoPage');
  }
  saveBtnCliked(){
    //PoConditionChooseProviderPage
    this.sendRequest();
  }
  deleteItem(item,idx){
    this.merInfo.merContactList.splice(idx,1);
    let info = this.merInfo.merContactList[0];
    if (info!=null) {
      for (let index = 0; index < this.merInfo.merContactList.length; index++) {
        const element = this.merInfo.merContactList[index];
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
       if (this.merInfo.merContactList.length==0) {
         data.defaultOrNot="1";
         this.merInfo.merContactList.push(data)
       }else{
         this.merInfo.merContactList.push(data);
       }
    }});
  }
  checkClicked(check,item){
    check.checked = !check.checked;

    if(check.checked==false){
      //
      for (let index = 0; index < this.merInfo.merContactList.length; index++) {
        const element = this.merInfo.merContactList[index];
        if (element.defaultOrNot=="1") {
            element.defaultOrNot="0";
        }
      }

      check.checked==true;
      item.defaultOrNot="1";


    }
  }
  sendRequest(){
   
    let params = 
    {
        "merContactList": this.merInfo.merContactList,
        "merCustomPkId":this.merInfo.merCustomerPkId,
        "merName":this.merInfo.merName,
        "streamNo":this.merInfo.streamNo,
        "type":"0",
        "ACTION_NAME":"merMangementService|updateStreamDetailsP"
    };
    this.net.httpPost(AppGlobal.API.test,params,msg => {
      let obj = JSON.parse(msg);
      if (obj.ACTION_RETURN_CODE==AppGlobal.RETURNCODE.succeed||obj.ACTION_RETURN_CODE==null) {
        if (this.navParams.data.callback!=null) {
          this.navParams.data.callback("refresh");
        }
        this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length()-3));

      }else{
        this.toast(obj.ACTION_RETURN_MESSAGE);
      }
      
    },error => {
      this.toast(error);
    },true);

  }
}
