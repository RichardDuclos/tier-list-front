import {TierList} from "./tierlist.model";
import {Element} from "./element.model";

export interface Rank {
  id?: string;
  name?: string;
  color?: string;
  order?: number;
  elements?: Element[];
  tierlist?: TierList;
}
