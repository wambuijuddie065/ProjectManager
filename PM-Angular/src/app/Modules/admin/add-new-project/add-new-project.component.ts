import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Project } from 'src/app/Interfaces/interfaces';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-new-project',
  templateUrl: './add-new-project.component.html',
  styleUrls: ['./add-new-project.component.css'],
})
export class AddNewProjectComponent implements OnInit {
  projectForm!: FormGroup;
  project_id!: string;
  project_name!: string;
  project_description!: string;
  due_date!: string;
  email!: string;
  selectOptions: any[] = [];

  constructor(private adminService: AdminService,private router:Router) {}

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      project_name: new FormControl(null, Validators.required),
      project_description: new FormControl(null, Validators.required),
      due_date: new FormControl(null, Validators.required),
      email: new FormControl(null,Validators.required),
    });

    this.getUserEmail();
  }
  onSubmitProject() {
    if (this.projectForm.valid) {
      const newProj: Project = this.projectForm.value;
      
      this.adminService.addProject(newProj).subscribe((response)=>{
        this.adminService.displayProject()
        setTimeout(() => {
          window.location.reload()
        }, 500);
      }) 
      this.projectForm.reset()
      this.router.navigate(['/admin/projects'])
      
    }
  }
  getUserEmail() {
    this.adminService.fetchUsers().subscribe((response) => {
      this.selectOptions = response;
    });
  }
}
