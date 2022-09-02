import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('intercepting...');
    
    let token=localStorage.getItem('token') as string

    if(token){
      const apiUrl=req.url.startsWith('http://localhost:5000')
      if(apiUrl){
        req=req.clone({
          setHeaders:{
            Authorization:`Bearer ${token}`
          }
        })

      }
    }
    
    return next.handle(req)

  }
}
