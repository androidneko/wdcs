import { Component, Input } from '@angular/core';

/**
 * Generated class for the IonTyInventoryComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'ion-ty-inventory',
  templateUrl: 'ion-ty-inventory.html'
})
export class IonTyInventoryComponent {
  @Input() data:any;
  constructor() {
    console.log('Hello IonTyInventoryComponent Component');
  }

}
