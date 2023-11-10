import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function exactLengthValidator(length: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;
    if (value && value.length === length) {
      return null; // La validation réussit
    } else {
      return { exactlength: { requiredLength: length } }; // La validation échoue
    }
  };
}
