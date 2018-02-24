import { Component, Input } from '@angular/core';

/**
 * Generated class for the PicItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pic-item',
  templateUrl: 'pic-item.html'
})
export class PicItemComponent {

  @Input() item:any;
  @Input() state:any;
  constructor() {
    console.log('Hello PicItemComponent Component');
  }

}
