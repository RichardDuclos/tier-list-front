import { Injectable } from '@angular/core';
import {AbstractControl, FormControl} from "@angular/forms";
import {ApiErrorInterface} from "../../interfaces/api-error.interface";

@Injectable({
  providedIn: 'root'
})
export class FormService {
  errors = [
    { key: 'matDatepickerParse', message: 'Date invalide' },
    { key: 'invaliddate', message: 'Date invalide' },
    { key: 'required', message: 'Champ requis' },
    { key: 'minlength', message: (error: { [key: string]: string }) => `Le champ doit faire plus de ${error.requiredLength} caractères` },
    { key: 'maxlength', message: (error: { [key: string]: string }) => `Le champ doit faire moins de ${error.requiredLength} caractères` },
    { key: 'email', message: 'Adresse email invalide' },
    { key: 'maxdecimal', message: (error: { [key: string]: string }) => `${error.max} chiffres maximum après la virgule` },
    { key: 'phonenumber', message: 'Numéro de téléphone invalide' },
    { key: 'max', message: (error: { [key: string]: string }) => `La valeur maximale est de ${error.max}` },
    { key: 'min', message: (error: { [key: string]: string }) => `La valeur minimale est de ${error.min}` },
    { key: 'equalToField', message: 'Les valeurs ne correspondent pas' },
    { key: 'emailunique', message: "L'adresse est déjà prise" },
    { key: 'number', message: "Ce champ doit être un nombre" },
    { key: 'exactlength', message: (error: { [key: string]: string }) => `Ce champ doit faire ${error.requiredLength} caractères` },
    { key: 'wrong-value', message: 'Valeur invalide'},
  ];
  getErrorMessage(field: FormControl | AbstractControl | ApiErrorInterface) {
    if (field instanceof AbstractControl) {
      if(!field.errors) return
      for (const error of this.errors) {
        if (field.hasError(error.key)) {
          if (typeof error.message === 'function') {
            return error.message(field.getError(error.key));
          } else {
            return error.message;
          }
        }
      }
    } else {
      if(Object.keys(field.constraints).length === 0) {
        return null;
      }
      const constraintEntries = Object.entries(field.constraints);
      for (const [key, value] of constraintEntries) {
        for (const error of this.errors) {
          if(value === error.key) { // l'erreur à été trouvée

            if (typeof error.message === 'function') {
              return error.message(field.contexts[key]);
            } else {
              return error.message;
            }
          }
        }
        // if (field.hasError(error.key)) {
        //   if (typeof error.message === 'function') {
        //     return error.message(field.getError(error.key));
        //   } else {
        //     return error.message;
        //   }
        // }
      }
    }

    return null;
  }
}
