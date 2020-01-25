import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private http: HttpClient) { }


  executeAuthenticationService(username: string, password: string) {
    console.log('entering to executeAuthenticationService');
    const basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);
    console.log(basicAuthHeaderString);
    const headers = new HttpHeaders({
      Authorization : basicAuthHeaderString
    });
    console.log(headers);
    return this.http.get<AuthenticationBean>(
      `http://localhost:8080/basicauth`, {headers}).pipe(
        map(
          data => {
            console.log(data);
            sessionStorage.setItem('authenticateUser', username);
            sessionStorage.setItem('token', basicAuthHeaderString);
            console.log('user and token correctly set');
            return data;
          },
          error => {
            console.log('AN ERROR HAS OCURRED');
            console.log(error);
          }
        )
      );
  }

  getAuthenticatedUser(): string {
    return sessionStorage.getItem('authenticateUser');
  }

  getAuthenticatedToken(): string {
    console.log(this.getAuthenticatedUser());
    return sessionStorage.getItem('token');
  }

  logout() {
    sessionStorage.removeItem('authenticateUser');
    sessionStorage.removeItem('token');
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem('authenticateUser');
    return !(user === null);
  }
}

export class AuthenticationBean {
  constructor(public message: string) {}
}
