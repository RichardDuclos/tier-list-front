import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/user.model";
import {SecurityService} from "../../../services/security/security.service";
import {UserService} from "../../../services/repositories/users/user.service";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit{
  user?: User;
  editing: boolean= false;
  ngOnInit() {
    const localUser = this.securityService.getUserData();
    if(localUser === null) {
      return this.securityService.logout();
    }
    if(!localUser!.sub) {
      return this.securityService.logout();

    }
    this.userService.get(localUser!.sub!).subscribe(
      (user: User) => {
        this.user = user;
      }
    )

  }
  constructor(private securityService: SecurityService, private userService: UserService) {
  }
}
