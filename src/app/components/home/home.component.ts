import {Component, OnInit} from '@angular/core';
import {TierlistService} from "../../services/repositories/tierlist/tierlist.service";
import {User} from "../../models/user.model";
import {TierList} from "../../models/tierlist.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  constructor(
    private tierListService: TierlistService
  ) {
  }

  ngOnInit() {
    console.log('yo')
    this.tierListService.getAll().subscribe(
        (tierList: TierList[]) => {
          console.log(tierList)
        }
    );
  }
}
