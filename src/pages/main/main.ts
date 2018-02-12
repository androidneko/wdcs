import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AppServiceProvider, AppGlobal } from '../../providers/app-service/app-service';
import { DeviceIntefaceServiceProvider } from '../../providers/device-inteface-service/device-inteface-service';
import { TyNetworkServiceProvider } from '../../providers/ty-network-service/ty-network-service';
import { BasePage } from '../base/base';

/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage extends BasePage{

  totalPraises : number = -1;
  totalComments: number = -1;
  currentPage: number = 0;
  pageSize: number = 25;

  plant:any = {};
  comments:any = [];
  praises:any = [];

  constructor(
    public device:DeviceIntefaceServiceProvider,
    public mtoast: ToastController, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private net: TyNetworkServiceProvider) {
    super(navCtrl, navParams, mtoast);
    if (this.navParams.data.data != null) {
      this.plant = this.navParams.data.data;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

  sendQueryCommentsRequest(page: any, refresher: any) {
    let params =
      {
        "userName":AppServiceProvider.getInstance().userinfo.loginData.userName,
        "start": page==0?0:this.comments.length,
        "rowCount": this.pageSize,
      };
    this.net.httpPost(AppGlobal.API.comments, params, msg => {
      let obj = JSON.parse(msg);
      if (obj.ret == AppGlobal.RETURNCODE.succeed) {
        if (page == 0) {
          this.comments = [];
        }
        let list = obj.data;
        this.totalComments = obj.recordsTotal;
        for (let index = 0; index < list.length; index++) {
          let element = list[index];
          this.comments.push(element);
        }
        this.currentPage = page;
        if (refresher != null) {
          refresher.complete();
        }
      } else {
        this.toast(obj.ACTION_RETURN_MESSAGE);
      }

    }, error => {
      this.toast(error);
      if (refresher != null) {
        refresher.complete();
      }
    }, refresher == null);
  }

  sendQueryPraisesRequest(page: any, refresher: any) {
    let params =
      {
        "userName":AppServiceProvider.getInstance().userinfo.loginData.userName,
        "start": page==0?0:this.praises.length,
        "rowCount": this.pageSize,
      };
    this.net.httpPost(AppGlobal.API.praises, params, msg => {
      let obj = JSON.parse(msg);
      if (obj.ret == AppGlobal.RETURNCODE.succeed) {
        if (page == 0) {
          this.praises = [];
        }
        let list = obj.data;
        this.totalPraises = obj.recordsTotal;
        for (let index = 0; index < list.length; index++) {
          let element = list[index];
          this.praises.push(element);
        }
        this.currentPage = page;
        if (refresher != null) {
          refresher.complete();
        }
      } else {
        this.toast(obj.ACTION_RETURN_MESSAGE);
      }

    }, error => {
      this.toast(error);
      if (refresher != null) {
        refresher.complete();
      }
    }, refresher == null);
  }
}
