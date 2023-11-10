import {Component, OnDestroy, OnInit} from '@angular/core';
import {MAT_DATE_FORMATS} from "@angular/material/core";
import {ActivatedRoute, ActivationEnd, NavigationEnd, Router} from "@angular/router";
import {Subscription} from "rxjs";
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'front-end';
  constructor(private router: Router,
              private route: ActivatedRoute) {
  }
  ngOnInit() {

  }

  ngOnDestroy(): void {

  }
}
