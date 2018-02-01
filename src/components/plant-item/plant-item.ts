import { Component, Input } from '@angular/core';

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

  @Input() item:any;


  constructor() {
    console.log('Hello PlantItemComponent Component');
  }
}
