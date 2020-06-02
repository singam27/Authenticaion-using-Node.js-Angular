import { Injectable } from '@angular/core';
import {HttpInterceptor,HttpRequest,HttpHandler} from '@angular/common/http';
import {UserService} from './user.service'

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private _userService:UserService) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler){
    const authToken = this._userService.getToken();
    if(authToken){
    req = req.clone({
      setHeaders: {
        Authorization: authToken
      }
    });
  }
    return next.handle(req);
  }
}
