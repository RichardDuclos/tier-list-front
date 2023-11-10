import {FormGroup, ValidatorFn} from '@angular/forms';

export class FormInputBase<T> {
  value: T | undefined;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  type: string;
  options: { key: string; value: string; }[];
  validators: ValidatorFn[] | null;
  readonly: boolean;
  hide: Function;
  max?: number;
  min?: number;
  maxDate?: Date;
  minDate?: Date;
  constructor(
    options: {
      value?: T;
      key?: string;
      label?: string;
      required?: boolean;
      order?: number;
      max?: number;
      min?: number;
      maxDate?: Date;
      minDate?: Date;
      controlType?: string;
      type?: string;
      options?: { key: string; value: string }[];
      validators?: ValidatorFn[] | null;
      readonly?: boolean;
      hide?: Function
    } = {},
  ) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.options = options.options || [];
    this.validators = options.validators || [];
    this.readonly = !!options.readonly;
    this.max = options.max;
    this.min = options.min;
    this.maxDate = options.maxDate;
    this.minDate = options.minDate;
    this.hide = options.hide || function(form: FormGroup) { return false };
  }
}
