import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../Interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService  implements OnInit{
  project!:Project

  

  constructor(private http:HttpClient) { }
  ngOnInit(): void {
    this.displayMyProjects()
  }


  displayMyProjects():Observable<Project[]>{
    const id=localStorage.getItem('user_id') as string
   return this.http.get<Project[]>(`http://localhost:5000/projects/${id}/getone`)
   
   
  }
  markComplete(project_id:string):Observable<Project[]>{
    
    return this.http.put<any>(`http://localhost:5000/projects/${project_id}/complete}`,project_id)

  }
}

