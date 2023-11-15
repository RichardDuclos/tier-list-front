import {Component, Input, OnInit} from '@angular/core';
import {FormInputBase} from "../model/FormInputBase";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiErrorInterface} from "../../../../interfaces/api-error.interface";
import {fi} from "date-fns/locale";

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit{
  @Input() formFields: FormInputBase<string | boolean> [] = [];
  @Input() onSubmit: Function = () => {};
  @Input() submitText: string = 'Envoyer';
  @Input() allowErrorOnStart: boolean = false;
  form?: FormGroup;

  ngOnInit() {
    const group: { [key: string]: FormControl } = {};
    this.formFields.forEach((field) => {
      group[field.key] = field.required ?
        new FormControl(field.value || '', [...field.validators ?? [], Validators.required]) :
      new FormControl(field.value || '', field.validators)
    })
    this.form = new FormGroup(group);
    if(this.allowErrorOnStart) {
      this.form.markAllAsTouched()
    }
  }

  applyErrors(apiErrors: ApiErrorInterface[]) {
    if(!this.form) { // the form is required
      return;
    }
    for (const error of apiErrors) {
      for(const [key, value] of Object.entries(error.constraints)) {
        const errorContext = error.contexts? error.contexts[(key)] : true;
        //the context is needed for exemple the MaxLength property. if there is no context, true is enough
        if(this.form.get(error.property)) {
          if(this.form.controls[error.property]) {
            this.form.controls[error.property].setErrors({
              [ (value as unknown as string) ]: errorContext,
            })
          }

        }
      }
    }
  }

}
