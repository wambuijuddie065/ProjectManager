import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project, User } from '../Interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  addUrl="http://localhost:5000/projects/add"
  displayUrl="http://localhost:5000/projects"
  fetchUserUrl="http://localhost:5000/users"
  deleteUrl="http://localhost:5000/projects/"


  constructor(private http:HttpClient) { }
   addProject(project:Project):Observable<Project>{
    return this.http.post<Project>(`${this.addUrl}`,project)
   

   }
   displayProject():Observable<Project[]>{
    // const token=localStorage.getItem('token') as string
    return this.http.get<Project[]>(`${this.displayUrl}`)

   }

   deleteProject(id:Project):Observable<Project>{

    return this.http.delete<Project>(`http://localhost:5000/projects/${id}`)

   }
   fetchUsers():Observable<User[]>{
    return this.http.get<User[]>(`${this.fetchUserUrl}`)
   }
}
