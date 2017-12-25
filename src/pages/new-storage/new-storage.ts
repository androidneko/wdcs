import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TyNetworkServiceProvider } from '../../providers/ty-network-service/ty-network-service';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { BasePage } from '../base/base';
import { AppGlobal, AppServiceProvider } from '../../providers/app-service/app-service';

/**
 * Generated class for the NewStoragePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-storage',
  templateUrl: 'new-storage.html',
})
export class NewStoragePage extends BasePage {
  warehouseId: any = "";
  warehouseName: any = "";
  constructor(public tostCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, private net: TyNetworkServiceProvider) {
    super(navCtrl, navParams, tostCtrl);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewStoragePage');
  }
  saveBtnCliked() {
    console.log("保存");
    if (this.warehouseName.length==0) {
      this.toast("请输入仓库名称");
      return;
    }
    this.sendRequest();
  }
  keydown(event) {
    if (event.keyCode == 13) {
      //返回确定按钮
      event.target.blur();
      return false;
    }
  
  }
  sendRequest() {
    let params =
      {
        "dataInfo":
          {
            "createUser": AppServiceProvider.getInstance().userinfo.USERID,		//创建人
            "merchantId": AppServiceProvider.getInstance().userinfo.MERCHANT_ID,		//商户ID
            "warehouseAddress": "",	//仓库地址
            "warehouseName": this.warehouseName,		//仓库名称
            "warehouseAdmin": "",	//管理员名称
            "warehouseId":""+this.warehouseId
            //  "warehouseId":this.warehouseId,      	//仓库编号
            //  "isDefault":"0",        	//是否默认仓库(0默认1非默认)
            //  "warehouseStatus":"1",  	//仓库状态(0禁用1启用)
            //  "warehouseType":"0",   	//仓库类型；0：仓库   1：门店}
          },
        "ACTION_NAME": "warehouseFacade|addWarehouse"
      }
    this.net.httpPost(AppGlobal.API.test, params, msg => {
      let obj = JSON.parse(msg);
      if (obj.ACTION_RETURN_CODE == AppGlobal.RETURNCODE.succeed) {
        if (this.navParams.data.callback != null) {
          this.navParams.data.callback("refresh");
        }
        this.navCtrl.pop();

      } else {
        this.toast(obj.ACTION_RETURN_MESSAGE);
      }

    }, error => {
      this.toast(error);
    }, true);

  }
}
