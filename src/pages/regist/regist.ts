import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { BasePage } from '../base/base';
import { DbServiceProvider } from './../../providers/db-service/db-service';
import { AppGlobal} from './../../providers/app-service/app-service';
import { TyNetworkServiceProvider } from './../../providers/ty-network-service/ty-network-service';
import { Md5 } from 'ts-md5/dist/md5';
/**
 * Generated class for the RegistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-regist',
  templateUrl: 'regist.html',
})

export class RegistPage extends BasePage{
  logoUrl:string = "assets/imgs/test.png";
  phoneNum: string = "";
  smsCode: string = "";
  password: string = "";
  confirmPassword: string = "";
  valcodebtntext: string = "发送验证码";

  isCountingDown: boolean = false;
  timeCount: number = 60;
  intervalid: any;

  constructor(
    public toastCtrl: ToastController, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private net: TyNetworkServiceProvider, 
    private db: DbServiceProvider) {
    super(navCtrl, navParams, toastCtrl);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistPage');
  }
  
  geSmsCodeClicked(phoneNum:string):void{
    if (this.isCountingDown){
      return;
    }
    console.log("获取验证码");
    if(!(/^1[34578]\d{9}$/.test(phoneNum))){
      this.toast("请输入正确的手机号");
      return ;
    }
    this.geSmsCode(phoneNum);
  }

  geSmsCode(phoneNum:string){
    this.net.httpPost(AppGlobal.API.smsCode,{
      "userName":phoneNum
    },msg => {
      let obj = JSON.parse(msg);
      console.log("cellPhone:"+obj.toString());
      if (obj.ret == AppGlobal.RETURNCODE.succeed) {
        this.countingDown();
        this.toast(obj.desc);
      }else{
        this.toast(obj.desc);
        this.stopCounting();
      }
    },error => {
      this.toast(error);
      this.stopCounting();
    },true);
  }

  countingDown() {
    this.isCountingDown = true;
    this.intervalid = setInterval(() => {
      this.timeCount--;
      if (this.timeCount == 0) {
        this.stopCounting();
      } else
        this.valcodebtntext = "再次发送(" + this.timeCount + ")";
    }, 1000);
  }

  stopCounting() {
    if (this.intervalid != null) {
      console.log("timer is clear");
      this.isCountingDown = false;
      this.timeCount = 60;
      this.valcodebtntext = "发送验证码";
      clearInterval(this.intervalid);
      this.intervalid = null;
    }
  }

  checkIfInputOk(phoneNum, verifyCode, newPassword, confirmPassword) {
    if (!(/^1[34578]\d{9}$/.test(phoneNum))) {
      this.toast("请输入正确的手机号");
      return false;
    }
    if (verifyCode.length != 6) {
      this.toast("验证码输入有误，请输入6位数字验证码");
      return false;
    }
    if (newPassword.length < 6 || newPassword.length > 20) {
      this.toast("密码长度只能是6-20位");
      return false;
    }

    if (confirmPassword != newPassword) {
      this.toast("两次密码输入不一致");
      return false;
    }
    return true;
  }

  register(phone: string, verifyCode: string, password: string, confirmPassword: string) {
    if (this.checkIfInputOk(phone, verifyCode, password, confirmPassword)) {
      this.net.httpPost(AppGlobal.API.test,
        {
          "userName": phone,
          "vcode": verifyCode,
          "password": password
          // "password": Md5.hashStr(password).toString().toLowerCase()
        }, msg => {
          let obj = JSON.parse(msg);
          if (obj.ret == AppGlobal.RETURNCODE.succeed) {
            this.db.saveString(this.password, "password");
            this.toast(obj.desc);
            this.navCtrl.pop();
          } else {
            this.toast(obj.desc);
          }

        }, error => {
          this.toast(error);
        }, true);
    }
  }

  loginBtnCliked(){
    console.log("登录按钮点击");
    this.navCtrl.setRoot("LoginPage").catch((err: any) => {
      console.log(`Didn't set nav root: ${err}`);
    });
  }
}
