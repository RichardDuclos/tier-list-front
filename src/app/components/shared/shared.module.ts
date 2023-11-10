import { NgModule } from '@angular/core';
import {CommonModule, KeyValuePipe} from '@angular/common';
import {EntityTableComponent} from "./table/entity-table/entity-table.component";
import {AgGridModule} from "ag-grid-angular";
import { DeleteButtonComponent } from './table/delete-button/delete-button.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { RadioFieldComponent } from './table/radio-field/radio-field.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DynamicFormComponent } from './forms/dynamic-form/dynamic-form.component';
import { DynamicFormInputComponent } from './forms/dynamic-form-input/dynamic-form-input.component';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { DatePickerComponent } from './table/date-picker/date-picker.component';
import { ConfirmDialogComponent } from './popup/confirm-dialog/confirm-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { DetailsButtonComponent } from './table/details-button/details-button.component';
import {RouterLink} from "@angular/router";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {BrowserModule} from "@angular/platform-browser";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";


@NgModule({
  declarations: [
    EntityTableComponent,
    DeleteButtonComponent,
    RadioFieldComponent,
    DynamicFormComponent,
    DynamicFormInputComponent,
    DatePickerComponent,
    ConfirmDialogComponent,
    DetailsButtonComponent,
    SidebarComponent,
  ],
  exports: [
    EntityTableComponent,
    DynamicFormComponent,
    SidebarComponent
  ],
    imports: [
        CommonModule,
        KeyValuePipe,
        AgGridModule,
        MatButtonModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        MatRadioModule,
        MatDatepickerModule,
        MatDialogModule,
        RouterLink,
        BrowserModule,
        MatSidenavModule,
        MatListModule,
    ],
  providers: [
  ]
})
export class SharedModule { }
