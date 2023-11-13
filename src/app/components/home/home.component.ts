import {Component, OnInit} from '@angular/core';
import {TierlistService} from "../../services/repositories/tierlist/tierlist.service";
import {User} from "../../models/user.model";
import {TierList} from "../../models/tierlist.model";
import {SecurityService} from "../../services/security/security.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  tierLists?: TierList[];
  isChecked = false;
  user?: User;
  constructor(
    private tierListService: TierlistService,
    private securityService: SecurityService,
  ) {
  }

  ngOnInit() {
    const user = this.securityService.getUserData();
    if(user == null) {
      this.securityService.logout();
    }
    this.user = user!!;
    this.tierListService.getAll().subscribe(
        (tierLists: TierList[]) => {
          this.tierLists = tierLists;
        }
    );
  }

}
