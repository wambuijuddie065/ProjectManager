import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckUserInterface, LoginInterface } from '../Interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl="http://localhost:5000/users/login"
  checkUrl="http://localhost:5000/users/check"


  constructor(private http:HttpClient) {

   }

   login(user:LoginInterface):Observable<LoginInterface>{
    return this.http.post<LoginInterface>(`${this.baseUrl}`,user)
   }

   checkUser():Observable<CheckUserInterface>{
    const token=localStorage.getItem('token') as string
    return this.http.get<CheckUserInterface>(`${this.checkUrl}`,{
      headers:new HttpHeaders({token})
    })
   }
   IsLoggedIn(){
    return localStorage.getItem('token')!=null
  }

}
