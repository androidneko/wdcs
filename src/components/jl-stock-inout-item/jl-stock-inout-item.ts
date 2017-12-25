import { Component, Input } from '@angular/core';

/**
 * Generated class for the JlStockInoutItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'jl-stock-inout-item',
  templateUrl: 'jl-stock-inout-item.html'
})
export class JlStockInoutItemComponent {

  @Input() item:any;

  constructor() {
    console.log('Hello JlStockInoutItemComponent Component');
  }

}
