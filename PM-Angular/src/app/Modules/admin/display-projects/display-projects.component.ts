import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Project } from 'src/app/Interfaces/interfaces';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-display-projects',
  templateUrl: './display-projects.component.html',
  styleUrls: ['./display-projects.component.css']
})
export class DisplayProjectsComponent implements OnInit {

  projectsArr:Project[]=[]
  

  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
    
    this.getAllProjects()
  }

  getAllProjects(){
    this.adminService.displayProject().subscribe((response)=>{
      this.projectsArr=response
      
      
    })
  }
  deleteProj$ :Observable<any> = new Observable
  deleteProject(id:any){
    this.adminService.deleteProject(id).pipe(tap(
      val=>{
        setTimeout(() => {
          window.location.reload()
        }, 500);
      }
    )).subscribe((data:any)=>{
console.log(data);

    })
    console.log(id)
    
  }

}
