import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private router: Router, private authService: AuthService) {}

  onLogOut(): void {
    this.authService.logout();
    if (!this.authService.isAuthenticated()) {
      this.router.navigateByUrl('login');
    } else {
      alert('Login failed, Try again');
    }
  }
}
