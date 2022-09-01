import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignupInterface } from '../Interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  baseUrl="http://localhost:5000/users/register"
  checkUrl="http://localhost:5000/users/check"

  constructor(private http:HttpClient) { }
  signUp(user:SignupInterface):Observable<SignupInterface>{
    return this.http.post<SignupInterface>(`${this.baseUrl}`,user)
  }
  
}
