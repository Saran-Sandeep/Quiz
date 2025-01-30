import { Component } from '@angular/core';
import { LoginHeaderComponent } from './components/login-header/login-header.component';
import { LoginFooterComponent } from './components/login-footer/login-footer.component';

@Component({
  selector: 'app-login-signup',
  imports: [LoginHeaderComponent, LoginFooterComponent],
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.css',
})
export class LoginSignupComponent {}
