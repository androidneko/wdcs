import { Component, Input } from '@angular/core';

/**
 * Generated class for the CirclesItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'circles-item',
  templateUrl: 'circles-item.html'
})
export class CirclesItemComponent {

  text: string;
  @Input() item:any;
  constructor() {
    console.log('Hello CirclesItemComponent Component');
    this.text = 'Hello World';
  }

}
