import { Component, Input } from '@angular/core';
import { AppServiceProvider, AppGlobal } from '../../providers/app-service/app-service';
import { ToastController } from 'ionic-angular';
import { TyNetworkServiceProvider } from '../../providers/ty-network-service/ty-network-service';
/**
 * Generated class for the CirclesFabulousAndcommentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'circles-fabulous-andcomment',
  templateUrl: 'circles-fabulous-andcomment.html'
})
export class CirclesFabulousAndcommentComponent {

  text: string;
  @Input() item: any;
  constructor(public toastCtrl: ToastController, public net: TyNetworkServiceProvider) {
    console.log('Hello CirclesFabulousAndcommentComponent Component');
    this.text = 'Hello World';
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
  mreplyBtnClicked(comment){
    AppServiceProvider.getInstance().chartBar.showWithItem({user:comment}, (mmsg) => {
      if (mmsg != null && mmsg.length > 0) {
        let params =
        {
          "answerUserId": comment.userId,
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
            //评论成功后本地组装评论数据添加到评论列表
            //这里是使用未回复他人之前得数据和当前用户数据组装得来得数据，要和刷新后得报文匹配，所以看起来奇怪
            this.item.circleFriendsMsgList.push({
              "id": obj.data.id,
              "userId": AppServiceProvider.getInstance().userinfo.loginData.userId,
              "circleFriendsId": this.item.id,
              "createTime":  obj.data.createTime,
              "answerUserId": comment.userId,
              "answerUserName": comment.userName,
              "userName": AppServiceProvider.getInstance().userinfo.userData.nickName,
              "content": mmsg
            });
          } else {
            this.toast(obj.desc);
          }
        }, error => {
          this.toast(error);
        }, true);
      }
    });
  }
}
