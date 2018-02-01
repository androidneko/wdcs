import { Component, Input } from '@angular/core';

/**
 * Generated class for the ImgLazyLoadComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'img-lazy-load',
  templateUrl: 'img-lazy-load.html'
})
export class ImgLazyLoadComponent {
  @Input() default: string = "";
  srcValue: string = "";
  curentLoadingImg: string = "";
  @Input()
  get src() {
    return this.srcValue;
  }
  set src(val) {
    this.srcValue = val;
    if (this.curentLoadingImg != val && val != null && val.length > 0) {
      this.curentLoadingImg = val;
      let img = new Image();
      img.src = this.src;
      img.onload = () => {
        //这里为了达到演示效果给了两秒的延迟，实际使用中不需要延迟
          this.default = this.src;
      }
    }
  };
  constructor() {
    console.log('Hello ImgLazyLoadComponent Component');
    // this.text = 'Hello World';
  }

}
