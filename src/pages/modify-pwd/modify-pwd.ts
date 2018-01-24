import { BasePage } from './../base/base';
import { DbServiceProvider } from './../../providers/db-service/db-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { TyNetworkServiceProvider } from '../../providers/ty-network-service/ty-network-service';
import { Md5 } from 'ts-md5/dist/md5';
import { AppGlobal, AppServiceProvider } from '../../providers/app-service/app-service';



/**
 * Generated class for the ModifyPwdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modify-pwd',
  templateUrl: 'modify-pwd.html',
})
export class ModifyPwdPage extends BasePage {
  oldPassword:string = "";
  newPassword:string = "";
  confirmPassword:string = "";

  constructor(public toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams,private net:TyNetworkServiceProvider,private db:DbServiceProvider) {
    super(navCtrl,navParams,toastCtrl);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifyPwdPage');
  }

  okBtnCliked(){
    if(this.checkIfPwdOk(this.oldPassword, this.newPassword,this.confirmPassword)){
      this.net.httpPost(AppGlobal.API.test,
        {
          userName:AppServiceProvider.getInstance().userinfo.userName,
          oldPwd:this.oldPassword,
          newPwd:this.newPassword
          // oldPassword:Md5.hashStr(this.oldPassword).toString().toLowerCase(),
          // newPassword:Md5.hashStr(this.newPassword).toString().toLowerCase()
        },msg => {
        let obj = JSON.parse(msg);
        if (obj.ret == 200) {
          AppServiceProvider.getInstance().userinfo = obj.ACTION_INFO;
          this.db.saveString(this.newPassword,"password");
          this.toast("修改成功!");
          this.navCtrl.pop();
        }else{
          this.toast(obj.desc);
        }
        
      },error => {
        this.toast(error);
      },true);
    }
  }

  checkIfPwdOk(oldPassword, newPassword,confirmPassword){
    if(oldPassword.length==0){
      this.toast("旧密码不能为空");
      return false;
    }
    if(oldPassword.length < 6 || oldPassword.length > 20){
      this.toast("密码长度只能是6-20位");
      return false;
    }
    if(newPassword.length==0){
      this.toast("新密码不能为空");
      return false;
    }
    if(newPassword.length < 6 || newPassword.length > 20){
      this.toast("密码长度只能是6-20位");
      return false;
    }
    if(confirmPassword != newPassword){
      this.toast("两次密码输入不一致");
      return false;
    }
    return true;
  }

}
