import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginInterface } from 'src/app/Interfaces/interfaces';
import { AuthGuard } from 'src/app/services/auth-guard';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email!: string;
  password!: string;

  @ViewChild('loginForm') loginForm!: NgForm;

  constructor(private loginService: LoginService, private router: Router) {
    localStorage.clear()
  }

  ngOnInit(): void {}
  onSubmit() {
    if(this.loginForm.valid){
      const user: LoginInterface = this.loginForm.value;

      this.loginService.login(user).subscribe(
        (response) => {
          response.token ? localStorage.setItem('token', response.token) : '';
          if (
            response.message === 'Invalid Password!' ||
            response.message === 'User Not Found'
          ) {
            alert(response.message);
          } else {
            // this.authGuard.isLoggedIn=true
            this.redirect();
          }
        },
        (error) => console.log(error)
      );
    }
   
  }

  redirect() {
    this.loginService.checkUser().subscribe((response) => {
      localStorage.setItem('name', response.name);
      localStorage.setItem('role', response.role);
      localStorage.setItem('email', response.email);
      localStorage.setItem('user_id',response.user_id)
      

      if (response.role === 'Admin') {
        this.router.navigate(['/admin/projects']);
        localStorage.setItem('isLoggedIn','true')
      } else {
        this.router.navigate(['/user/projects']);
        localStorage.setItem('isLoggedIn','true')
      }
    });
  }
}
