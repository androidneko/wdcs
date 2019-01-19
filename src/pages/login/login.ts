import { DbServiceProvider } from './../../providers/db-service/db-service';
import { AppGlobal, AppServiceProvider } from './../../providers/app-service/app-service';
import { TyNetworkServiceProvider } from './../../providers/ty-network-service/ty-network-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events } from 'ionic-angular';
// import { Md5 } from 'ts-md5/dist/md5';
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
  logoUrl: string = "assets/imgs/logo.png";
  username: String;
  password: String;

  info: any = {
    userName: "",
    token: "",
    nickName: "ANDROIDNEKO",
    avatar: "assets/imgs/author_logo2.png",
    email: "",
    gender: "秘密",
    height: "175CM",
    weight: "60KG",
    birthday: "1990-01-01"
  };

  constructor(
    public events: Events,
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private net: TyNetworkServiceProvider,
    private db: DbServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.db.getString("username", (msg) => {
      this.username = msg;
      console.log("username:" + msg);
    });
    this.db.getString("password", (msg) => {
      this.password = msg;
      console.log("password:" + msg);
    });
  }

  tryLogin(username, password) {
    if (!this.isInfoLegal(username, password)){
      return;
    }
    this.login(username, password)
    .then( ()=>{
      console.log("then --> loginSuccess");

      this.db.saveString(username, "username");
      this.db.saveString(password, "password");
      this.events.publish('user:login');
      //获取用户信息
      return this.sendUserInfoRequest();
    }, (error) =>{
      console.log("then --> login "+error);

      this.toast(error);
    })
    .then( getUserInfoSuccess => {
      console.log("then -->"+getUserInfoSuccess);
      if (getUserInfoSuccess){
        this.events.publish('userinfo:saved');
        // this.navCtrl.setRoot("HomePage");
        this.navCtrl.setRoot("CirclesPage");
      }      
    },getUserInfoFail => {
      console.log("then -->"+getUserInfoFail);
      if (getUserInfoFail){
        // this.navCtrl.setRoot("HomePage");
        this.navCtrl.setRoot("CirclesPage");
      }
    });
  }

  login(username, password) {
    return new Promise((resolve, reject) => {
      this.net.httpPost(
        AppGlobal.API.login,
        {
          "userName": username,
          "password": password
          // "password":Md5.hashStr(password).toString().toLowerCase()
        },
        msg => {
          let obj = JSON.parse(msg);
          if (obj.ret == AppGlobal.RETURNCODE.succeed) {
            AppServiceProvider.getInstance().userinfo.loginData = obj.data;
            resolve();
          } else {
            reject(obj.desc)
          }
        },
        error => {
          reject(error);
        },
        true);
    });
  }

  sendUserInfoRequest() {
    return new Promise((resolve,reject)=>{
      let params = {
        "userName": AppServiceProvider.getInstance().userinfo.loginData.userName,
        "token": AppServiceProvider.getInstance().userinfo.loginData.token
      };
      this.net.httpPost(AppGlobal.API.getUserInfo, params, msg => {
        console.log(msg);
        let obj = JSON.parse(msg);
        if (obj.ret == AppGlobal.RETURNCODE.succeed) {
          this.info.userName = AppServiceProvider.getInstance().userinfo.loginData.userName;
          this.info.token = AppServiceProvider.getInstance().userinfo.loginData.token;
          this.info.avatar = obj.data.avatar;
          this.info.birthday = obj.data.birthday;
          this.info.email = obj.data.email;
          this.info.gender = obj.data.gender;
          this.info.height = obj.data.height;
          this.info.nickName = obj.data.nickName;
          this.info.weight = obj.data.weight;
          AppServiceProvider.getInstance().userinfo.userData = this.info;
          resolve('getUserInfoSuccess');
        }else {
          reject('getUserInfoFail');
        }
      }, error => {
        reject('getUserInfoFail');
      }, true);
    });
  }

  keydown(event) {
    if (event.keyCode == 13) {
      //返回确定按钮
      event.target.blur();
      return false;
    }
  }

  isInfoLegal(username, password) {
    if (username == 0) {
      this.toast("请输入用户名");
      return false;
    } else if (password == 0) {
      this.toast("请输入密码");
      return false;
    }
    return true;
  }
  //mark 通用toast处理

  toast(info) {
    this.toastCtrl.create({
      message: info,
      duration: 3000,
      position: 'middle',
      showCloseButton: true,
      closeButtonText: "关闭"
    }).present();
  }

  forgetpassword() {
    console.log("忘记密码")
    this.navCtrl.setRoot("ForgetPasswordPage").catch((err: any) => {
      console.log(`Didn't set nav root: ${err}`);
    });
    // this.navCtrl.setRoot("PostDetailPage").catch((err: any) => {
    //   console.log(`Didn't set nav root: ${err}`);
    // });
    
  }

  registBtnCliked() {
    console.log("注册按钮点击");
    this.navCtrl.setRoot("RegistPage").catch((err: any) => {
      console.log(`Didn't set nav root: ${err}`);
    });
  }
}
