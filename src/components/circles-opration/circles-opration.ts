import { Component, Input } from '@angular/core';
import { AppServiceProvider } from '../../providers/app-service/app-service';

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
  constructor() {
    console.log('Hello CirclesOprationComponent Component');
    this.text = 'Hello World';
  }
  opereationBtnCliked(){
    this.oprationHidden = !this.oprationHidden;
  }
  fabulous(){
    //赞
    this.oprationHidden = true;
    this.item.fabulous.push({
      userName: AppServiceProvider.getInstance().userinfo.userData.nickName == null ? AppServiceProvider.getInstance().userinfo.userData.userName : AppServiceProvider.getInstance().userinfo.userData.nickName,
      userId: "123"
    });
  }
  commentBtnClicked(){
    //评论按钮点击
    this.oprationHidden = true;
    AppServiceProvider.getInstance().chartBar.showWithItem(null,(msg)=>{
      if (msg!=null&&msg.length>0) {
        this.item.comments.push({
          fromuser: {
            userName: AppServiceProvider.getInstance().userinfo.userData.nickName == null ? AppServiceProvider.getInstance().userinfo.userData.userName : AppServiceProvider.getInstance().userinfo.userData.nickName,
            userId: "123"
          },
          content: msg
        });
      }
    });
  }
}
