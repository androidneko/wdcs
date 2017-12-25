import { Component, Input } from '@angular/core';

/**
 * Generated class for the BusinessItemEditComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'business-item-edit',
  templateUrl: 'business-item-edit.html'
})
export class BusinessItemEditComponent {

  @Input() item:any;

  constructor() {
    console.log('Hello BusinessItemEditComponent Component');
  }

  checkClicked(check,subItem){
    check.checked = !check.checked;
    subItem.isSelected = check.checked;
  }
}
