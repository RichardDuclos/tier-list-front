import { Injectable } from '@angular/core';
import {User} from "../../../models/user.model";
import {map, Observable, of} from "rxjs";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl: string;
  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiURL;
  }

  create(
    user: User
  ): Observable<User>{
    return this.http.post<User>(`${this.apiUrl}/auth/register`, user)
  }

  get(id: string): Observable<User>{
    return this.http.get<User>(`${this.apiUrl}/user/${id}`);
  }

  update(user: User) {
    return this.http.patch<User>(`${this.apiUrl}/user/${user.id}`, user)
  }
}
