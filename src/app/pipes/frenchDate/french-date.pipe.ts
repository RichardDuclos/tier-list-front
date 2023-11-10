import { Pipe, PipeTransform } from '@angular/core';
import {frenchDateFormatter} from "../../formater/french-date.formater";

@Pipe({
  name: 'frenchDate'
})
export class FrenchDatePipe implements PipeTransform {

  transform(value: string | Date, ...args: unknown[]): unknown {
    return frenchDateFormatter(value);
  }

}
