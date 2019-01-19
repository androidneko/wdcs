import { Component, Input } from '@angular/core';
import { PhotoViewer } from '../../../node_modules/@ionic-native/photo-viewer';

/**
 * Generated class for the CirclesPhotosComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'circles-photos',
  templateUrl: 'circles-photos.html'
})
export class CirclesPhotosComponent {

  text: string;
  @Input() item: any;
  constructor(private photoViewer: PhotoViewer) {
    console.log('Hello CirclesPhotosComponent Component');
    this.text = 'Hello World';
  }

  viewPhoto(picUrl){
    this.photoViewer.show(picUrl, '照片预览', {share: false});
  }

}
