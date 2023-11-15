import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {FormInputBase} from "../model/FormInputBase";
import {FormService} from "../../../../services/forms/form.service";
import {FormTextbox} from "../model/FormTextbox";
import {FormDate} from "../model/FormDate";
import {MAT_COLOR_FORMATS, NGX_MAT_COLOR_FORMATS} from "@angular-material-components/color-picker";

@Component({
  selector: 'app-dynamic-form-input',
  templateUrl: './dynamic-form-input.component.html',
  styleUrls: ['./dynamic-form-input.component.scss'],
  providers: [
    { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }
  ],
})
export class DynamicFormInputComponent implements OnInit{
  @Input() form?: FormGroup;
  @Input() field?: FormInputBase<string | boolean>;
  ngOnInit() {
  }
  constructor(protected formService: FormService) {
  }


  protected readonly String = String;
  protected readonly structuredClone = structuredClone;
  protected readonly Number = Number;
}
