import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from './register-form/register-form.component';
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { UserFormComponent } from './user-form/user-form.component';
import {SharedModule} from "../shared/shared.module";



@NgModule({
    declarations: [
        RegisterFormComponent,
        ProfilePageComponent,
        UserFormComponent
    ],
  exports: [
    RegisterFormComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    SharedModule
  ],
  providers: [
  ]
})
export class UserModule { }
