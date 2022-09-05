import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { slideAnimations } from './app.animations';
import { AuthGuard } from './services/auth-guard';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[slideAnimations
  ]
})
export class AppComponent {
  title = 'PM-Angular';
  constructor(public loginService:LoginService, private route:Router){

  }
  isLoggedOut(){
    localStorage.clear()
    this.route.navigate([''])
  }
}
