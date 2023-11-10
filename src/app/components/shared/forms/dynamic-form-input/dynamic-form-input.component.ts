import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {FormInputBase} from "../model/FormInputBase";
import {FormService} from "../../../../services/forms/form.service";
import {FormTextbox} from "../model/FormTextbox";
import {FormDate} from "../model/FormDate";

@Component({
  selector: 'app-dynamic-form-input',
  templateUrl: './dynamic-form-input.component.html',
  styleUrls: ['./dynamic-form-input.component.scss']
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
