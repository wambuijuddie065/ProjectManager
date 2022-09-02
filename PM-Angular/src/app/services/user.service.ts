import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  getMyProjectsUrl=""

  constructor(private http:HttpClient) { }
}
