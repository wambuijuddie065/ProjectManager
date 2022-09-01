import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router
} from '@angular/router';

import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private route: Router) {}
  canActivate() {
    if (this.loginService.IsLoggedIn()) {
      return true;
    } else {
      this.route.navigate(['/auth/login']);
      return false;
    }
  }
}
