import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {UserModule} from "./components/users/user.module";
import {PagesModule} from "./pages/pages.module";
import {MAT_DATE_LOCALE} from "@angular/material/core";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
// import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatListModule} from "@angular/material/list";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {SharedModule} from "./components/shared/shared.module";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { ToastrModule } from 'ngx-toastr';
import { MoneyPipe } from './pipes/money/money.pipe';
import {PipesModule} from "./pipes/pipes.module";
import {LayoutsModule} from "./components/layouts/layouts.module";
import {HomeComponent} from "./components/home/home.component";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import { TierlistListRowComponent } from './components/tierlist/tierlist-list-row/tierlist-list-row.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {FormsModule} from "@angular/forms";
import { TierListDetailsComponent } from './components/tierlist/tier-list-details/tier-list-details.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";

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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TierlistListRowComponent,
    TierListDetailsComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        UserModule,
        PagesModule,
        HttpClientModule,
        MatToolbarModule,
        MatExpansionModule,
        MatIconModule,
        SharedModule,
        ToastrModule.forRoot({
            positionClass: 'toast-bottom-center',
            maxOpened: 5,
        }),
        PipesModule,
        LayoutsModule,
        MatListModule,
        MatSlideToggleModule,
        FormsModule,
        MatGridListModule,
        MatTableModule,
        MatButtonModule,
    ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: MY_DATE_FORMATS },
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    CommonModule,
  ],
    exports: [
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
