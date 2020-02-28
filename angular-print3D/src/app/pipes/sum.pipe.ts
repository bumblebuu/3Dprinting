import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sum'
})
export class SumPipe implements PipeTransform {

  transform(array: [], key: any): any {
    let sum = 0;
    for (let i = 0; i < array.length; i += 1) {
      let element: any = array[i];
      let val: any = array[i][key];
      if (typeof val === 'object') {

        for (let j = 0; j < val.length; j += 1) {
          sum += parseInt(val[j][element.product[j].name])
        }
      }
      else {
        sum += parseInt(val);
      }
    }
    return sum;
  }

}
