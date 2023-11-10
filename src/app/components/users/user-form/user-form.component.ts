import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormInputBase} from "../../shared/forms/model/FormInputBase";
import {User} from "../../../models/user.model";
import {DynamicFormComponent} from "../../shared/forms/dynamic-form/dynamic-form.component";
import {FormTextbox} from "../../shared/forms/model/FormTextbox";
import {FormGroup} from "@angular/forms";
import {UserService} from "../../../services/repositories/users/user.service";
import {catchError} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";
import {ObservableInput, throwError} from "rxjs";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit{
  myForm?: FormInputBase<string | boolean>[];
  type: string = 'create';
  @Input() user?: User;
  @ViewChild(DynamicFormComponent) dynamicForm?: DynamicFormComponent;
  constructor(private userService: UserService) {
  }
  ngOnInit() {
    if(this.user) {
      this.type = 'update';
    }
    // this.myForm = [
    //   new FormTextbox({
    //     key: 'firstname',
    //     label: 'Prénom',
    //     required: true,
    //     value: this.user ? this.user.firstname : ''
    //   }),
    //   new FormTextbox({
    //     key: 'lastname',
    //     label: 'Nom',
    //     required: true,
    //     value: this.user ? this.user.lastname : ''
    //   }),
    //   new FormTextbox({
    //     key: 'phone',
    //     label: 'Numéro de téléphone',
    //     required: true,
    //     value: this.user ? this.user.phone : ''
    //   }),
    //   new FormTextbox({
    //     key: 'maxTurnover',
    //     label: "Chiffre d'affaire maximal",
    //     required: true,
    //     value: this.user ? `${this.user.maxTurnover}` : ''
    //   }),
    //   new FormTextbox({
    //     key: 'chargeRate',
    //     label: 'Taux de charge',
    //     required: true,
    //     value: this.user ? `${this.user.chargeRate}` : ''
    //   }),
    //   new FormTextbox({
    //     key: 'plainpassword',
    //     label: 'Mot de passe',
    //     required: false,
    //   }),
    //   new FormTextbox({
    //     key: 'plainpasswordconfirm',
    //     label: 'Confirmation du mot de passe',
    //     required: false,
    //   }),
    //   new FormTextbox({
    //     key: 'address',
    //     label: 'Adresse',
    //     required: true,
    //     value: this.user ? this.user.address : ''
    //   }),
    // ]
  }

  onSubmit: Function = (form: FormGroup) => {
    // if(!form.valid) {
    //   return;
    // }
    // const {
    //   firstname,
    //   lastname,
    //   email,
    //   // birthdate,
    //   chargeRate,
    //   maxTurnover,
    //   plainpassword,
    //   phone,
    //   plainpasswordconfirm,
    //   address
    // } = form.value
    // const user: User = {
    //   firstname: firstname,
    //   lastname: lastname,
    //   phone: phone,
    //   maxTurnover: +maxTurnover,
    //   chargeRate: +chargeRate,
    //   address: address
    // };
    // if(plainpassword !== '' && plainpasswordconfirm !== '') {
    //   user.plainPassword = plainpassword;
    //   user.plainPasswordConfirm = plainpasswordconfirm;
    // }
    // user.id = this.user!.id
    // this.userService.update(user)
    //   .pipe(
    //     catchError((err: HttpErrorResponse): ObservableInput<any> => {
    //       const error = err.error;
    //       if(error && error.statusCode === 400 && this.dynamicForm) {
    //         this.dynamicForm.applyErrors(error.message);
    //       }
    //       return throwError(() => err);
    //     }),
    //   )
    //   .subscribe(
    //   (user: User) => {
    //   }
    // )
  };

}
