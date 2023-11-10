import { Pipe, PipeTransform } from '@angular/core';
import {priceFormater} from "../../formater/price-formater";

@Pipe({
  name: 'money'
})
export class MoneyPipe implements PipeTransform {

  transform(value: string | number, ...args: unknown[]): unknown {
    return priceFormater(value);
  }

}
