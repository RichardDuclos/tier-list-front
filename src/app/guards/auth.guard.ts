import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {inject} from "@angular/core";
import {PermissionService} from "../services/permissions/permission.service";

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> => {
  return inject(PermissionService).AuthGuardActivate(next, state);
}
