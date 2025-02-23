import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthguardService {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['login']);
      alert('Login to get access');
      return false;
    }
  }
  canActivateChild() {
    this.canActivate();
  }

  canDeactivate() {
    confirm('Do you really want to stop the quiz? Your progress will be lost.');
  }
}
