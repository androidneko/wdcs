import { Component, Input } from '@angular/core';

/**
 * Generated class for the JlStockItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'jl-stock-item',
  templateUrl: 'jl-stock-item.html'
})
export class JlStockItemComponent {
  @Input() item:any;

  constructor() {
    console.log('Hello JlStockItemComponent Component');
  }

}
