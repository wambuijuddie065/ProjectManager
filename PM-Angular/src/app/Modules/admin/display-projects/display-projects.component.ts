import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/Interfaces/interfaces';

@Component({
  selector: 'app-display-projects',
  templateUrl: './display-projects.component.html',
  styleUrls: ['./display-projects.component.css']
})
export class DisplayProjectsComponent implements OnInit {

  projectsArr:Project[]=[]

  constructor() { }

  ngOnInit(): void {
  }

}
