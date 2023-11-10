import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function equalToFieldDirective(field: FormControl): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if(control.value === '') {
      return null;
    }
    return control.value === field.value ? null : {
      equalToField: {
        value: control.value,
      }
    }
  };
}
