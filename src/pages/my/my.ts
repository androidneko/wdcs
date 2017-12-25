import { AppServiceProvider } from './../../providers/app-service/app-service';
import { LoginPage } from './../login/login';
import { MyApp } from './../../app/app.component';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my',
  templateUrl: 'my.html',
})
export class MyPage {
  loginName:String="";
  constructor(public navCtrl: NavController, public navParams: NavParams,private app:MyApp) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPage');
    this.configData();
  }
  configData(){
    this.loginName = AppServiceProvider.getInstance().userinfo.merUser.loginName;
  }
  headerCliked(){
    console.log('header clicked');
  }
  loginOut(){
    console.log('login out');
    this.app.rootPage = LoginPage;
  }
}
