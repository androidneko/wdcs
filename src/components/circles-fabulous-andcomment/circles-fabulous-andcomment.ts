import { Component, Input } from '@angular/core';
import { AppServiceProvider } from '../../providers/app-service/app-service';

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
  constructor() {
    console.log('Hello CirclesFabulousAndcommentComponent Component');
    this.text = 'Hello World';
  }
  mreplyBtnClicked(user){
    AppServiceProvider.getInstance().chartBar.showWithItem(null, (msg) => {
      if (msg != null && msg.length > 0) {
        this.item.comments.push({
          fromuser: {
            userName: AppServiceProvider.getInstance().userinfo.userData.nickName == null ? AppServiceProvider.getInstance().userinfo.userData.userName : AppServiceProvider.getInstance().userinfo.userData.nickName,
            userId: "123"
          }, touser: user,
          content: msg
        });
      }
    });
  }
}
