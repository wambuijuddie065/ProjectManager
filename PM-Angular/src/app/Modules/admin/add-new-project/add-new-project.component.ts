import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-new-project',
  templateUrl: './add-new-project.component.html',
  styleUrls: ['./add-new-project.component.css']
})
export class AddNewProjectComponent implements OnInit {
  projectForm!:FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.projectForm=new FormGroup({
      projName:new FormControl(null,Validators.required),
      projDesc:new FormControl(null,Validators.required),
      dueDate:new FormControl(null,Validators.required),
      selectEmail:new FormControl('email',Validators.required),
    });

  }
  onSubmitProject(){
    console.log(this.projectForm);
    this.projectForm.reset()
    

  }

}
