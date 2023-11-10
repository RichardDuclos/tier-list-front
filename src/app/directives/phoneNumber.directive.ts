import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function phoneNumberValidator(): ValidatorFn {
  let phonePattern = /^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/
  return (control: AbstractControl): ValidationErrors | null => {
    if(typeof control.value!== 'string') {
      return null
    }

    return control.value.match(phonePattern) ? null : {
      phonenumber: {
        value: control.value,
      }
    }
  };
}
