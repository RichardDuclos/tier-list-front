import {Component, OnInit} from '@angular/core';
import {TierList} from "../../models/tierlist.model";
import {AdminService} from "../../services/repositories/admin/admin.service";
import {th} from "date-fns/locale";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit{
  tierLists?: TierList[];
  constructor(
    private adminService: AdminService,
  ) {
  }
  ngOnInit(): void {
    this.fetchData()
  }

  private fetchData() {
    this.adminService.getPendingTierLists().subscribe(
      (tierLists: TierList[]) => {
        this.tierLists = tierLists;
      }
    );
  }

  approve : Function = (event : Event, tierList: TierList, result: boolean) => {
    event.stopPropagation();
    this.adminService.approve(tierList, result)
      .subscribe(() => {
        this.fetchData()
      })
  }
}
