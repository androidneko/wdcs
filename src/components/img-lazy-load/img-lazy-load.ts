import { Component, Input, NgZone } from '@angular/core';

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
    if (val.indexOf("wwww")>=0) {
      if (this.curentLoadingImg != val && val != null && val.length > 0) {
        this.curentLoadingImg = val;
        let img = new Image();
        img.src = this.curentLoadingImg;
        img.onload = () => {
          this.zone.runGuarded(() => {
            this.default = this.curentLoadingImg;
          });
        }
      }
    }else{
      this.default = val;
    }
   
  };
  constructor(public zone:NgZone) {
    console.log('Hello ImgLazyLoadComponent Component');
    // this.text = 'Hello World';
  }

}
