import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {TierList} from "../../../models/tierlist.model";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  apiUrl: string;
  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiURL;
  }
  getPendingTierLists(): Observable<TierList[]> {
    return this.http.get<TierList[]>(`${this.apiUrl}/admin/tier-lists/pending`)
  }

  approve(tierList: TierList, result: boolean): Observable<TierList> {
    return this.http.post<TierList>(`${this.apiUrl}/admin/tier-lists/${tierList.id}`, {state: result})
  }
}
