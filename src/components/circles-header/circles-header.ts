import { Component, Input } from '@angular/core';
import { PhotoViewer } from '../../../node_modules/@ionic-native/photo-viewer';

/**
 * Generated class for the CirclesHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'circles-header',
  templateUrl: 'circles-header.html'
})
export class CirclesHeaderComponent {

  @Input() user:any;

  constructor(private photoViewer: PhotoViewer) {
    console.log('Hello CirclesHeaderComponent Component');
  }

  viewPhoto(picUrl){
    this.photoViewer.show(picUrl, '照片预览', {share: false});
  }
}
