import { Component } from '@angular/core';

/**
 * Generated class for the IonAllitemShowedBottomComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'ion-allitem-showed-bottom',
  templateUrl: 'ion-allitem-showed-bottom.html'
})
export class IonAllitemShowedBottomComponent {

  text: string;

  constructor() {
    console.log('Hello IonAllitemShowedBottomComponent Component');
    this.text = 'Hello World';
  }

}
