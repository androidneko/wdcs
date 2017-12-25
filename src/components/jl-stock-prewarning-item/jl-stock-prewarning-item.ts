import { Component, Input } from '@angular/core';

/**
 * Generated class for the JlStockPrewarningItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'jl-stock-prewarning-item',
  templateUrl: 'jl-stock-prewarning-item.html'
})
export class JlStockPrewarningItemComponent {

  @Input() item:any;

  constructor() {
    console.log('Hello JlStockPrewarningItemComponent Component');
  }

}
