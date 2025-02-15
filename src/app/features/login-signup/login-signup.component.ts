import { Component, OnChanges, signal, SimpleChanges } from '@angular/core';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PasswordValidator } from './password.validator';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login-signup',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.css',
})
export class LoginSignupComponent {
  isLogin = signal(true);

  constructor(private router: Router, private authService: AuthService) {}

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    // PasswordValidator.strongPassword
  ]);

  onSubmit(): void {
    if (this.emailFormControl.valid && this.passwordFormControl.valid) {
      const email = this.emailFormControl.value;
      const password = this.passwordFormControl.value;

      if (email && password) {
        this.authService.login(email, password);
        if (this.authService.isAuthenticated()) {
          this.router.navigateByUrl('landing-page');
        } else {
          alert('Incorrect email or password');
        }
      }
    } else {
      alert('Login unsuccesful');
    }
  }

  createAccount(): void {
    this.isLogin.set(false);
    console.log(this.isLogin());
  }

  signupNameFormControl = new FormControl('', [Validators.required]);

  signupEmailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  signupPasswordFormControl = new FormControl('', [
    Validators.required,
    // PasswordValidator.strongPassword
  ]);

  onSignupSubmit(): void {}
}
