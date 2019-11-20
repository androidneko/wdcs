import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AppServiceProvider, AppGlobal } from '../../providers/app-service/app-service';
import { BasePage } from '../base/base';
import { TyNetworkServiceProvider } from '../../providers/ty-network-service/ty-network-service';
import { Events } from '../../../node_modules/ionic-angular/util/events';

/**
 * Generated class for the CirclesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-circles',
  templateUrl: 'circles.html',
})
export class CirclesPage extends BasePage {

  user: any;
  imgArray = [["assets/imgs/splash.jpg"], ["assets/imgs/logo.png", "assets/imgs/splash.jpg", "assets/imgs/logo.png", "assets/imgs/logo.png"]];
  dataArray = [];
  total = -1;
  currentPage: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController,public events: Events,public net:TyNetworkServiceProvider) {
    super(navCtrl, navParams, toastCtrl);
    this.user = AppServiceProvider.getInstance().userinfo.userData;
    this.events.subscribe('userinfo:saved', () => {
      this.user = AppServiceProvider.getInstance().userinfo.userData;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CirclesPage');
    this.sendQueryRequest(1, null);
  }

  ionViewWillUnload() {
    console.log('ionViewWillUnload CirclesPage');
    //避免该页面多次进入后多次监听登出事件，切换登录可能发生该状况
    this.events.unsubscribe('userinfo:saved');
  }

  doRefresh(refresher) {
    //刷新
    console.log("下拉刷新");

    this.sendQueryRequest(1,refresher);
  }
  doInfinite(refresher) {
    console.log("上拉加载更多");
    this.sendQueryRequest(this.currentPage + 1, refresher);
  }
  sendQueryRequest(page: any, refresher: any, isLoading: boolean = true) {
    let params =
    {
      
      "current": page,
      "rowCount": 20,
    };
    this.net.httpPost(AppGlobal.API.circleFriendsQuery, params, msg => {
      let obj = JSON.parse(msg);
      if (obj.ret == AppGlobal.RETURNCODE.succeed) {
        if (page == 1) {
          this.dataArray = [];
        }
        let list = obj.data.rows;
        this.total = parseInt(obj.data.total);
        for (let index = 0; index < list.length; index++) {
          let element = list[index];
          element.isFabuloused = false;
          if (element.circleFriendsFabulousList != null && element.circleFriendsFabulousList.length>0) {
            for (let index = 0; index < element.circleFriendsFabulousList.length; index++) {
              let item = element.circleFriendsFabulousList[index];
              if (item.userId == AppServiceProvider.getInstance().userinfo.loginData.userId) {
                element.isFabuloused = true;
                element.fabulousedIndex = index;
              }
           }
         }
          this.dataArray.push(element);
        }
        this.currentPage = page;

      } else {
        this.total = 0;
        this.toast(obj.desc);
      }
      if (refresher != null) {
        refresher.complete();
      }
    }, error => {
      this.toast(error);
      this.total = 0;
      if (refresher != null) {
        refresher.complete();
      }
    }, isLoading);
  }


}
