import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../components/users/login/login.component';
import { RegisterComponent } from '../components/users/register/register.component';
import {UserModule} from "../components/users/user.module";
import {RegisterFormComponent} from "../components/users/register-form/register-form.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {FormService} from "../services/forms/form.service";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { NotfoundComponent } from '../components/notfound/notfound.component';
import {RouterLink} from "@angular/router";
import {AppModule} from "../app.module";
import {MatCardModule} from "@angular/material/card";



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    NotfoundComponent,
  ],
  imports: [
    CommonModule,
    UserModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatCardModule,
  ],
  providers: [
    FormService,
  ]
})
export class PagesModule { }
