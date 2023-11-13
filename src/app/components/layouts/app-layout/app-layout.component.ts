import { Component } from '@angular/core';
import {SidebarComponent} from "../../shared/sidebar/sidebar.component";
import {SecurityService} from "../../../services/security/security.service";

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent {
  constructor(
    private securityService: SecurityService,
  ) {
  }
  logout = () => this.securityService.logout();
}
