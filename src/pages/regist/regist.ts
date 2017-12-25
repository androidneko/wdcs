
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { BasePage } from '../base/base';
import { DbServiceProvider } from './../../providers/db-service/db-service';
import { AppGlobal} from './../../providers/app-service/app-service';
import { TyNetworkServiceProvider } from './../../providers/ty-network-service/ty-network-service';
/**
 * Generated class for the RegistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
class MerInfo  {
 public phone: string;
 getPhone():String
 {
   return this.phone;
 }
 setPhone(phone1:string)
 {
  this.phone = phone1;
 }
 public loginName: string;
 getloginName():String
 {
   return this.loginName;
 }
 setloginName(loginName1:string)
 {
  this.loginName = loginName1;
 }

 public validPkid: string;        
 getvalidPkid():String
 {
   return this.validPkid;
 }
 setvalidPkid(validPkid:string)
 {
  this.validPkid = validPkid;
 }
 public validCode: string;
 getvalidCode():String
 {
   return this.validCode;
 }
 setvalidCode(validCode:string)
 {
  this.validCode = validCode;
 }

 public password: string;
 getpassword():String
 {
   return this.password;
 }
 setpassword(password:string)
 {
  this.password = password;
 }
  constructor() {
    
  }
}
@IonicPage()
@Component({
  selector: 'page-regist',
  templateUrl: 'regist.html',
})



export class RegistPage extends BasePage{


  

  merInfo: MerInfo= new MerInfo();
  username1:String="";
  valcode1:String="";
  password1:String="";
  valcodebtntext:String="获取验证码";//验证码按钮文字
  timeCount:any;
  intervalid:any;
  isChecked:boolean=true;
  // private net:TyNetworkServiceProvider;
  // private db:DbServiceProvider;
  // private app:MyApp
  // constructor(public toastCtrl:ToastController,public navCtrl: NavController, public navParams: NavParams) {
  //   super(navCtrl,navParams,toastCtrl);
  // }
  constructor(public toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams,public net:TyNetworkServiceProvider,public db:DbServiceProvider) {
    super(navCtrl,navParams,toastCtrl);
  }
  



  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistPage');
  }
  getCodeClicked($event){
    console.log("获取验证码");
    if(!(/^1[34578]\d{9}$/.test(this.username1.toString()))){
      this.toast("请输入正确的手机号");
      return ;
    }
    if(this.intervalid==null){
      this.getCode(this.username1);
    }
    this.timming();
   
  }
  ionViewWillUnload(){
    this.cleartime();
  }
  timming(){
    if(this.intervalid!=null){
      return;
    }
    this.timeCount=59;
    this.valcodebtntext = "再次发送("+this.timeCount+")";
    this.intervalid = setInterval(()=>{
      this.timeCount--;
      if(this.timeCount==0){
        this.cleartime();
      }else
      this.valcodebtntext = "再次发送("+this.timeCount+")";
    },1000);
  }

  cleartime(){
    if(this.intervalid!=null){
      console.log("timer is clear");
      this.valcodebtntext = "获取验证码";
      clearInterval(this.intervalid);
      this.intervalid=null;
    }
  }
  
  comfirm(username, valcode,password){
      if(!this.isChecked)
      {
        this.toast("请先同意用户协议");
        return;
      }
      if(this.username1.toString().length!=11 )
      {
        this.toast("手机号码长度不对");
        return
      }

      if( this.valcode1.toString().length!=6)
      {
        this.toast("验证码长度不对");
        return
      }
      
      if(password.value.toString() ==null||password.value.toString().length==0)
      {
        this.toast("密码不能为空");
        return;
      }

      if(password.value.toString().length<6)
      {
        this.toast("密码长度不对");
        return;
      }

      var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
      if(!reg.test(password.value.toString()))
      {
        this.toast("密码必须包含数字字母");
        return;
      }

      console.log("username:"+username.value+" "+"valcode:"+valcode.value);
      //var params:string= this.newMethod(username, valcode,password);
      let params = {
        "merInfo":{
          "loginName":username.value.toString(),
          "phone":username.value.toString(),
          "validCode":valcode.value.toString(),
          "password":password.value,//Md5.hashStr(password.value).toString().toLowerCase()
        },
        "ACTION_NAME":"merMangementService|createMerP"
      }

      this.net.httpPost(AppGlobal.API.test,params,msg => {
        let obj = JSON.parse(msg);
        if (obj.ACTION_RETURN_CODE==AppGlobal.RETURNCODE.succeed) {
          // AppServiceProvider.getInstance().userinfo = obj.ACTION_INFO;
          // this.db.saveString(username.value,"username");
          // this.db.saveString(password.value,"password");
          //this.navCtrl.setRoot("TabsPage");
          this.toast(obj.ACTION_RETURN_MESSAGE);
          this.navCtrl.pop();
        }else{
          this.toast(obj.ACTION_RETURN_MESSAGE);
        }
        
      },error => {
        this.toast(error);
      },true);
    }
  // private newMethod(username: any, valcode: any,password:any) :string{
  //   this.merInfo.setPhone(username.value.toString());
  //   this.merInfo.setvalidCode(valcode.value.toString());
  //   this.merInfo.setpassword(Md5.hashStr(password.value).toString().toLowerCase());
  //   var params: string = JSON.stringify(this.merInfo);
  //   console.log("params:" + params);
  //   return params;
  // }

  legalCliked(){
    console.log("用户协议按钮点击");
    this.navCtrl.push("BuildingPage");
  }
  login()
  {
    console.log("返回登陆界面");
    this.navCtrl.pop();
    //this.navCtrl.push("LoginPage");
  }

  getCode(phoneNo)
  {
    console.log("cellPhone:"+phoneNo);
    this.net.httpPost(AppGlobal.API.test,{"ACTION_NAME":"smsMsgApi|sendSMS","cellPhone":phoneNo},msg => {
      let obj = JSON.parse(msg);
      console.log("cellPhone:"+obj.toString());
      if (obj.ACTION_RETURN_CODE==AppGlobal.API.ACTION_RETURN_CODE) {
        this.toast(obj.ACTION_RETURN_MESSAGE);
      }else{
        this.toast(obj.ACTION_RETURN_MESSAGE);
      }
    },error => {
      this.toast(error);
    },true);
  }
}
