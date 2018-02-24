import { Component, Input } from '@angular/core';

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
  commentBtnCliked(){
    this.oprationHidden = !this.oprationHidden;
  }
}
