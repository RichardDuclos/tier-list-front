import {Component, OnDestroy, OnInit} from '@angular/core';
import {DateAdapter} from "@angular/material/core";
import {User} from "../../../models/user.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {count, first, ObservableInput, Subscription, throwError} from "rxjs";
import {maxDecimalValidator} from "../../../directives/maxDecimal.directive";
import {FormService} from "../../../services/forms/form.service";
import {phoneNumberValidator} from "../../../directives/phoneNumber.directive";
import {equalToFieldDirective} from "../../../directives/equalToField.directive";
import {isValidFrenchDateValidator} from "../../../directives/isValidFrenchDate.directive";
import {UserService} from "../../../services/repositories/users/user.service";
import { format } from 'date-fns';
import {catchError} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";
import {exactLengthValidator} from "../../../directives/exactLength.directive";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit, OnDestroy{
  createUserSubscription: Subscription | undefined;
  success: boolean = false;
  hide: boolean = true;
  hide2: boolean = true;
  userForm = this.fb.group({
    username: ['Duclos', [Validators.required, Validators.maxLength(20)]],
    email: ['richard.duclos1004@gmail.com', [Validators.required, Validators.email, Validators.maxLength(50)]],
    plainPassword: ['password', [Validators.required, Validators.minLength(7), Validators.maxLength(64)]],
    plainPasswordConfirm: ['password', [Validators.required]]
  })

  constructor(protected formService: FormService, private  userService: UserService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.userForm.controls.plainPasswordConfirm.setValidators(equalToFieldDirective(this.userForm.controls.plainPassword))
  }

  ngOnDestroy() {
    this.createUserSubscription?.unsubscribe();
  }

  async handleSubmit() {
    if(!this.userForm.valid) {
      return
    }
    const {
      username,
      email,
      plainPassword,
      plainPasswordConfirm,
    } = this.userForm.value
    if(email && plainPassword && plainPasswordConfirm) {
      const user: User = {
        username: username!,
        email: email,
        plainPassword: plainPassword,
        plainPasswordConfirm: plainPasswordConfirm,
      };
    this.createUserSubscription = this.userService.create(user)
      .pipe(catchError((err: HttpErrorResponse): ObservableInput<any> => {
        const error = err.error
        if(error.statusCode === 400) {
          // for(const errorMessage of error.message) {
          //   for(const [key, value] of Object.entries(errorMessage.constraints)) {
          //     try {
          //       const errorContent = errorMessage.contexts ? errorMessage.contexts[(key as unknown as string)] : true;
          //       const angularError = {
          //         [ (value as unknown as string) ]: errorContent,
          //       }
          //       this.userForm.get(errorMessage.property)?.setErrors(angularError)
          //     }
          //     catch (exception) {
          //       console.error(exception)
          //       console.warn(errorMessage)
          //     }
          //   }
          // }
        }
        return throwError(() => err);
      }))
      .subscribe((data: User) => {
        this.userForm.reset()
        this.success = true;
      })
    }
  }

  updatePassword2Validation() {
    this.userForm.get('plainPasswordConfirm')?.updateValueAndValidity()
  }


}
