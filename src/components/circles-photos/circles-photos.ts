import { Component, Input } from '@angular/core';

/**
 * Generated class for the CirclesPhotosComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'circles-photos',
  templateUrl: 'circles-photos.html'
})
export class CirclesPhotosComponent {

  text: string;
  @Input() imgs=[];
  constructor() {
    console.log('Hello CirclesPhotosComponent Component');
    this.text = 'Hello World';
  }

}
