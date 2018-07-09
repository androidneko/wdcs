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
            this.item.circleFriendsMsgList.push({
              "id": "c8b6773dd02c4689963ad880b41bf3f9",
              "userId": AppServiceProvider.getInstance().userinfo.loginData.userId,
              "circleFriendsId": this.item.id,
              "createTime": "2018-07-09 22:43:46",
              "answerUserId": comment.userId,
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
