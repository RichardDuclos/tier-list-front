import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {TierList} from "../../../models/tierlist.model";

@Injectable({
  providedIn: 'root'
})
export class TierlistService {
  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiURL;
  }

  getAll(): Observable<TierList[]> {
    return this.http.get<TierList[]>(`${this.apiUrl}/tier-lists`)
  }

  get(id: string): Observable<TierList> {
    return this.http.get<TierList>(`${this.apiUrl}/tier-lists/${id}`)
  }

  update(tierList: TierList): Observable<TierList> {
    tierList.owner = undefined;
    return this.http.put<TierList>(`${this.apiUrl}/tier-lists/${tierList.id}`, tierList)
  }

  create(tierList: TierList): Observable<TierList> {
    tierList.owner = undefined;
    return this.http.post<TierList>(`${this.apiUrl}/tier-lists`, tierList)
  }
}
