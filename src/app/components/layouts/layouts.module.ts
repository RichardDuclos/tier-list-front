import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import {SharedModule} from "../shared/shared.module";
import {RouterOutlet} from "@angular/router";
import {SidebarComponent} from "../shared/sidebar/sidebar.component";
import {MatSidenavModule} from "@angular/material/sidenav";



@NgModule({
  declarations: [
    AppLayoutComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterOutlet,
  ],
  providers: [
    SidebarComponent,
  ]
})
export class LayoutsModule { }
