import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {inject, Injectable} from "@angular/core";
import {SecurityService} from "../security/security.service";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  constructor(private router: Router, private securityService: SecurityService) {}

  AuthGuardActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree>  {
    return this.securityService.isLoggedIn().pipe(
      map((result) => {
        if(result) {
          return true;
        } else {
          return this.router.createUrlTree(['/login']);
        }
      })
    )
  }
}

