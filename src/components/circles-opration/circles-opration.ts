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
  }
  commentBtnClicked(){
    //评论按钮点击
    this.oprationHidden = true;
    AppServiceProvider.getInstance().chartBar.showWithItem(null,(msg)=>{

    });
  }
}
