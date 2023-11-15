import {Component, Input} from '@angular/core';
import {TierList} from "../../../models/tierlist.model";

@Component({
  selector: 'app-admin-tier-list-row',
  templateUrl: './admin-tier-list-row.component.html',
  styleUrls: ['./admin-tier-list-row.component.scss']
})
export class AdminTierListRowComponent {
  @Input() tierList?: TierList;
  @Input() approve?: Function;
}
