import { Component, Input, ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

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
  @ViewChild(Slides) slides: Slides;

  currentIndex:number = 0;

  constructor() {
    console.log('Hello PlantItemComponent Component');
  }

  slideChanged(){
    this.currentIndex = this.slides.getActiveIndex();
  }
}
