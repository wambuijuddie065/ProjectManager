import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from './services/auth-guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PM-Angular';
  constructor(public AuthGuard:AuthGuard, private route:Router){

  }
  isLoggedOut(){
    
    this.route.navigate(['home'])
  }
}
