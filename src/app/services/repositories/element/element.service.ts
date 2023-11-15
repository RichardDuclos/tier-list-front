import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {User} from "../../../models/user.model";
import {Observable} from "rxjs";
import {Rank} from "../../../models/Rank";
import {Element} from "../../../models/element.model";
import {el} from "date-fns/locale";

@Injectable({
  providedIn: 'root'
})
export class ElementService {
  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiURL;
  }
  create(
    element: Element
  ): Observable<Element>{
    return this.http.post<Element>(`${this.apiUrl}/elements`, element)
  }

  update(element: Element) {
    return this.http.put<Element>(`${this.apiUrl}/ranks/${element.id}`, element)
  }
}
