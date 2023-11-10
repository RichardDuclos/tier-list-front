import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FormService} from "../../../services/forms/form.service";
import {Router} from "@angular/router";
import {SecurityService} from "../../../services/security/security.service";
import {catchError} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";
import {ObservableInput, throwError} from "rxjs";
import {User} from "../../../models/user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide: boolean = true;
  failed: boolean = false;
  loginForm = this.fb.group({
    username: ['yoo', [Validators.required]],
    plainpassword: ['reree', Validators.required]
  })

  constructor(protected formService: FormService,
              private router: Router,
              private securityService: SecurityService,
              private fb: FormBuilder) {}

 /**
  * This function logs in a user by sending their email and password to a security service and
  * redirects them to the dashboard page if successful.
  * @returns If the login form is invalid, nothing is returned and the function exits. If the login
  * form is valid, the function attempts to log in using the email and plain password values from the
  * form. If the login is successful, the user is redirected to the dashboard and the login form is
  * reset. If there is an error during the login process, the error is thrown and caught by the
  * catchError operator,
  */
  login() {
    if(this.loginForm.invalid) {
      return;
    }
    this.failed = false
    const val = this.loginForm.value;
    if (val.username && val.plainpassword) {
      const user: User = {username: val.username, password: val.plainpassword}
      this.securityService.login(user)
        .pipe(catchError((err: HttpErrorResponse): ObservableInput<any> => {
          this.failed = true;
          return throwError(() => err)
        }))
        .subscribe(() => {
          console.log('Logged in !')
          this.loginForm.markAsPristine();
          this.loginForm.markAsUntouched();
          this.loginForm.updateValueAndValidity();
          this.router.navigateByUrl('/')
        })

    }
  }
}
