import {Component, ViewChild} from '@angular/core';
import {frenchDateFormatter} from "../../../../formater/french-date.formater";
import {MatDatepicker} from "@angular/material/datepicker";

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent {
  @ViewChild('picker') datePicker!: MatDatepicker<Date>;
  private params: any;
  inputDate: Date | string = new Date();

  agInit(params: any): void {
    this.params = params;
    this.inputDate = this.params.value;
  }
  getValue() {
    if(this.inputDate === null) {
      return null;
    } else if(typeof this.inputDate === "string") {
      return this.inputDate;
    }
    return this.inputDate.toISOString();
  }
  isPopup(): boolean {
    return true;
  }
  // after this component has been created and inserted into the grid
  afterGuiAttached() {
    this.datePicker.open();
  }



}
