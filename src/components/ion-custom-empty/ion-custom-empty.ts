import { Component } from '@angular/core';

/**
 * Generated class for the IonCustomEmptyComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'ion-custom-empty',
  templateUrl: 'ion-custom-empty.html'
})
export class IonCustomEmptyComponent {

  text: string;

  constructor() {
    console.log('Hello IonCustomEmptyComponent Component');
    this.text = 'Hello World';
  }

}
