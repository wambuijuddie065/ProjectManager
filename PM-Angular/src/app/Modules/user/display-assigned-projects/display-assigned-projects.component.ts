import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/Interfaces/interfaces';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-display-assigned-projects',
  templateUrl: './display-assigned-projects.component.html',
  styleUrls: ['./display-assigned-projects.component.css'],
})
export class DisplayAssignedProjectsComponent implements OnInit {
  myProjects: Project[] = [];
  isComplete:boolean=false
 

  constructor(private userService: UserService) {}

  ngOnInit(){
   
    this.getMyProject();
  }

  getMyProject() {
    this.userService.displayMyProjects().subscribe((response) => {
      
      
      console.log(response);

      this.myProjects = response;
      
    });
  }

  completeProject(project_id:string){
    this.userService.markComplete(project_id).subscribe((response)=>{
      this.isComplete=true
    })

  }
}
