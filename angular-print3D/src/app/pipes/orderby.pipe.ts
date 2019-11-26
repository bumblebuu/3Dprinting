import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderby'
})
export class OrderbyPipe implements PipeTransform {

  transform(array: any[], key: string = '', direction: number = 1): any {
    if (key === '') {
      return array;
    }
    array.sort((a, b) => {
      if (typeof a[key] === 'number') {
        return ((a[key] - b[key]) * direction);
      } else {
        return (a[key].toString() as string).localeCompare(b[key].toString()) * direction;
      }
    })
    return array
  }

}
