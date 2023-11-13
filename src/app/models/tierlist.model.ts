import {User} from "./user.model";

export interface TierList {
  id?: string;
  name?: string;
  description?: string;
  draft?: boolean;
  owner?: User;
}
