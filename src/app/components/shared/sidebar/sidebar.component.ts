import {Component, Input} from '@angular/core';
import {SecurityService} from "../../../services/security/security.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(private securityService: SecurityService) {
  }

  disconnect() {
    this.securityService.logout();
  }
}
