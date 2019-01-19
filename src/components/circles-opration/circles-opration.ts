import { Component, Input } from '@angular/core';
import { AppServiceProvider, AppGlobal } from '../../providers/app-service/app-service';
import { ToastController } from 'ionic-angular';
import { TyNetworkServiceProvider } from '../../providers/ty-network-service/ty-network-service';

/**
 * Generated class for the CirclesOprationComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'circles-opration',
  templateUrl: 'circles-opration.html'
})
export class CirclesOprationComponent {

  text: string;
  @Input() item: any;
  @Input() oprationHidden:boolean = true;
  constructor(public toastCtrl: ToastController,public net:TyNetworkServiceProvider) {
    console.log('Hello CirclesOprationComponent Component');
    this.text = 'Hello World';
  }
  opereationBtnCliked(){
    this.oprationHidden = !this.oprationHidden;
  }
  toast(info) {
    if (this.toastCtrl != null)
      this.toastCtrl.create({
        message: info,
        duration: 3000,
        position: 'middle',
        showCloseButton: true,
        closeButtonText: "关闭"
      }).present();
  }
  fabulous(){
    //赞
    this.oprationHidden = true;
    if (this.item.isFabuloused == true) {
      //取消
      let params =
      {
        "id": this.item.circleFriendsFabulousList[this.item.fabulousedIndex].id,
        "userId": this.item.circleFriendsFabulousList[this.item.fabulousedIndex].userId,
      };
      this.net.httpPost(AppGlobal.API.circleFriendsDelfabulous, params, msg => {
        let obj = JSON.parse(msg);
        if (obj.ret == AppGlobal.RETURNCODE.succeed) {
          this.item.circleFriendsFabulousList.splice(this.item.fabulousedIndex, 1);
          this.item.isFabuloused =false;
        } else {
          this.toast(obj.ACTION_RETURN_MESSAGE);
        }
      }, error => {
        this.toast(error);
      }, true);
    }else{
      //赞
      let params =
      {
        "circleFriendsId": this.item.id,
        "userId": AppServiceProvider.getInstance().userinfo.loginData.userId,
      };
      this.net.httpPost(AppGlobal.API.circleFriendsFabulous, params, msg => {
        let obj = JSON.parse(msg);
        if (obj.ret == AppGlobal.RETURNCODE.succeed) {
          if (this.item.circleFriendsFabulousList==null) {
            this.item.circleFriendsFabulousList = []
          }
          this.item.fabulousedIndex = this.item.circleFriendsFabulousList.length;

          this.item.isFabuloused = true;
          this.item.circleFriendsFabulousList.push({
            "id": obj.data.id,
            "userId": AppServiceProvider.getInstance().userinfo.loginData.userName,
            "circleFriendsId": this.item.id,
            "createTime": obj.data.createTime
          });
        } else {
          this.toast(obj.desc);
        }
      }, error => {
        this.toast(error);
      }, true);
    }
  
  }
  commentBtnClicked(){
    //评论按钮点击
    this.oprationHidden = true;
    AppServiceProvider.getInstance().chartBar.showWithItem(null,(mmsg)=>{
      if (mmsg != null && mmsg.length>0) {
        let params =
        {
          "answerUserId": "",
          "circleFriendsId": this.item.id,
          "content": mmsg,
          "userId": AppServiceProvider.getInstance().userinfo.loginData.userId,
        };
        this.net.httpPost(AppGlobal.API.circleFriendsMsg, params, msg => {
          let obj = JSON.parse(msg);
          if (obj.ret == AppGlobal.RETURNCODE.succeed) {
         
            if (this.item.circleFriendsMsgList == null) {
              this.item.circleFriendsMsgList = []
            }
            this.item.circleFriendsMsgList.push({
              "id": obj.data.id,
              "userId": AppServiceProvider.getInstance().userinfo.loginData.userId,
              "circleFriendsId": this.item.id,
              "createTime":  obj.data.createTime,
              "answerUserId": "",
              "content": mmsg
            });
          } else {
            this.toast(obj.ACTION_RETURN_MESSAGE);
          }
        }, error => {
          this.toast(error);
        }, true);
      }
    });
  }
}
