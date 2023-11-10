import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function maxDecimalValidator(decimals: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if(typeof control.value!== 'number') {
      return null
    }

    const numberAsString = `${control.value}`;
    if (numberAsString.includes('.')) {
      if(numberAsString.split('.')[1].length > decimals) {
        return {
          maxdecimal: {
            value: control.value,
            max: decimals
          }
        }
      }
    }
    return null;
  };
}
