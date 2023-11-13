import {Component, Input} from '@angular/core';
import {TierList} from "../../../models/tierlist.model";

@Component({
  selector: 'app-tierlist-list-row',
  templateUrl: './tierlist-list-row.component.html',
  styleUrls: ['./tierlist-list-row.component.scss']
})
export class TierlistListRowComponent {
  @Input() tierList?: TierList;
}
