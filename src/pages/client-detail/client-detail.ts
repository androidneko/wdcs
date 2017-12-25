import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AppGlobal } from '../../providers/app-service/app-service';
import { BasePage } from '../base/base';
import { TyNetworkServiceProvider } from '../../providers/ty-network-service/ty-network-service';

/**
 * Generated class for the ClientDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-client-detail',
  templateUrl: 'client-detail.html',
})
export class ClientDetailPage extends BasePage {

  merInfo:any={};

  constructor(
    public tostCtrl:ToastController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private alertCtrl:AlertController,
    private net:TyNetworkServiceProvider) {
    super(navCtrl,navParams,tostCtrl);
    this.merInfo = this.navParams.data.merInfo;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientDetailPage');
  }

  checkClicked(check,item){
    check.checked = !check.checked;
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
    this.navCtrl.push("ClientInfoEditPage",{merInfo:merinfo,callback:data=>{
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
