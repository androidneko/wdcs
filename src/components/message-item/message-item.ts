import { Component } from '@angular/core';

/**
 * Generated class for the MessageItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'message-item',
  templateUrl: 'message-item.html'
})
export class MessageItemComponent {

  text: string;

  constructor() {
    console.log('Hello MessageItemComponent Component');
    this.text = 'Hello World';
  }

}
