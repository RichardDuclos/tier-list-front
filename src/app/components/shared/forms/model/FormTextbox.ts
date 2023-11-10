import {FormInputBase} from "./FormInputBase";

export class FormTextbox extends FormInputBase<string> {
  override controlType = 'textbox';
  override type= 'text';

}
