import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private auth : AuthService) { }

  intercept(req,next){
      let tokenizedRequest = req.clone({
        setHeaders : {
          Authorization : `Bearer ${this.auth.getToken()}`
        }
      })
      return next.handle(tokenizedRequest)
  }
}
