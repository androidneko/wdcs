import { Component } from '@angular/core';

/**
 * Generated class for the CirclesHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'circles-header',
  templateUrl: 'circles-header.html'
})
export class CirclesHeaderComponent {

  text: string;

  constructor() {
    console.log('Hello CirclesHeaderComponent Component');
    this.text = 'Hello World';
  }

}
