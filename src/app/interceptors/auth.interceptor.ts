import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {BehaviorSubject, filter, Observable, switchMap, take, throwError} from "rxjs";
import {SecurityService} from "../services/security/security.service";
import {catchError} from "rxjs/operators";
import {EventBusService} from "../services/event-bus/event-bus.service";
import {EventData} from "../services/event-bus/event.class";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private securityService: SecurityService,
              private eventBusService: EventBusService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = this.securityService.getJwt();
    if(jwt) {
      req = req.clone({
        headers: req.headers.set('authorization',
          `Bearer ${jwt}`)
      })
    }


    return next.handle(req).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          !req.url.includes('auth/login') &&
          error.status === 401
        ) {
          return this.handle401Error(req, next);
        }

        return throwError(() => error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    // if (!this.isRefreshing) {
    //   this.isRefreshing = true;
    //   const jwt = this.securityService.getJwt();
    //   console.log('refreshing !')
    //   if (jwt) {
    //     return this.securityService.refreshToken().pipe(
    //       switchMap((tokens: { access_token: string, refresh_token: string }) => {
    //         console.log(tokens);
    //         this.isRefreshing = false;
    //         this.securityService.setJwt(tokens.access_token);
    //         this.securityService.setRt(tokens.refresh_token);
    //         request = request.clone({
    //           headers: request.headers.set('Authorization',
    //             `Bearer ${tokens.access_token}`)
    //         })
    //         return next.handle(request);
    //       }),
    //       catchError((error) => {
    //         this.isRefreshing = false;
    //         if (error.status == '403') {
    //           // this.eventBusService.emit(new EventData('logout', null));
    //         }
    //
    //         return throwError(() => error);
    //       })
    //     );
    //   }
    // }

    return next.handle(request);
  }
}


