import { Component } from '@angular/core';

/**
 * Generated class for the PlantItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'plant-item',
  templateUrl: 'plant-item.html'
})
export class PlantItemComponent {

  text: string;

  constructor() {
    console.log('Hello PlantItemComponent Component');
    this.text = 'Hello World';
  }

}
