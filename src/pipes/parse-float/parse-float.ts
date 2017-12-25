import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ParseFloatPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'parseFloat',
})
export class ParseFloatPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return parseFloat(value);
  }
}
