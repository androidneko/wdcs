import { BasePage } from './../base/base';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { TyNetworkServiceProvider } from '../../providers/ty-network-service/ty-network-service';
import { AppServiceProvider, AppGlobal } from '../../providers/app-service/app-service';

/**
 * Generated class for the NewStockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-stock',
  templateUrl: 'new-stock.html',
})
export class NewStockPage extends BasePage{

  warehouseId: any = "";
  warehouseName: any = "";
  storage= {
    "createTime": 1512489600000,
    "createUser": "017112213370",
    "isDefault": "1",
    "merchantId": "",
    "pkid": "20",
    "warehouseAddress": "武汉天喻信息",
    "warehouseAdmin": "",
    "warehouseId": "",
    "warehouseName": "",
    "warehouseStatus": "1",
    "warehouseType": "0"
};
  constructor(public tostCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, private net: TyNetworkServiceProvider) {
    super(navCtrl, navParams, tostCtrl);
    if (navParams.data.storage!=null) {
      this.storage = navParams.data.storage;
    }
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
            "storagebinName": this.warehouseName,		//仓库名称
            "storagebinId": this.warehouseId,	//管理员名称
            "warehouseId":""+this.storage.warehouseId
            //  "warehouseId":this.warehouseId,      	//仓库编号
            //  "isDefault":"0",        	//是否默认仓库(0默认1非默认)
            //  "warehouseStatus":"1",  	//仓库状态(0禁用1启用)
            //  "warehouseType":"0",   	//仓库类型；0：仓库   1：门店}
          },
        "ACTION_NAME": "warehouseFacade|addStoragebin"
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
