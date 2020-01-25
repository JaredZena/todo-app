import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { BasicAuthenticationService } from '../basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorBasicAuthService implements HttpInterceptor {


  constructor(
    private basicAuthenticationService: BasicAuthenticationService
  ) { }


  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const basicAuthHeaderString = this.basicAuthenticationService.getAuthenticatedToken();
    console.log('token: ' + basicAuthHeaderString);
    request = request.clone({
      setHeaders : {
        Authorization : basicAuthHeaderString
      }
    });

    return next.handle(request);
  }
}
