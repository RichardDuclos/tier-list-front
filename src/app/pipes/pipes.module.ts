import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MoneyPipe} from "./money/money.pipe";
import {FrenchDatePipe} from "./frenchDate/french-date.pipe";



@NgModule({
  declarations: [MoneyPipe, FrenchDatePipe],
  exports: [
    MoneyPipe, FrenchDatePipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
