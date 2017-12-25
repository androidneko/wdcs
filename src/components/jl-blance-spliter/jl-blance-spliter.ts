import { Component, Input } from '@angular/core';

/**
 * Generated class for the JlBlanceSpliterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */


@Component({
  selector: 'jl-blance-spliter',
  templateUrl: 'jl-blance-spliter.html'
})
export class JlBlanceSpliterComponent {
  @Input() totalAmt:any;
  @Input() leftClass:any;  //左边样式
  @Input() rightClass:any;  //右边样式

  constructor() {
    console.log('Hello JlBlanceSpliterComponent Component');
  }

}
