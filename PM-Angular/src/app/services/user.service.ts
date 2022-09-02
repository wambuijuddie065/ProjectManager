import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../Interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  getMyProjectsUrl=""

  constructor(private http:HttpClient) { }


  displayMyProjects(id:string,token:string):Observable<Project[]>{
   return this.http.get<Project[]>('http://localhost:5000/projects/${id}/getone')


  }
}

