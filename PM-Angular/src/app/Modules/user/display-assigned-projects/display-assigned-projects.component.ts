import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/Interfaces/interfaces';

@Component({
  selector: 'app-display-assigned-projects',
  templateUrl: './display-assigned-projects.component.html',
  styleUrls: ['./display-assigned-projects.component.css']
})
export class DisplayAssignedProjectsComponent implements OnInit {
  projectsArr:Project[]=[]

  constructor() { }

  ngOnInit(): void {
  }

}
