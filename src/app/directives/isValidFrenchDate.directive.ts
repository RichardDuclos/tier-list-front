import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function isValidFrenchDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if(control.value === '') {
      return null;
    }
    const pattern=/^([0-9]|[0-2][0-9]|(3)[0-1])(\/)(([0-9]|(0)[0-9])|((1)[0-2]))(\/)\d{4}$/
    if (!control.value.match(pattern)) {
      return {
        isvalidfrenchdate: {
          value: control.value,
        }
      }
    }
    const testDate = new Date(control.value);

    return !testDate ? {
      isvalidfrenchdate: {
        value: control.value,
      }
    } : null
  };
}
