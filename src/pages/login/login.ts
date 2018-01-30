import { DbServiceProvider } from './../../providers/db-service/db-service';
import { AppGlobal, AppServiceProvider } from './../../providers/app-service/app-service';
import { TyNetworkServiceProvider } from './../../providers/ty-network-service/ty-network-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController, Events} from 'ionic-angular';
import { Md5 } from 'ts-md5/dist/md5';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  logoUrl:string = "assets/imgs/logo.png";
  username1:String;
  password1:String;
  constructor(
    public events: Events,
    public toastCtrl: ToastController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private net:TyNetworkServiceProvider,
    private db:DbServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.db.getString("username",(msg)=>{
      this.username1 = msg;
      console.log("username:"+msg);
    });
    this.db.getString("password",(msg)=>{
      this.password1 = msg;
      console.log("password:"+msg);
    });
  }
  login(username, password){
    if(this.isInfoLegal(username,password) == true){

      this.net.httpPost(AppGlobal.API.login,{
          "userName":username.value,
          "password":password.value
          // "password":Md5.hashStr(password.value).toString().toLowerCase()
        },msg => {
        let obj = JSON.parse(msg);
        if (obj.ret == AppGlobal.RETURNCODE.succeed) {
          AppServiceProvider.getInstance().userinfo.loginData = obj.data;
          this.db.saveString(username.value,"username");
          this.db.saveString(password.value,"password");
          this.navCtrl.setRoot("HomePage");
          this.events.publish('user:login');
        }else{
          this.toast(obj.desc);
        }
        
      },error => {
        this.toast(error);
      },true);
    }
  }
  keydown(event){
    if(event.keyCode==13){
      //返回确定按钮
      event.target.blur();
      return false;
    }
  }

  isInfoLegal(username,password){
    if(username.value.length==0){
      this.toast("请输入用户名");
      return false;
    }else if(password.value.length==0){
      this.toast("请输入密码");
      return false;
    }
    return true;
  }
//mark 通用toast处理

  toast(info){
    this.toastCtrl.create({
      message:  info,
      duration: 3000,
      position: 'middle',
      showCloseButton:true,
      closeButtonText:"关闭"
    }).present();
  }

  forgetpassword(){
    console.log("忘记密码")
    this.navCtrl.setRoot("ForgetPasswordPage").catch((err: any) => {
      console.log(`Didn't set nav root: ${err}`);
    });
  }

  registBtnCliked(){
    console.log("注册按钮点击");
    this.navCtrl.setRoot("RegistPage").catch((err: any) => {
      console.log(`Didn't set nav root: ${err}`);
    });
  }
}
