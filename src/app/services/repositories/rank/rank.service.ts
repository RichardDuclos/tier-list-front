import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {User} from "../../../models/user.model";
import {Observable} from "rxjs";
import {Rank} from "../../../models/Rank";

@Injectable({
  providedIn: 'root'
})
export class RankService {
  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiURL;
  }
  create(
    rank: Rank
  ): Observable<Rank>{
    return this.http.post<Rank>(`${this.apiUrl}/ranks`, rank)
  }

  update(rank: Rank) {
    return this.http.put<Rank>(`${this.apiUrl}/ranks/${rank.id}`, rank)
  }
}
