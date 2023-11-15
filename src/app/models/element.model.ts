import {Rank} from "./Rank";

export interface Element {
  id?: string;
  imageData?: string | ArrayBuffer;
  tag?: string;
  order?: number;
  rank?: Rank;
}
