import { BasePage } from './../base/base';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { TyNetworkServiceProvider } from '../../providers/ty-network-service/ty-network-service';
import { AppGlobal } from '../../providers/app-service/app-service';

/**
 * Generated class for the ProviderDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-provider-detail',
  templateUrl: 'provider-detail.html',
})
export class ProviderDetailPage extends BasePage {
  // merContactList:Array<any> = [];
  merInfo:any={};
  constructor(public tostCtrl:ToastController,public navCtrl: NavController, public navParams: NavParams,private alertCtrl:AlertController,private net:TyNetworkServiceProvider) {
    super(navCtrl,navParams,tostCtrl);
    this.merInfo = this.navParams.data.merInfo;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProviderDetailPage');
  }
  checkClicked(check,item){
    check.checked = !check.checked;

    // if(check.checked==false){
    //   //
    //   for (let index = 0; index < this.merInfo.merContactList.length; index++) {
    //     const element = this.merInfo.merContactList[index];
    //     if (element.defaultOrNot=="1") {
    //         element.defaultOrNot="0";
    //     }
    //   }

    //   check.checked==true;
    //   item.defaultOrNot="1";


    // }
  }
  delete(){
    console.log("删除");
    let alert = this.alertCtrl.create({
      title: '确定要删除该供应商信息？',
      message: "",
      buttons: [
        {
          text: '否',
          handler: () => {
            console.log('Cancel clicked');
            
          }
        },
        {
          text: '是',
          handler: () => {
            console.log('Saved clicked');
            this.deletenet();
           
          }
        }
      ]
    });

    alert.present();
  }
  change(){
    console.log("修改");
    var  merinfo = JSON.parse(JSON.stringify(this.merInfo));
    this.navCtrl.push("ChangeProviderInfoPage",{merInfo:merinfo,callback:data=>{
      if (data=="refresh") {
        if (this.navParams.data.callback!=null) {
          this.navParams.data.callback("refresh");
        }
      }
    }});
  }
  deletenet(){
    let params =
    {
      "merCustomPkId":this.merInfo.merCustomerPkId,
      "merchantId":this.merInfo.streamType=="1"?this.merInfo.merchantId:"",
      "ACTION_NAME":"merMangementService|deleteStreamP"
    };
    this.net.httpPost(AppGlobal.API.test,params,msg => {
      let obj = JSON.parse(msg);
      if (obj.ACTION_RETURN_CODE==AppGlobal.RETURNCODE.succeed) {
        if (this.navParams.data.callback!=null) {
          this.navParams.data.callback("refresh");
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
