import {FormInputBase} from "./FormInputBase";
import {ValidatorFn} from "@angular/forms";

export class FormDate extends FormInputBase<string> {
  override controlType = 'date';
  override type= 'text';

  constructor(    options: {
    value?: string;
    key?: string;
    label?: string;
    required?: boolean;
    order?: number;
    controlType?: string;
    type?: string;
    options?: { key: string; value: string }[];
    validators?: ValidatorFn[] | null;
    readonly?: boolean;
    hide?: Function
  } = {},) {
    super(options);
  }

}
