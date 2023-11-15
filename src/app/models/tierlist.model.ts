import {User} from "./user.model";
import {Rank} from "./Rank";

export interface TierList {
  id?: string;
  name?: string;
  description?: string;
  draft?: boolean;
  adminApproved?: boolean;
  owner?: User;
  ranks?: Rank[];
}
