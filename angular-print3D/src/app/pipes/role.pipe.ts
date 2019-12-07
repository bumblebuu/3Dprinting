import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {

  transform(value: any, key: string, phrase: string): any {
    return value.filter(item => {
      return (item[key].indexOf(phrase) > -1);
    });
  }

}
