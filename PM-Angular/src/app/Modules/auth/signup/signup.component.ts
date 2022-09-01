import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupInterface } from 'src/app/Interfaces/interfaces';
import { SignupService } from 'src/app/services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm!:FormGroup

  constructor(private signupService:SignupService,private router:Router) { }

  ngOnInit(): void {
    this.signUpForm=new FormGroup({
      name:new FormControl(null,Validators.required),
      email:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,[Validators.required,Validators.minLength(8)])
    })
  }
  onSignUp(){

    const user:SignupInterface=this.signUpForm.value
    this.signupService.signUp(user).subscribe((response)=>{

      console.log(response);
      

    },
    (error)=>{console.log(error)
    })

    this.signUpForm.reset()
    this.router.navigate(['/auth/login'])
    
    
  }

}
