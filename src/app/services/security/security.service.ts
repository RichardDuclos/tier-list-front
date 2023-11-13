import { Injectable } from '@angular/core';
import {User} from "../../models/user.model";
import * as moment from "moment";
import {BehaviorSubject, map, Observable, of, tap} from "rxjs";
import {Router} from "@angular/router";
import jwt_decode from "jwt-decode";
import {ca} from "date-fns/locale";
import {UserService} from "../repositories/users/user.service";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  apiUrl: string = environment.apiURL;
  private connectionSource = new BehaviorSubject(false);
  connectionMessage = this.connectionSource.asObservable();
  constructor(private router: Router, private userService: UserService, private http: HttpClient) { }

  login(user: User) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, user)
      .pipe(
        tap((res) => {
          this.changeConnectionState(false);
          this.setSession(res)
        }
      )
    );
  }

  private setSession(authResult: { token: string}) {
    this.setJwt(authResult.token);
  }
  setJwt(jwt: string): void {
    localStorage.setItem('jwt', jwt);
  }
  removeJwt(): void {
    localStorage.removeItem('jwt');
  }
  getJwt(): string | null  {
    return localStorage.getItem('jwt');
  }

  getUserData(): User | null {
    const jwt = this.getJwt();
    if(!jwt) {
      return null;
    }
    try {
      return jwt_decode(jwt)
    } catch (Error) {
      return null;
    }
  }

  changeConnectionState(state: boolean) {
    this.connectionSource.next(state);
  }

  logout() {
    this.removeJwt();
    this.changeConnectionState(false);
    this.router.navigate(['/login']);
  }
  public isLoggedIn(): Observable<boolean> {
    const user = this.getUserData();
    if(!user) {
      return of(false);
    }
    return this.http.get(`${this.apiUrl}/auth/me`).pipe(
      map((user: User) => {
        return true
      }),
      catchError((err) => {
        return of(false);
      })
    )
  }

  isLoggedOut() {
    return !this.isLoggedIn()
  }
  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    if(!expiration) {
      return null;
    }
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  refreshToken() {
    return this.http.post<{ access_token: string, refresh_token: string }>(`${this.apiUrl}/auth/refresh`, {})
  }
}
