import { Component } from '@angular/core';

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

  constructor() {
    console.log('Hello CirclesFabulousAndcommentComponent Component');
    this.text = 'Hello World';
  }

}
