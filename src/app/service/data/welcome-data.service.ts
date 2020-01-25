import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ɵangular_packages_platform_browser_platform_browser_d } from '@angular/platform-browser';

export class HelloWorldBean {
  constructor(public message: string){ }
}

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(
    private http: HttpClient
  ) { }

  executeHelloWorldBeanService() {
    return this.http.get<HelloWorldBean>('http://localhost:8080/hello-world-bean/jared');
    // console.log("Execute Hello World Bean Service")
  }

  executeHelloWorldBeanServiceWithPathVariable(name: string) {
    return this.http.get<HelloWorldBean>(`http://localhost:8080/hello-world-bean/${name}`);
    // console.log("Execute Hello World Bean Service")
  }
}
