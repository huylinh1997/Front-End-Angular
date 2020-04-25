import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private route: Router) {

  }
  
  errorCode: any;


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // server-side error
            // &&  === 'The access token has expired'
            if (error.error['msg'] === 'The access_token token has expired')
            {
              localStorage.clear()
              errorMessage = error.error['msg'];
              this.route.navigate(['loginForm'])
            }
            if(error.status == 401 || error.status == 409)
            {
              errorMessage = error.error['msg'];
            }

            else {
              errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            }
          }
          window.alert(errorMessage);
          return throwError(errorMessage);
        })
      )
  }
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem("token");
        if (token) {
            const cloned = request.clone({
                headers :request.headers.set("Authorization","Bearer"+token)
            });

            return next.handle(cloned)
        } else {
            console.log(next.handle(request));
           return next.handle(request);
        }
    }
} 
